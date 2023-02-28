import React, { FC } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Home} from "../pages/Home/Home";
import {About} from "../pages/About/About";
import {Contact} from "../Components/Contact";
import {Login} from "../pages/Login/Login";
import {SingleEvent} from "../pages/SingleEvent/SingleEvent";
import {TeamEvent} from "../pages/TeamEvent/TeamEvent";
import {SingleEventForm} from "../pages/SingleEventForm/SingleEventForm";
import {TeamEventForm} from "../pages/TeamEventForm/TeamEventForm";
import {Dashboard} from "../pages/Dashboard/Dashboard";
import {TeamEventDashboard} from "../pages/Dashboard/TeamEventDashboard";
import {useCache} from "../context/CacheContext";


const MainRouter: FC = () => {
  const {user} = useCache();
  return (
    <>
      <Routes>
        <Route
            path="/"
            element={user ? <Navigate replace={true} to={'/home'}/> :  <Navigate replace={true} to={'/login'}/>}
        />
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard-team' element={<TeamEventDashboard />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/single-event' element={<SingleEvent />} />
        <Route path='/single-event-form' element={<SingleEventForm />} />
        <Route path='/team-event' element={<TeamEvent />} />
        <Route path='/team-event-form' element={<TeamEventForm/>} />
      </Routes>
    </>
  );
};
export default MainRouter;
