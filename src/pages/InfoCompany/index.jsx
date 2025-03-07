/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { getCookie } from '../../helpers/cookie'
import { Button, Card, Col, Form, Input, InputNumber, message, Row } from 'antd';
import { editCompany, getDetailCompany } from '../../services/companyService';
import { rules } from '../../contants';
import TextArea from 'antd/es/input/TextArea';

function InfoCompany() {
  const idCompany = getCookie("id");
  const [info, setInfo] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();


  const fetchApi = async () => {
    const response = await getDetailCompany(idCompany);
    if (response) {
      setInfo(response);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    const response = await editCompany(idCompany, values);
    if (response) {
      messageApi.success("Cập nhật thành công!");
      fetchApi();
      setIsEdit(false);
    }
  };
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleCancel = () => {
    setIsEdit(false);
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      {info && (
        <>
          <Card
            title="Thông tin công ty"
            extra={
              !isEdit ? (
                <Button onClick={handleEdit}>Chỉnh sửa</Button>
              ) : (
                <Button onClick={handleCancel}>Huỷ</Button>
              )
            }
          >
            <Form
              layout="vertical"
              onFinish={handleFinish}
              initialValues={info}
              form={form}
              disabled={!isEdit}
            >
              <Row gutter={20}>
                <Col span={24}>
                  <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Email" name="email" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Địa chỉ" name="address" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Số lượng nhân sự" name="quantityPeople" rules={rules}>
                    <InputNumber className="w-100" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Thời gian làm việc" name="workingTime" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Link website" name="website" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Mô tả ngắn" name="description" rules={rules}>
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Mô tả chi tiết" name="detail" rules={rules}>
                    <TextArea rows={16} />
                  </Form.Item>
                </Col>
                {isEdit && (
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">Cập nhật</Button>
                      <Button onClick={handleCancel} className="ml-10">Huỷ</Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  )
}

export default InfoCompany