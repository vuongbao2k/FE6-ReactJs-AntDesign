import React from 'react'
import { Button, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { deleteCV } from '../../services/cvService';

function DeleteCV(props) {
  const { record, onReload } = props;
  const handleDelete = async () => {
    const response = await deleteCV(record.id);
    if (response) {
      onReload();
    }
  };
  return (
    <>
      <Tooltip title="Xoá bản ghi">
        <Popconfirm title="Bạn có chắc muốn xoá?" onConfirm={handleDelete}>
          <Button danger ghost icon={<DeleteOutlined />} className="ml-5"></Button>
        </Popconfirm>
      </Tooltip>
    </>
  )
}

export default DeleteCV