import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import sso from '@aftership/sso-basic';
import { name } from '../package.json';
import UserProvider from './UserProvider';

const SSO_URL = process.env.REACT_APP_SSO_URL;
const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

function render(props: any) {
  const { container } = props;

  const basename = (window as any).__POWERED_BY_QIANKUN__
    ? `/app-${name}/`
    : `${name}/`;

  sso.init({
    url: `${SSO_URL}/auth`,
    realm: 'employee',
    clientId: 'admin-portal',
    forceLogin: true,
    silentCallbackUrl: `${PUBLIC_URL}/sso/silent-callback.html`,
  });

  ReactDOM.render(
    <Router basename={basename}>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>,
    container
      ? container.querySelector('#root')
      : document.querySelector('#root'),
  );
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log(`[${name}] app bootstraped`);
}

export async function mount(props: any) {
  console.log(`[${name}] props from main framework`, props);

  render(props);
}

export async function unmount(props: any) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector('#root')
      : document.querySelector('#root'),
  );
}
