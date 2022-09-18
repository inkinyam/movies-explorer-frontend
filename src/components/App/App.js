import React from 'react';
//import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Promo from '../Promo/Poromo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';


const App = () => {
  
/* возвращаемый объект */
  return (
 
      <div className="app">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Footer />
      </div>

  );
}

export default App;
