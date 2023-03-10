import React, {FC, useCallback} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,Card,message } from 'antd';
import './Login.css';
import {login} from "../../Firebase/Firebase";
import {useNavigate} from "react-router-dom";

export const Login:FC = () => {
 const navigate = useNavigate()
    const onFinish = useCallback(async (values:any)=> {
        console.log(values)
        try{
            await login(values);
            message.success('Successful');
            navigate('/')
        }catch (e:any){
            message.error(e.message);
        }
    },[navigate])
  return (

        <div className="mainPageLogin">
            <div style={{padding:'30px 40px 0px 40px',position:'absolute',alignItems:'center'}}>
                <h4>" මෙම සහතික පත්‍ර නිකුත් කිරීමේ මාර්ගගත පද්ධතිය ර/කුමර විද්‍යාලය - නවනගරය,රත්නපුරය . සතු දේපලකි. එය අනවසරයෙන් භාවිතයට ගැනීම , පිටපත් කර ගැනීම, අන්සතු කිරීම සහ ඒ ආශ්‍රිතව කරන සියලු අනවසර අවභාවිතාවන්ට එරහිව 2007 අංක 24 දරන පරිගණක අපරාද පනත යටතේ සහ 2003 අංක 36 දරන බුද්ධ්මය දේපල පනත යන නීතිමය ප්‍රතිපාදනයන්ට අනුව කටයුතු කරනු ඇත."
                </h4>
                <h4>This Online Certificate Issuance System is the property of R/Kumara Vidyalaya - NewTown, Ratnapura. Unauthorized use, copying, misappropriation and all related misuses are prohibited under the Computer Crime Act No. 24 of 2007 and 2003 No. 36 will be dealt with in accordance with the legal provisions of the Intellectual Property Act."</h4>
            </div>
          <div className="container-login">

            <Card style={{minWidth:'500px'}} title={'LogIn'} headStyle={{justifyContent:'center',display:'flex',alignItems:'center'}}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
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
