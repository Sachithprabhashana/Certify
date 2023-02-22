import React,{ FC } from 'react'
import { Menu } from 'antd'

export const Navbar:FC = () => {
  return (
    <div className='navbar'>
    <Menu
     items={[
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
