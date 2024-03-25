import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Button, Card, Space, Table} from 'antd';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import { CertificateTeamDto } from '../../Dto/Certificate.dto';
import { getScoreData } from '../../Firebase/Firebase';
import {EventScoreModal} from "./EventScoreModal";

export const EventScore: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [visible,setVisible] = useState<boolean>(false)
  const [data, setData] = useState<any>();
  const [total, setTotal] = useState<any>();
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getScoreData();
      setData(data.events as any);
      setTotal(data.total as any);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData().then();
  }, [getData]);

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
        title: 'Athens',
        dataIndex: 'athens',
        key: 'athens',
        width: 200,
      },
      {
        title: 'Venus',
        dataIndex: 'venus',
        key: 'venus',
        width: 200,
      },
      {
        title: 'Zeus',
        dataIndex: 'zeus',
        key: 'zeus',
        width: 200,
      },
    ],
    [],
  );
  return (
    <MainLayout>
      <div className="mainPage">
        <div className="container-dashboard">
          <div
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}>
            <h1>Total Score</h1>
          </div>
          <Space
            title={'Total Score'}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              paddingBottom: '20px',
            }}>
            <Card
              style={{ backgroundColor: 'red' }}
              headStyle={{ color: 'white' }}
              title={'Athens'}>
              <h1 style={{ color: 'white',textAlign:'center' }}>{total?.athensScore}</h1>
            </Card>
            <Card
              style={{ backgroundColor: '#FFFF00' }}
              headStyle={{ color: 'black' }}
              title={'Venus'}>
              <h1 style={{ color: 'black',textAlign:'center'  }}>{total?.venusScore}</h1>
            </Card>
            <Card
              style={{ backgroundColor: 'blue' }}
              headStyle={{ color: 'white' }}
              title={'Zeus'}>
              <h1 style={{ color: 'white',textAlign:'center'  }}>{total?.zeusScore}</h1>
            </Card>
          </Space>

          <Card style={{ width: '100%' }}>
            <Table
                footer={()=> (<div style={{display:"flex",justifyContent:'flex-end'}}><Button
                    type="primary"
                    style={{ fontSize: 15, width: '100px', height: '30px' }}
                    onClick={()=> setVisible(true)}
                    // onClick={handlePrint}
                >
                    Print
                </Button></div>)}
              loading={loading}
              dataSource={data}
              columns={columns}
              pagination={{ pageSize: 4 }}
            />
          </Card>
        </div>
          <EventScoreModal visible={visible} setVisible={setVisible} data={data} total={total} />
      </div>
    </MainLayout>
  );
};
