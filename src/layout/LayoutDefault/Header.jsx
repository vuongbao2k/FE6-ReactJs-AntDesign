import React from 'react'
import { getCookie } from '../../helpers/cookie';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

function Header() {
  const token = getCookie("token");
  return (
    <>
      <header className="layout-default__header">
        <div className="layout-default__logo">IT Jobs</div>

        <div className='layout-default__account'>
          {token ? (<>
            <span className="ml-10">
              <NavLink to='admin'>
                <Button>Quản lý</Button>
              </NavLink>
            </span>
            <span className="ml-10">
              <NavLink to='logout'>
                <Button>Đăng xuất</Button>
              </NavLink>
            </span>
          </>) : (<>
            <span className="ml-10">
              <NavLink to='login'>
                <Button>Đăng nhập</Button>
              </NavLink>
            </span>

            <span className="ml-10">
              <NavLink to='register'>
                <Button type='primary'>Đăng ký</Button>
              </NavLink>
            </span>

          </>)}
        </div>
      </header>
    </>
  )
}

export default Header