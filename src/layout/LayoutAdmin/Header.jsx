import React from 'react'
import { MenuFoldOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';


function Header(props) {
  const { collapsed, setCollapsed } = props;
  return (
    <>
      <header className="header">
        <div className={"header__logo " + (collapsed && "header__logo--collapsed")}>
          {/* <img src={collapsed ? logoFold : logo} alt="" /> */}
          {collapsed ? <span>ITA</span> : <span>IT Jobs</span>}
        </div>
        <div className="header__nav">
          <div className="header__nav-left">
            <div className="header__collapse" onClick={() => setCollapsed(!collapsed)}>
              <MenuFoldOutlined />
            </div>
          </div>
          <div className="header__nav-right">
            <span className="ml-10">
              <NavLink to='/'>
                <Button>Trang chủ</Button>
              </NavLink>
            </span>
            <span className="ml-10">
              <NavLink to='logout'>
                <Button>Đăng xuất</Button>
              </NavLink>
            </span>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header