import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NavBar = ({ isInline = false }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar" style={{ backgroundColor: '#fefefa', height: '10vh' }}>
      <Menu
        onClick={({ key }) => {
          if (key === 'login') {
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
            key: '/',
          },
          {
            label: 'Single Event Dashboard',
            key: '/dashboard',
          },
          {
            label: 'Team Event Dashboard',
            key: '/dashboard-team',
          },
          {
            label: 'Contact Us',
            key: '/contact',
          },
          {
            label: 'About Us',
            key: '/about',
          },
          {
            label: 'Login',
            key: '/login',
          },
        ]}></Menu>
    </div>
  );
};
