import { Menu } from 'antd'
import {useNavigate} from 'react-router-dom';



export const Navbar = ({isInline = false}) => {
  const navigate = useNavigate()
  return (
    <div className='navbar' style={{backgroundColor: '#fefefa',height:'10vh'}}>
      <Menu
      onClick={({key})=> {
        if(key === 'login'){

        }else{
          navigate(key)
        }
      }}
       mode={isInline ? 'inline':'horizontal'} style={{backgroundColor:'	#EEE8AA',alignItems:'center',justifyContent:'flex-end',fontSize:20,height:'10vh'}} items={[
        {
          label:'Home',
          key:'/'
        },
        {
          label:'Contact Us',
          key:'/contact'
        },
        {
          label:'About Us',
          key:'/about'
        },
        {
          label:'Login',
          key:'/login'
        }
      ]}></Menu>
    </div>
  )
}
