/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { getCookie } from '../../helpers/cookie'
import { Card } from 'antd';
import { getDetailCompany } from '../../services/companyService';

function InfoCompany() {
  const idCompany = getCookie("id");
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailCompany(idCompany);
      if (response) {
        setInfo(response);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      {info && (
        <>
          <Card title="Thông tin công ty" className="mb-20" size="small">
            <div>
              Tên công ty: <strong>{info.companyName}</strong>
            </div>
            <div>
              Email: <strong>{info.email}</strong>
            </div>
            <div>
              Số điện thoại: <strong>{info.phone}</strong>
            </div>
            <div>
              Số nhân viên: <strong>{info.quantityPeople}</strong>
            </div>
          </Card>
        </>
      )}
    </>
  )
}

export default InfoCompany