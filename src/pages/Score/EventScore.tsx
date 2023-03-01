import React, {FC, useMemo} from 'react'
import {Card, Space, Table} from 'antd';
import {MainLayout} from "../../layout/mainLayout/MainLayout";
import {CertificateTeamDto} from "../../Dto/Certificate.dto";

export const EventScore: FC = () => {

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
                dataIndex: 'event',
                key: 'event',
                width: 200,
            },
            {
                title: 'Venus',
                dataIndex: 'event',
                key: 'event',
                width: 200,
            },
            {
                title: 'Zues',
                dataIndex: 'event',
                key: 'event',
                width: 200,
            },


        ],
        [],
    );
    return (
<MainLayout>
    <div className="mainPage">
        <div className="container-dashboard">
            <Space style={{justifyContent:"center",alignItems:'center',display:'flex',paddingBottom:'20px'}}>
                <Card style={{backgroundColor:'rgb(191, 0, 26)'}} headStyle={{color:'white'}} title={'Athens'} >
                    <h1 style={{color:"white"}}>233</h1>
                </Card>
                <Card style={{backgroundColor:'rgb(191, 0, 26)'}} headStyle={{color:'white'}} title={'Venus'}>
                    <h1 style={{color:"white"}}>215</h1>
                </Card>
                <Card style={{backgroundColor:'rgb(191, 0, 26)'}} headStyle={{color:'white'}} title={'Zues'} >
                    <h1 style={{color:"white"}}>211</h1>
                </Card>

            </Space>
            <Card style={{ width: '100%' }}>
                <Table
                    columns={columns}
                    pagination={{ pageSize: 4 }}
                />
            </Card>
            </div>
    </div>
</MainLayout>
    )
}
