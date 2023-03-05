import React, {FC, useState} from 'react';
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space } from 'antd';
import { MainLayout } from '../../layout/mainLayout/MainLayout';
import {useNavigate} from "react-router-dom";
import {FormModal} from "../../Components/CertificateBuilder/FormModal";

export const Home: FC = () => {
    const [visible,setVisible] = useState(false)

    const navigate = useNavigate();
  return (
    <MainLayout>
        <div>
            <div>
                <Button
                    // onClick={showModal}
                    onClick={()=> {
                        setVisible(true)
                    }}
                    type="primary"
                    danger
                    style={{ fontSize: 20, width: '200px', height: '60px' }}
                    icon={<UserOutlined />}>
                    Single Event
                </Button>
                <Button
                    // onClick={showModal}

                    type="primary"
                    danger
                    style={{ fontSize: 20, width: '200px', height: '60px' }}
                    icon={<TeamOutlined />}>
                    Team Event
                </Button>

            </div>
        </div>
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
        </Space>
            <FormModal visible={visible} setVisible={setVisible}/>
      </div>
    </MainLayout>
  );
};
