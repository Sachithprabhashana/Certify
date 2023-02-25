import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import {Home} from "../pages/Home/Home";
import {About} from "../pages/About/About";
import {Contact} from "../Components/Contact";
import {Login} from "../Components/Login";
import {SingleEvent} from "../pages/SingleEvent/SingleEvent";
import {TeamEvent} from "../pages/TeamEvent/TeamEvent";

const MainRouter: FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/single-event' element={<SingleEvent />} />
        <Route path='/team-event' element={<TeamEvent />} />
      </Routes>
    </>
  );
};
export default MainRouter;
