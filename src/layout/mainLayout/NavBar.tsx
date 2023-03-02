import { Menu} from 'antd';
import { useNavigate } from 'react-router-dom';
import {useCallback} from "react";
import { logout} from "../../Firebase/Firebase";
import Logo from '../../images/logo.png';

export const NavBar = ({ isInline = false }) => {
  const navigate = useNavigate();
  const handlerLogout = useCallback(async ()=> {
        try{
          await logout()
          navigate('/login')
        }catch (e){
          console.log(e);
        }

  },[navigate])
  return (
    <div className="navbar" style={{ backgroundColor: '#fefefa', height: '10vh' }}>
      <div style={{position:'absolute',padding:15}}>
        <img src={Logo} alt="logo" width={110} height={110} />
      </div>
      <Menu
        onClick={({ key }) => {
          if (key === 'logout') {
            handlerLogout().then()
          } else {
            navigate(key);
          }
        }}
        mode={isInline ? 'inline' : 'horizontal'}
        style={{
          backgroundColor: 'rgb(191, 0, 26)',
          alignItems: 'center',
          justifyContent: 'flex-end',
          fontSize: 22,
          height: '10vh',
          fontWeight: '400',
          color:'white',
        }}
        items={[
          {
            label: 'Home',
            key: '/home',
          },
          {
            label: 'Single Events',
            key: '/dashboard',
          },
          {
            label: 'Team Events',
            key: '/dashboard-team',
          },
          {
            label: 'Scores',
            key: '/event-score',
          },
          // {
          //   label: 'Contact Us',
          //   key: '/contact',
          // },
          // {
          //   label: 'About Us',
          //   key: '/about',
          // },
          {
            label: 'Logout',
            key: 'logout',
          },
          // {
          //   label: (<Dropdown menu={{ items:[{key:'1',label:(<Button type={'text'}>Logout</Button>)}] }} placement="bottom" arrow>
          //     <Avatar size={64} icon={<UserOutlined />} />
          //   </Dropdown>),
          //   key: '/login',
          //   disabled:true
          // },
        ]}></Menu>

    </div>
  );
};
