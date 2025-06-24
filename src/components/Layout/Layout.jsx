import React from 'react';
import style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout({userName,userData,setUserData}) {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar userName={userName} setUserData={setUserData} userData={userData}/>
      <div className="main-content">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
