/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { getCookie } from '../../helpers/cookie'
import { Button, Table, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons'
import { getListCV } from '../../services/cvService';
import CVJobName from './CVJobName';
import DeleteCV from './DeleteCV';

function CVList(props) {
  const { className = "" } = props;
  const idCompany = getCookie("id");
  const [listCV, setListCV] = useState([]);

  const fetchApi = async () => {
    const response = await getListCV(idCompany);
    if (response) {
      setListCV(response.reverse());
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  }

  const columns = [
    {
      title: "Tên job",
      dataIndex: "idJob",
      key: "idJob",
      render: (_, record) => (
        <CVJobName record={record} />
      )
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Ngày gửi",
      dataIndex: "createAt",
      key: "time",
      // render: (_, record) => (
      //   <>{record.createAt}</>
      // )
    },
    {
      title: "Trạng thái",
      // dataIndex: "statusRead",
      key: "statusRead",
      render: (_, record) => (
        <>
          {record.statusRead ? (
            <Tag color="green">Đã đọc</Tag>
          ) : (
            <Tag color="red">Chưa đọc</Tag>
          )}
        </>
      )
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/detail-cv/${record.id}`}>
            <Tooltip title="Xem chi tiết">
              <Button icon={<EyeOutlined />} />
            </Tooltip>
          </Link>
          <DeleteCV record={record} onReload={handleReload} />
        </>
      )
    },
  ]
  return (
    <>
      <div className={className}>
        <Table dataSource={listCV} columns={columns} rowKey="id" />
      </div>
    </>
  )
}

export default CVList