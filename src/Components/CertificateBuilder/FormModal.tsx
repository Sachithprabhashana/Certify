import React, {FC, useCallback, useState} from 'react';
import {Button, Form, Input, InputNumber, Modal, Select} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {AGE_RANGES, WINNER_PLACES} from "../../DB/DBData";
import {CertificateDto} from "../../Dto/Certificate.dto";
import {saveEvent} from "../../Firebase/Firebase";
import {useCache} from "../../context/CacheContext";
import {useNavigate} from "react-router-dom";

type Props = {
    visible: boolean;
    setVisible: (value:boolean)=> void;
}

export const FormModal:FC<Props> = ({visible,setVisible}) => {
    const { singleEvents, houseNames, setCurrentEvent } = useCache();
    const [ageOptions, setAgeOptions] = useState<string[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const onValueChange = useCallback((values: any) => {
        if (values.event) {
            setAgeOptions(AGE_RANGES);
        }
    }, []);

    const handleCancel = useCallback(()=> {
        setVisible(false)
    },[setVisible])


    const handlerFinish = useCallback(
        async (values: any) => {
            const temp: CertificateDto = { ...values };
            const index = singleEvents.findIndex((v) => v.value === temp.event);
            temp.event = singleEvents[index].label;
            temp.type = 'single';
            const d = new Date();
            temp.year = d.getFullYear().toString();
            console.log(temp);
            temp.winners = temp.winners.map((v) => {
                if (v.achievement) {
                    return v;
                }
                const obj: any = { ...v };
                obj.achievement = null;
                return obj;
            });
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

    return(
        <div>
        {/*test component*/}

        <Modal footer={null} title="Add new event" open={visible} onCancel={handleCancel}>

                    <Form
                        name="basic"
                        layout={'horizontal'}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ score: [{ zues: 0,venus:0,athens:0 }] }}
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
                        <Form.List name="score">
                            {(fields) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div key={key}>
                                            <Form.Item
                                                required
                                                {...restField}
                                                label={'Score for Athens'}
                                                name={[name, 'athens']}
                                                rules={[{ required: true, message: 'Missing Zues score' }]}>
                                                <InputNumber min={0} style={{ width: '100%'}} placeholder="Score" />
                                            </Form.Item>
                                            <Form.Item
                                                required
                                                {...restField}
                                                label={'Score for Venus'}
                                                name={[name, 'venus']}
                                                rules={[{ required: true, message: 'Missing Zues score' }]}>
                                                <InputNumber min={0} style={{ width: '100%'}} placeholder="Score" />
                                            </Form.Item>
                                            <Form.Item
                                                required
                                                {...restField}
                                                label={'Score for Zues'}
                                                name={[name, 'zues']}
                                                rules={[{ required: true, message: 'Missing Zues score' }]}>
                                                <InputNumber min={0} style={{ width: '100%'}} placeholder="Score" />
                                            </Form.Item>

                                        </div>
                                    ))}
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

        </Modal>

        </div>
    )
}
