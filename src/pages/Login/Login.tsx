import React, {FC, useCallback} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,Card } from 'antd';
import './Login.css';

export const Login:FC = () => {

    const onFinish = useCallback((values:any)=> {
        console.log(values)
    },[])
  return (

        <div className="mainPageLogin">
          <div className="container-login">
            <Card style={{minWidth:'500px'}} title={'LogIn'} headStyle={{justifyContent:'center',display:'flex',alignItems:'center'}}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>



            </Card>
          </div>
        </div>

  )
}
