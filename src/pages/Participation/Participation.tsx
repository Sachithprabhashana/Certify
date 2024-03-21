// @flow
import * as React from 'react';
import { useCallback, useState } from 'react';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import '../SingleEvent/SingleEvent.css'
import { Button, Card, Form, Input, InputNumber, Select } from 'antd';
import { useCache } from '../../context/CacheContext';
import { AGE_RANGES, WINNER_PLACES } from '../../DB/DBData';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { saveEvent } from '../../Firebase/Firebase';
import { CertificateDto } from '../../Dto/Certificate.dto';

export const Participation = () => {
  const { singleEvents, houseNames, setCurrentEvent , setParticipations} = useCache();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
 
  const handlerFinish = useCallback(
    async (values: any) => {
      const temp: CertificateDto= { ...values };
      setParticipations(temp)
      console.log('dcdcd',temp)
      navigate('/participation-certificate');
    },
    [navigate, setCurrentEvent, singleEvents],
  );
  return (
    <MainLayout>
      <div className="mainPage">
        <div className="container-sf">
          <Card title={'Add new event'}>
            <Form
              name="basic"
              layout={'horizontal'}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ score: [{ zues: 0,venus:0,athens:0 }] }}
              autoComplete="off"
              onFinish={handlerFinish}>
              <Form.Item
                hasFeedback
                label="Event Name"
                name="event"
                rules={[{ required: true, message: 'Please input your event!' }]}>
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label?.toLowerCase() ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={[{label: "Band", value: "Band"}]}
                />
              </Form.Item>

          

              <Form.List
                name="winners"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(new Error('At least 1 winners'));
                      }
                    },
                  },
                ]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key}>
                        <Form.Item
                          {...restField}
                          label={'Name'}
                          name={[name, 'name']}
                          rules={[{ required: true, message: 'Missing name' }]}>
                          <Input placeholder="Name" />
                        </Form.Item>
                       
                        <Form.Item
                          {...restField}
                          label={'Achievement'}
                          name={[name, 'achievement']}
                          rules={[{ required: false, message: 'Missing achievement' }]}>
                          <Input.TextArea rows={4} placeholder="Achievement" />
                        </Form.Item>
                        <div
                          style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                          {fields.length > 3 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(name)}
                            />
                          ) : null}
                        </div>
                      </div>
                    ))}
                    <Form.Item label={'New Student'}>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Student
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  disabled={loading}
                  loading={loading}
                  style={{ width: '100%' }}
                  type="primary"
                  htmlType="submit">
                  Print
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

