import React from 'react';
//import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Footer from '../Footer/Footer';
import AboutMe from '../AboutMe/AboutMe';

const App = () => {
  
/* возвращаемый объект */
  return (
 
      <div className="App">
        <AboutMe />
        <Footer />
      </div>

  );
}

export default App;
