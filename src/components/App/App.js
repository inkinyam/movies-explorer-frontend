import React from 'react';
//import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Promo from '../Promo/Poromo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';


const App = () => {
  
/* возвращаемый объект */
  return (
 
      <div className="app">
        <Header />
        <Navigation />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Footer />
      </div>

  );
}

export default App;
