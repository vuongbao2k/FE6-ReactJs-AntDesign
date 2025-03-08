import React from 'react'
import { Menu } from "antd"
import { ClockCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function MenuSider() {
  const items = [
    {
      key: "menu-1",
      label: <Link to="/admin">Tổng quan</Link>,
      icon: <ClockCircleOutlined />,
    },
    {
      key: "menu-2",
      label: <Link to="/info-company">Thông tin công ty</Link>,
      icon: <ClockCircleOutlined />,
    },
    {
      key: "menu-3",
      label: <Link to="/job-manage">Quản lý việc làm</Link>,
      icon: <ClockCircleOutlined />,
    },
    {
      key: "menu-4",
      label: <Link to="/cv-manage">Quản lý CV</Link>,
      icon: <ClockCircleOutlined />,
    }
  ]
  return (
    <>
      <Menu mode="inline" items={items} defaultSelectedKeys={["menu-1"]}/>
    </>
  )
}

export default MenuSider