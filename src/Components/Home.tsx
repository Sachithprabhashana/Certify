import React, { FC } from 'react'
import { TeamOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';

export const Home:FC = () => {
  return (
    <div style={{display:'flex',justifyContent:'center',alignSelf:'center',paddingTop:'100px'}}>
    <Space direction="vertical">
    <Space wrap>
      <Tooltip title="single player certificate">
      <Button style={{fontSize:30,width:'300px',height:'100px'}} icon={<UserOutlined />}>Single Event</Button>
      </Tooltip>
    </Space>

    <Space wrap>
      <Tooltip title="team player certificates">
      <Button  style={{fontSize:30,width:'300px',height:'100px'}} icon={<TeamOutlined />}>Team Event</Button>
      </Tooltip>
    </Space>
  </Space>
  </div>
  )
}
