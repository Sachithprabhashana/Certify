// @flow
import * as React from 'react';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import './SingleEventForm.css';
import { Button, Card, Form, Input, Select } from 'antd';
import { useCache } from '../../context/CacheContext';
import { useCallback, useState } from 'react';
import { AGE_RANGE_JSON, WINNER_PLACES } from '../../DB/DBData';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { saveEvent } from '../../Firebase/Firebase';
import {CertificateDto} from "../../Dto/Certificate.dto";
export const SingleEventForm = () => {
  const { singleEvents, houseNames, setCurrentEvent } = useCache();
  const [ageOptions, setAgeOptions] = useState<string[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const onValueChange = useCallback((values: any) => {
    if (values.event) {
      const key: any = values.event;
      setAgeOptions(AGE_RANGE_JSON[key]);
    }
  }, []);
  const handlerFinish = useCallback(
    async (values: any) => {
      const temp: CertificateDto = { ...values };
      const index = singleEvents.findIndex((v) => v.value === temp.event);
      temp.event = singleEvents[index].label;
      temp.type = 'single';
      console.log(temp);
      const winners = temp.winners.map((v) => {
        if (v.achievement) {
          return v;
        }
        const obj: any = {...v};
        obj.achievement = null;
        return obj;
      })
      temp.winners = winners;
      try {
        setLoading(true);
        await saveEvent(temp);
        setCurrentEvent(temp);
        setLoading(false);
        navigate('/single-event');
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
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
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={handlerFinish}
              onValuesChange={onValueChange}>
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
                  options={singleEvents}
                />
              </Form.Item>

              <Form.Item
                label="Age Range"
                name="ageRange"
                dependencies={['event']}
                hasFeedback
                rules={[{ required: true, message: 'Please input your age range!' }]}>
                <Select
                  showSearch
                  disabled={ageOptions.length === 0}
                  // style={{ width: 200 }}
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
                  options={ageOptions.map((v) => ({ label: v, value: v }))}
                />
              </Form.Item>

              <Form.List
                name="winners"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 3) {
                        return Promise.reject(new Error('At least 2 winners'));
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
                          label={'House'}
                          name={[name, 'house']}
                          rules={[{ required: true, message: 'Missing house' }]}>
                          <Select
                            showSearch
                            // style={{ width: 200 }}
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
                            options={houseNames.map((v) => ({ label: v, value: v }))}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label={'Place'}
                          name={[name, 'place']}
                          rules={[{ required: true, message: 'Missing house' }]}>
                          <Select
                            showSearch
                            // style={{ width: 200 }}
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
                            options={WINNER_PLACES.map((v) => ({ label: v, value: v }))}
                          />
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
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
