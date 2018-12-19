import React from 'react';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
const { ConnectedRouter } = routerRedux

function RouterConfig({ history, app}) {
  const IndexPage = dynamic({
    app, 
    models: () => [
      import('./models/app'),
    ],
    component: () => import('./routes/layout')
  })
  const Login = dynamic({
    app, 
    models: () => [
      import('./models/app'),
    ],
    component: () => import('./routes/login')
  })
  const List = dynamic({
    app,
    models: () => [
      import('./models/app'),
      import('./models/list')
    ],
    component: () => import('./routes/List')
  })
  const Test = dynamic({
    app,
    models: () => [
      import('./models/app'),
      import('./models/list')
    ],
    component: () => import('./routes/Test')
  })

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" exact render={() => (<Redirect to="/list" />)} />
          <IndexPage>
            <Route path="/list" component={List} />
            <Route path="/test" component={Test} />
          </IndexPage>
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
    
  );
}

export default RouterConfig;
