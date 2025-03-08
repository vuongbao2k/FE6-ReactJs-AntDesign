import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Input, message, Row, Select, Switch, Modal, Spin, Tooltip } from 'antd';
import { rules } from '../../contants';
import { getListTag } from '../../services/tagService';
import { getListCity } from '../../services/cityService';
import { getTimeCurrent } from '../../helpers/getTime';
import { updateJob } from '../../services/jobService';
import { EditOutlined } from '@ant-design/icons'
const { TextArea } = Input;

function EditJob(props) {
  const { record, onReload } = props;
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  }

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
    setSpinning(true);
    values.updateAt = getTimeCurrent();
    const response = await updateJob(record.id, values);
    if (response) {
      setIsModalOpen(false);
      onReload();
      messageApi.open({
        type: "success",
        content: "Cập nhật thành công",
        duration: 5
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhật không thành công",
        duration: 3
      });
    }
    setSpinning(false);
  };
  return (
    <>
      {contextHolder}
      <Tooltip title="Chỉnh sửa">
        <Button type="primary" ghost icon={<EditOutlined />} onClick={showModal} className="ml-5"></Button>
        <Modal title="Chỉnh sửa" footer={null} open={isModalOpen} onCancel={handleCancel}>
          <Spin spinning={spinning} tip="Đang cập nhật...">
            <Form layout="vertical" name="update-job" onFinish={handleFinish} form={form} initialValues={record}>
              <Row gutter={20}>
                <Col span={24}>
                  <Form.Item label="Tên job" name="name" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item label="Tags" name="tags" rules={rules}>
                    <Select mode="multiple" options={tags} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Mức lương" name="salary" rules={rules}>
                    <Input addonAfter="$" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Thành phố" name="city" rules={rules}>
                    <Select mode="multiple" options={city} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Mô tả" name="description" >
                    <TextArea rows={16} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Modal>
      </Tooltip>
    </>
  )
}

export default EditJob