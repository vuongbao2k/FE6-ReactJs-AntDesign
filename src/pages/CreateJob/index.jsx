import React, { useEffect, useState } from 'react'
import { getCookie } from '../../helpers/cookie'
import { Button, Col, Form, Input, message, Row, Select, Switch } from 'antd';
import { rules } from '../../contants';
import { getListTag } from '../../services/tagService';
import { getListCity } from '../../services/cityService';
import { getTimeCurrent } from '../../helpers/getTime';
import { createJob } from '../../services/jobService';
import GoBack from '../../components/GoBack'
const { TextArea } = Input;

function CreateJob() {
  const idCompany = getCookie("id");
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTag();
      if (response) {
        setTags(response);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCity();
      if (response) {
        setCity(response);
      }
    };
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    values.idCompany = idCompany;
    values.createAt = getTimeCurrent();
    const response = await createJob(values);
    if (response) {
      form.resetFields();
      messageApi.open({
        type: "success",
        content: "Tạo job mới thành công",
        duration: 5
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Tạo job mới không thành công",
        duration: 3
      });
    }
  };

  return (
    <>
      {contextHolder}

      <GoBack />

      <h1>Tạo mới</h1>

      <Form
        onFinish={handleFinish}
        layout='vertical'
        form={form}
      >
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item label="Tên job" name="name" rules={rules}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Tags" name="tags" rules={rules}>
              <Select mode="multiple" options={tags}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Mức lương" name="salary" rules={rules}>
              <Input addonAfter="$" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Thành phố" name="city" rules={rules}>
              <Select mode="multiple" options={city}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description" >
              <TextArea rows={16} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Trạng thái" name="status" valuePropName="checked">
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt"/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default CreateJob