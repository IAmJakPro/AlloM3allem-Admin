//import logo from './logo.svg';
import React from 'react';
import { Button, Layout, Menu, Spin } from 'antd';

import 'antd/dist/antd.css';

import routes from './utils/routes';

import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  NavLink,
} from 'react-router-dom';
import { useAuth } from './hooks/auth-hook';
import Login from './auth/pages/Login';
import { Fragment } from 'react';
import { AuthContext } from './context/auth-context';
import { HeartFilled, HeartTwoTone, LogoutOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Item } = Menu;

function App() {
  const { token, role, login, logout, userId } = useAuth();

  let screen = (
    <>
      <Switch>
        <Route exact path="/login" key="login">
          <Login />
        </Route>
      </Switch>
      <Redirect to="/login" />
    </>
  );

  if (token) {
    screen = (
      <>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          {token && <h1 style={{ color: 'white' }}>AlloM3allem Admin</h1>}
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            {routes.map(({ key, name, path, icon, permissions = [] }) => {
              if (permissions.length > 0 && !permissions.includes(role)) {
                return null;
              }
              if (icon) {
                return (
                  <Item key={key} icon={icon}>
                    <NavLink to={path}>{name}</NavLink>
                  </Item>
                );
              } else {
                return null;
              }
            })}
            <Item
              key="logout"
              icon={<LogoutOutlined />}
              style={{ backgroundColor: '#DD4141' }}
            >
              <NavLink to="#" onClick={logout}>
                Logout
              </NavLink>
            </Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header
            className="site-layout-background"
            style={{ padding: 0, backgroundColor: 'white' }}
          />
          <React.Suspense fallback={<Spin spinning={true} />}>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, textAlign: 'center' }}
              >
                <Switch>
                  {routes.map(({ key, path, component, subRoutes }) => {
                    return (
                      <Route exact path={path} key={key}>
                        {component}
                      </Route>
                    );
                  })}
                </Switch>
                <Redirect to="/" />
              </div>
            </Content>
          </React.Suspense>
          <Footer style={{ textAlign: 'center' }}>
            AlloM3allem ©2021, Created with <HeartTwoTone twoToneColor="red" /> by Osama Jaker
          </Footer>
        </Layout>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        role: role,
        login: login,
        logout: logout,
      }}
    >
      <Router>{screen}</Router>
    </AuthContext.Provider>
  );
}

export default App;
