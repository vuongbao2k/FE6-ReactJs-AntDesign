import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailJob } from '../../services/jobService';
import GoBack from '../../components/GoBack';
import { Tag } from 'antd';

function JobDetailAdmin() {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailJob(params.id);
      if (response) {
        setData(response);
      }
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <GoBack />
      {data && (
        <>
          <h1>Tên job: {data.name}</h1>
          <div className="mb-20">
            <span>Trạng thái: </span>
            {data.status ? (
              <Tag color="green">Đang bật</Tag>
            ) : (
              <Tag color="red">Đang tắt</Tag>
            )}
          </div>
          <div className="mb-20">
            <span>Tag: </span>
            {(data.tags || []).map((item, index) => (
              <Tag className="mb-5" color="blue" key={index}>{item}</Tag>
            ))}
          </div>
          <div className="mb-20">
            <span>Mức lương: <strong>{data.salary}$</strong></span>
          </div>
          <div className="mb-20">
            <span>Ngày tạo: <strong>{data.createAt}$</strong></span>
          </div>
          <div className="mb-20">
            <span>Cập nhật: <strong>{data.updateAt}$</strong></span>
          </div>
          <div className="mb-20">
            <span>Thành phố: </span>
            {(data.city || []).map((item, index) => (
              <Tag className="mb-5" color="orange" key={index}>{item}</Tag>
            ))}
          </div>
          <div className="mb-20">
            <div>Mô tả</div>
            <div>{data.description}</div>
          </div>
        </>
      )}
    </>
  )
}

export default JobDetailAdmin