import React, {FC, useState} from 'react';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import {SingleFormModal} from "../FormModals/SingleFormModal";
import {TeamFormModal} from "../FormModals/TeamFormModal";

export const Home: FC = () => {
    const [singleVisible,setSingleVisible] = useState(false)
    const [teamVisible,setTeamVisible] = useState(false);

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
                    onClick={()=> {
                        setSingleVisible(true);
                    }}
                    type="primary"
                    danger
                    style={{ fontSize: 20, width: '300px', height: '80px' }}
                    icon={<UserOutlined />}>
                    Single Event
                </Button>
            </Tooltip>
          </Space>

          <Space wrap>
            <Tooltip title="Click for team event certificates">
                <Button
                    onClick={()=> {
                        setTeamVisible(true);
                    }
                    }
                    type="primary"
                    danger
                    style={{ fontSize: 20, width: '300px', height: '80px' }}
                    icon={<TeamOutlined />}>
                    Team Event
                </Button>
            </Tooltip>
          </Space>
        </Space>
            <SingleFormModal singleVisible={singleVisible} setSingleVisible={setSingleVisible}/>
            <TeamFormModal teamVisible={teamVisible} setTeamVisible={setTeamVisible} />
      </div>
    </MainLayout>
  );
};
