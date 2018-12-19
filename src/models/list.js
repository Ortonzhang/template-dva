import { getList } from '../services'

export default {
  namespace: 'list',
  state: {
    testList: []
  },
  effects: {
    *getList({
      payload,
    }, {put, call, select}) {
      let testList = yield call(getList)
      yield put({type: 'setArray', payload: {testList}})
    }
  },
  reducers: {
    setArray (state, { payload }) {
      return {...state, ...payload}
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      // 用来监听url变化
      return history.listen(({pathname}) => {
        console.log(pathname)
        
      })
    } 
  }
};
