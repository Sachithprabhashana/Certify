import React, { FC } from 'react';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import {useNavigate} from "react-router-dom";

export const Home: FC = () => {
    const navigate = useNavigate();
  return (
    <MainLayout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '30vh',
          backgroundImage: `url( "https://img.pikbest.com/backgrounds/20220119/sports-fitness-running-background_6242983.jpg!bw700" )`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: '60vh',
          backgroundRepeat: 'no-repeat',
        }}>
        <Space direction="vertical">
          <Space wrap>
            <Tooltip title="Click for single event certificate">
              <Button
                  onClick={() => {
                      navigate('/single-event-form');
                  }}
                type="primary"
                style={{ fontSize: 30, width: '300px', height: '100px' }}
                icon={<UserOutlined />}>
                Single Event
              </Button>
            </Tooltip>
          </Space>

          <Space wrap>
            <Tooltip title="Click for team event certificates">
              <Button
                  onClick={() => {
                      navigate('/team-event-form');
                  }}
                type="primary"
                style={{ fontSize: 30, width: '300px', height: '100px' }}
                icon={<TeamOutlined />}>
                Team Event
              </Button>
            </Tooltip>
          </Space>

          <Space wrap>
            <Tooltip title="Click for team event certificates">
              <Button
                  onClick={() => {
                      navigate('/participation');
                  }}
                type="primary"
                style={{ fontSize: 30, width: '300px', height: '100px' }}
                icon={<TeamOutlined />}>
                Participation
              </Button>
            </Tooltip>
          </Space>
        </Space>
      </div>
    </MainLayout>
  );
};
