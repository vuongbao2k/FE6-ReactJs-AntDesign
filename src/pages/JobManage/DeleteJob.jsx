import React from 'react'
import { deleteJob } from '../../services/jobService';
import { Button, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'

function DeleteJob(props) {
  const { record, onReload } = props;
  const handleDelete = async () => {
    const response = await deleteJob(record.id);
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

export default DeleteJob