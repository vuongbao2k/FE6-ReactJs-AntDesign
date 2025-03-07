import { Layout } from 'antd';
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header'
import MenuSider from './MenuSider'
import './LayoutAdmin.scss'
import { useSelector } from 'react-redux';


const { Sider, Content } = Layout;

function LayoutAdmin() {
  // eslint-disable-next-line no-unused-vars
  const login = useSelector(state => state.loginReducer);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout className="layout-admin">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout className={"layout-admin__main " + (collapsed && "layout-admin__main--fold")}>
          <Sider
            breakpoint='lg'
            className="layout-admin__sider"
            collapsed={collapsed}
            theme="light"
            width={230}
            onBreakpoint={(e) => setCollapsed(e)}
          >
            <MenuSider />
          </Sider>
          <Content className="layout-admin__content">
            <Outlet />
          </Content>
        </Layout>
        {/* <Footer className="footer">footer</Footer> */}
      </Layout>
    </>
  )
}

export default LayoutAdmin