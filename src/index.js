import dva from 'dva';
import './index.scss';
import createLoading from 'dva-loading';
// import { notification } from 'antd';
import {routerRedux} from 'dva/router';
import { prefix } from './utils/config'
// 1. Initialize
const app = dva({
  onError(e, dispatch){
    if(e.responseCode === -999){
      window.localStorage.removeItem(`${prefix}user`)
      window.localStorage.removeItem(`${prefix}menu`)
      dispatch(routerRedux.push({pathname: '/login'}))
    }
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/app').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
