/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailCompany } from '../../services/companyService';
import { getListJob } from '../../services/jobService';
import { Col, Row } from 'antd';
import JobItem from '../Search/JobItem';

function CompanyDetail() {
  const params = useParams();
  const [infoCompany, setInfoCompany] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailCompany(params.id);
      if (response) {
        setInfoCompany(response);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListJob(params.id);
      if (response) {
        setJobs(response);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      {infoCompany && (
        <>
          <h1>{infoCompany.companyName}</h1>

          <div className="mb-20">
            Địa chỉ: <strong>{infoCompany.address}</strong>
          </div>
          <div className="mb-20">
            Số lượng nhân sự: <strong>{infoCompany.quantityPeople}</strong>
          </div>
    
          <div className="mb-20">
            Thời gian làm việc: <strong>{infoCompany.workingTime}</strong>
          </div>
          
          <div className="mb-20">
            Link Website: <strong>{infoCompany.website}</strong>
          </div>

          <div className="mb-10">Mô tả ngắn</div>
          <div className="mb-20">{infoCompany.description}</div>

          <div className="mb-10">Mô tả chi tiết</div>
          <div className="mb-20">{infoCompany.detail}</div>

          <div className="mb-10">Danh sách các job</div>
          <div className="mb-20">
            <Row gutter={[20,20]}>
              {jobs.map(item => (
                <Col spn={8} key={item.id}>
                  <JobItem item={item}/>
                </Col>
              ))}
            </Row>
          </div>
          
        </>
      )}
    </>
  )
}

export default CompanyDetail