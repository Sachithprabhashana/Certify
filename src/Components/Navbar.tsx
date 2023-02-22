import React,{ FC } from 'react'
import { Menu } from 'antd'

export const Navbar:FC = () => {
  return (
    <div className='navbar' style={{backgroundColor: '#fefefa',height:'10vh'}}>
    <Menu
     style={{backgroundColor:'	#EEE8AA',alignItems:'center',justifyContent:'flex-end',fontSize:20,height:'10vh'}} items={[
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
