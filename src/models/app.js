import { login,  updatePassword } from '../services'
import { routerRedux } from 'dva/router'
// import { notification } from 'antd';
import qs from 'qs'
import { prefix } from 'config'

export default {
  namespace: 'app',
  
  state: {
    menu: JSON.parse(window.localStorage.getItem(`${prefix}menu`)) || [],
    collapsed: window.localStorage.getItem(`${prefix}collapsed`) === 'true',
    user: JSON.parse(window.localStorage.getItem(`${prefix}user`)) || {},
    status:'contract',
    visible: false,
    oldPwd: '',
    newPwd: '',
    newPwdRe: ''
  },

  subscriptions: {
    setup({ dispatch, history }) { 
      // 用来监听url更改
      return history.listen(({pathname, search}) => {
        let user = window.localStorage.getItem(`${prefix}user`)
        if(pathname !== '/login') {
          if(!user || user === '{}'){
            dispatch({type: 'gologin'})
          }
          dispatch({type:'sethref', payload: { // 更改左侧选中状态的menu
            status: pathname.replace('/', '')
          }})
        }
      })
    },
  },

  effects: {
    *login({
      payload,
    }, {put, call}) {
      const data = yield call(login, qs.stringify(payload))
      let params = data.data
      yield put({type: 'setMenu', payload: params.privilegeDtoList || []})
      yield put({type: 'setUser', payload: {userName: params.userName, userId: params.userId}})
      // if(params.privilegeDtoList){
      //   yield put(routerRedux.push({
      //     pathname: '/contract',
      //     search: '?table=1'
      //   }))
      // } else {
      //   notification['warning']({
      //     message: '出错啦',
      //     description: '暂无权限查看'
      //   })
      // }
      yield put(routerRedux.push({
        pathname: '/list'
      }))
    },
    *logout({
      payload
    }, {put, call}) {
      yield put({type: 'setMenu', payload: []})
      yield put({type: 'setUser', payload: {}})
      yield put(routerRedux.replace('/login'))
    },
    *gologin(_, {put}){
      yield put(routerRedux.replace('/login'))
    },
    *changePassword({
      payload
    }, { put, call, select }) {
      let { oldPwd, newPwd } = yield select(state => state.app)
      let params = { oldPwd, newPwd }
      let data = yield call(updatePassword, qs.stringify(params))
      if(data.data){
        yield put({type:'change'})
        yield put(routerRedux.replace({
          pathname: '/login'
        }))
      }
    }
  },
  reducers: {
    setMenu(state, action) {
      window.localStorage.setItem(`${prefix}menu`, JSON.stringify(action.payload))
      return { 
        ...state, 
        menu: action.payload 
      };
    },
    setUser(state, action) {
      window.localStorage.setItem(`${prefix}user`, JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload
      }
    },
    change(state){
      return {
        ...state,
        visible: !state.visible
      }
    },
    switchSider(state) {
      window.localStorage.setItem(`${prefix}collapsed`, !state.collapsed)
      return { 
        ...state,
        collapsed: !state.collapsed 
      }
    },
    sethref(state, { payload }){
      return {
        ...state,
        ...payload
      }
    },
    setPassword(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },

};
