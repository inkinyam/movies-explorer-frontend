import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../context/CurrentUserContext.js'; 

const App = () => {
  const currentUser = React.useContext(CurrentUserContext);
  const [loggedIn, handleLogin]  = React.useState(true); 

  const setLoginTrue = () => {
    handleLogin(true);
  }
  
/* возвращаемый объект */
  return (
   
      <div className="app">
         <Routes> 
            <Route path="/sign-up" element = {<Register /> } /> 
            <Route path="/sign-in" element = {<Login /> } /> 
            <Route  path="/" element = {<Main/>} />

            <Route  path="/" element = { <ProtectedRoute loggedIn={loggedIn} />} >
               <Route  path="/movies" element = {<Movies />} />    
               <Route  path="/savedmovies" element = {<SavedMovies />} />                   
               <Route  path="/profile" element = {<Profile />} />                 
            </Route>
           
            <Route path="*" element = {<NotFound />} />

        </Routes>
      </div>

  );
}

export default App;
