import * as React from 'react';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import './TeamEventForm.css';
import { Button, Card, Form, Input, Select } from 'antd';
import { useCache } from '../../context/CacheContext';
import { useCallback, useState } from 'react';
import {AGE_RANGES, TEAM_WINNER_PLACES} from '../../DB/DBData';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CertificateDto, CertificateTeamDto, WinnerDto } from '../../Dto/Certificate.dto';
import { saveTeamEvent } from '../../Firebase/Firebase';
export const TeamEventForm = () => {
  const { teamEvents, houseNames, setCurrentEvent } = useCache();
  const [ageOptions, setAgeOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const onValueChange = useCallback((values: any) => {
    if (values.event) {
      setAgeOptions(AGE_RANGES);
    }
  }, []);
  const clearAchievementValue = useCallback((arr: WinnerDto[]) => {
    return arr.map((v) => {
      if (v.achievement) {
        return v;
      }
      const obj: any = { ...v };
      obj.achievement = null;
      return obj;
    });
  }, []);

  const handlerFinish = useCallback(
    async (values: any) => {
      const temp: CertificateTeamDto = { ...values };
      const index = teamEvents.findIndex((v) => v.value === temp.event);
      temp.event = teamEvents[index].label;
      temp.type = 'team';
      const d = new Date();
      temp.year = d.getFullYear().toString();
      temp.champion = clearAchievementValue(temp.champion);
      temp.runnersUp = clearAchievementValue(temp.runnersUp);
      temp.thirdPlace = clearAchievementValue(temp.thirdPlace?.length > 0 ? temp.thirdPlace : []);
      try {
        setLoading(true);
        await saveTeamEvent(temp);
        const newEvent: CertificateDto = {
          ageRange: temp.ageRange,
          event: temp.event,
          type: temp.type,
          year: temp.year,
          key: temp.key,
          winners: [...temp?.champion, ...temp?.runnersUp, ...temp?.thirdPlace],
        };
        setCurrentEvent(newEvent);
        setLoading(false);
        navigate('/single-event');
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
      // setCurrentTeamEvent(temp);
      // navigate('/team-event');
    },
    [clearAchievementValue, navigate, setCurrentEvent, teamEvents],
  );
  return (
    <MainLayout>
      <div className="mainPage">
        <div className="container-tf">
          <Card title={'Add new events'}>
            <Form
              name="basic"
              layout={'horizontal'}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
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
                  options={teamEvents}
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
                name="champion"
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
                            options={TEAM_WINNER_PLACES.map((v) => ({ label: v, value: v }))}
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
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(name)}
                            />
                          ) : null}
                        </div>
                      </div>
                    ))}
                    <Form.Item required label={'Champion'}>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Champion
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.List
                name="runnersUp"
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
                            options={TEAM_WINNER_PLACES.map((v) => ({ label: v, value: v }))}
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
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(name)}
                            />
                          ) : null}
                        </div>
                      </div>
                    ))}
                    <Form.Item required label={'RunnersUp'}>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add RunnersUp
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.List name="thirdPlace">
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
                            options={TEAM_WINNER_PLACES.map((v) => ({ label: v, value: v }))}
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
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(name)}
                            />
                          ) : null}
                        </div>
                      </div>
                    ))}
                    <Form.Item label={'Third Place'}>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Third Place
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
