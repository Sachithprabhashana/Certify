import React, {FC, useMemo} from 'react';
import {CertificateTeamDto} from "../../Dto/Certificate.dto";
import { Card, Divider, Space, Table} from "antd";
import Logo from "../../images/logo.png";

type Props = {
    data: any;
    total:any;
}
export const ScorePrintPreview:FC <Props> = ({data,total}) => {

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
                title: 'Zues',
                dataIndex: 'zues',
                key: 'zues',
                width: 200,
            },
        ],
        [],
    );

    const year = useMemo(()=>{
        const d = new Date();
        return d.getFullYear().toString();
    },[])
    return(
        <div>
            <div style={{display:"flex",justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <img src={Logo} alt="logo" width={110} height={110} />
                <h4>PRINCE SPORTSMEET {year}</h4>
            </div>
            <Divider />

            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
            />

            <div
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                }}>
                <h3>Total Score</h3>
            </div>
            <Space
                title={'Total Score'}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                }}>
                <Card
                    style={{ backgroundColor: 'red' }}
                    headStyle={{ color: 'white' }}
                    title={'Athens'}>
                    <h3 style={{ color: 'white',textAlign:'center' }}>{total?.athensScore}</h3>
                </Card>
                <Card
                    style={{ backgroundColor: '#FFFF00' }}
                    headStyle={{ color: 'black' }}
                    title={'Venus'}>
                    <h3 style={{ color: 'black',textAlign:'center'  }}>{total?.venusScore}</h3>
                </Card>
                <Card
                    style={{ backgroundColor: 'blue' }}
                    headStyle={{ color: 'white' }}
                    title={'Zues'}>
                    <h3 style={{ color: 'white',textAlign:'center'  }}>{total?.zuesScore}</h3>
                </Card>
            </Space>

        </div>
    )
}
