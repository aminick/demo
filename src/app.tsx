import React from 'react';
import { Switch, Route, Link, useLocation, Redirect } from 'react-router-dom';
import { Empty } from 'antd';
import ProLayout from '@ant-design/pro-layout';
import appConfig from './config/appConfig';
import layoutSettings from './config/layoutSettings';

import Welcome from './pages/Welcome';

const App = () => {
  const location = useLocation();

  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...appConfig}
        location={location}
        onMenuHeaderClick={() => (window.location.href = '/')}
        menuItemRender={(item, dom) => (
          <Link to={item.path || '/welcome'}>{dom}</Link>
        )}
        {...layoutSettings}
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route>
          <Route path="/welcome" component={Welcome} exact />

          <Route component={() => <Empty />} />
        </Switch>
      </ProLayout>
    </div>
  );
};

export default App;
