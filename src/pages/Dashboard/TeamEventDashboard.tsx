// @flow
import * as React from 'react';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import './Dashboard.css';
import { Button, Card, Popconfirm, Space, Table } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CertificateDto, CertificateTeamDto } from '../../Dto/Certificate.dto';
import { deleteTeamEvent, getTeamEvents } from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { useCache } from '../../context/CacheContext';
export const TeamEventDashboard = () => {
  const [teamEvents, setTeamEvents] = useState<CertificateTeamDto[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { setCurrentEvent } = useCache();
  const getEventData = useCallback(async () => {
    try {
      setLoading(true);
      const temp: any = await getTeamEvents();
      setTeamEvents(temp);
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
        await deleteTeamEvent(id);
        await getEventData();
        setLoading(false);
      } catch (e) {
        console.log(e);
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
        width: 200,
      },
      {
        title: 'Age Range',
        dataIndex: 'ageRange',
        key: 'ageRange',
        width: 150,
        render: (value: string, record: CertificateTeamDto) => <span>Under {record.ageRange}</span>,
      },
      {
        title: 'Champion',
        dataIndex: 'champion',
        key: 'champion',
        width: 150,
        render: (value: string, record: CertificateTeamDto) => (
          <span>{[...record?.champion][0]?.name}</span>
        ),
      },
      {
        title: 'RunnersUp',
        dataIndex: 'runnersUp',
        key: 'runnersUp',
        width: 150,
        render: (value: string, record: CertificateTeamDto) => (
          <span>{[...record?.runnersUp][0]?.name}</span>
        ),
      },
      {
        title: 'Third Place',
        dataIndex: 'thirdPlace',
        key: 'thirdPlace',
        width: 150,
        render: (value: string, record: CertificateTeamDto) => (
          <span>{[...record?.thirdPlace][0]?.name}</span>
        ),
      },
      {
        title: 'Action',
        dataIndex: 'Action',
        key: 'Action',
        width: 150,
        render: (value: string, temp: CertificateTeamDto) => (
          <Space direction={'vertical'}>
            <Button
              type={'primary'}
              onClick={() => {
                const newEvent: CertificateDto = {
                  ageRange: temp.ageRange,
                  event: temp.event,
                  type: temp.type,
                  year: temp.year,
                  key: temp.key,
                  winners: [
                    ...temp?.champion,
                    ...temp?.runnersUp,
                    ...[...(temp?.thirdPlace ?? [])],
                  ],
                };
                setCurrentEvent(newEvent);
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
                await deleteEventData(temp.key);
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
              dataSource={teamEvents}
              columns={columns}
              pagination={{ pageSize: 4 }}
            />
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
