import React, { FC } from 'react'
import { TeamOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';

export const Home:FC = () => {
  return (
    <div style={{display:'flex',justifyContent:'center',alignSelf:'center',paddingTop:'100px'}}>
    <Space direction="vertical">
    <Space wrap>
      <Tooltip title="single certificates">
      <Button style={{fontSize:30,width:'300px',height:'100px'}} icon={<UserOutlined />}>Single Player</Button>
      </Tooltip>
    </Space>

    <Space wrap>
      <Tooltip title="team certificates">
      <Button  style={{fontSize:30,width:'300px',height:'100px'}} icon={<TeamOutlined />}>Team Player</Button>
      </Tooltip>
    </Space>
  </Space>
  </div>
  )
}
