/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDetailJob } from '../../services/jobService';
import { changeStatusCV, getDetailCV } from '../../services/cvService'
import { Card, Tag } from 'antd';
import GoBack from '../../components/GoBack';



function CVDetail() {
  const params = useParams();
  const [job, setJob] = useState([]);
  const [cv, setCV] = useState([]);

  const fetchApi = async () => {
    const response = await getDetailCV(params.id);
    if (response) {
      const responseJob = await getDetailJob(response.idJob);
      if (responseJob) {
        setCV(response);
        setJob(responseJob);
      }
    }
    changeStatusCV(params.id, { statusRead: true })
  };

  useEffect(() => {
    fetchApi();
  }, []);



  return (
    <>
      <GoBack />
      <Card title={`Ứng viên: ${cv.name}`}>
        <div className="mb-10">
          Ngày gửi: <strong>{cv.createAt}</strong>
        </div>
        <div className="mb-10">
          Số điện thoại: <strong>{cv.phone}</strong>
        </div>
        <div className="mb-10">
          Email: <strong>{cv.email}</strong>
        </div>
        <div className="mb-10">
          Thành phố ứng tuyển: <strong>{cv.city}</strong>
        </div>
        <div className="mb-10">
          Giới thiệu bản thân: <strong>{cv.description}</strong>
        </div>
        <div className="mb-10">
          Link project: <strong>{cv.linkProject}</strong>
        </div>
      </Card>
      <Card title={`Thông tin job: ${job.name}`}>
        <div className="mb-10">
          <span>Tags: </span>
          {(job.tags || []).map((item, index) => (
            <Tag color="blue" key={index}>{item}</Tag>
          ))}
        </div>
        <div className="mb-10">
          Mức lương: <strong>{job.salary}$</strong>
        </div>
        <div className="mb-10">
          <span>Thành phố: </span>
          {(job.city || []).map((item, index) => (
            <Tag color="orange" key={index}>{item}</Tag>
          ))}
        </div>
        <div className="mb-20">Thời gian đăng bài: <strong>{job.createAt}</strong></div>
        <div className="mb-20">
          <div className="mb-10">Mô tả công việc:</div>
          <div>{job.description}</div>
        </div>
      </Card>
    </>
  )
}

export default CVDetail