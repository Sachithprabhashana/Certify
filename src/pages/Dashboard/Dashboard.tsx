// @flow
import * as React from 'react';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import './Dashboard.css';
import { Button, Card, Descriptions, Popconfirm, Space, Table } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CertificateDto } from '../../Dto/Certificate.dto';
import { deleteEvent, getEvents } from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { useCache } from '../../context/CacheContext';
export const Dashboard = () => {
  const [singleEvents, setSingleEvents] = useState<CertificateDto[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { setCurrentEvent } = useCache();
  const getEventData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setSingleEvents(data as any);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  const deleteEventData = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        await deleteEvent(id);
        await getEventData();
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    },
    [getEventData],
  );

  useEffect(() => {
    getEventData().then();
  }, [getEventData]);
  const columns = useMemo(
    () => [
      {
        title: 'Event Name',
        dataIndex: 'event',
        key: 'event',
        width: 150,
      },
      {
        title: 'Age Range',
        dataIndex: 'ageRange',
        key: 'ageRange',
        width: 150,
        render: (value: string, record: CertificateDto) => <span>Under {record.ageRange}</span>,
      },
      {
        title: 'First Place',
        dataIndex: 'winners',
        key: 'winners',
        render: (value: string, record: CertificateDto) => {
          const temp = record?.winners ?? [];
          const index = temp?.findIndex((v) => v.place === '1st');
          const user = temp[index]?.name;
          const achievement = temp[index]?.achievement;
          const house = temp[index]?.house;
          return (
            <Descriptions column={1}>
              <Descriptions.Item label="Name">{user}</Descriptions.Item>
              <Descriptions.Item label="House">{house}</Descriptions.Item>
              <Descriptions.Item label="Achievement">{achievement}</Descriptions.Item>
            </Descriptions>
          );
        },
      },
      {
        title: 'Second Place',
        dataIndex: 'winners',
        key: 'winners',
        render: (value: string, record: CertificateDto) => {
          const temp = record?.winners ?? [];
          const index = temp?.findIndex((v) => v.place === '2nd');
          const user = temp[index]?.name;
          const achievement = temp[index]?.achievement;
          const house = temp[index]?.house;
          return (
            <Descriptions column={1}>
              <Descriptions.Item label="Name">{user}</Descriptions.Item>
              <Descriptions.Item label="House">{house}</Descriptions.Item>
              <Descriptions.Item label="Achievement">{achievement}</Descriptions.Item>
            </Descriptions>
          );
        },
      },
      {
        title: 'Third Place',
        dataIndex: 'winners',
        key: 'winners',
        render: (value: string, record: CertificateDto) => {
          const temp = record?.winners ?? [];
          const index = temp?.findIndex((v) => v.place === '3rd');
          const user = temp[index]?.name;
          const achievement = temp[index]?.achievement;
          const house = temp[index]?.house;
          return (
            <Descriptions column={1}>
              <Descriptions.Item label="Name">{user}</Descriptions.Item>
              <Descriptions.Item label="House">{house}</Descriptions.Item>
              <Descriptions.Item label="Achievement">{achievement}</Descriptions.Item>
            </Descriptions>
          );
        },
      },
      {
        title: 'Action',
        dataIndex: 'Action',
        key: 'Action',
        width: 150,
        render: (value: string, record: CertificateDto) => (
          <Space direction={'vertical'}>
            <Button
              type={'primary'}
              onClick={() => {
                setCurrentEvent(record);
                navigate('/single-event');
              }}>
              Print Certificates
            </Button>
            <Popconfirm
              title="Delete the record"
              description="Are you sure to delete this record?"
              okText="Yes"
              cancelText="No"
              onConfirm={async () => {
                await deleteEventData(record.key);
              }}>
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [deleteEventData, navigate, setCurrentEvent],
  );
  return (
    <MainLayout>
      <div className="mainPage">
        <div className="container-dashboard">
          <Card style={{ width: '100%' }}>
            <Table
              loading={loading}
              dataSource={singleEvents}
              columns={columns}
              pagination={{ pageSize: 4 }}
            />
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
