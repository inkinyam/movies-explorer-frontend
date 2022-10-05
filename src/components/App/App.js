import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

import api from "../../utils/api";
import * as movieAuth from "../../utils/movieAuth";
import { CurrentUserContext } from '../../context/CurrentUserContext'; 


const App = () => {
  const [selectedMovie, handleSelectMovie] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [loggedIn, handleLogin]  = React.useState(false); 

  
/*установка контекста для пользователя*/
 const [currentUser, getCurrentUser] = React.useState({});

 const navigate = useNavigate();
 const jwt = localStorage.getItem('jwt');
/*   
  React.useEffect(()=>{
    if (jwt) {
      movieAuth.authorize(jwt);
      handleLogin(true);
      setEmail(currentUser.email);
      setName(currentUser.name);
    } else {
      console.log('Пользователя не существует');
      getCurrentUser({});
      handleLogin(false);
      navigate("/signin");
    }
  }, []);


  React.useEffect(()=>{
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getMovies()])
      .then((userData, moviesData) => {
        getCurrentUser(userData);
        setMovies(moviesData);
      })
      .then(() => { navigate('/movies')})
      .catch((err) => console.error(err))
    } else {
      console.log('Вам нужно авторизироваться!');
    }
  }, loggedIn);

  const handleUpdateUser = ({name, email}) => {
    api.postUserData(name, email)
      .then((userData)=>{
        getCurrentUser(userData.user);
      })
      .catch((err) => console.error(err));
  }

  const renewMovieCards= (newMovie, id) => {
    setMovies((state) => state.map((c) => c._id === id ? newMovie : c));
  }
 */
/* возвращаемый объект */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
         <Routes> 

            <Route  path="/" element = {<Main/>} />
            <Route path="/signup" element = {<Register /> } /> 
            <Route path="/signin" element = {<Login /> } /> 

            <Route  path="/" element = { <ProtectedRoute loggedIn={loggedIn} >
                <Route  path="/movies" element = {<Movies />} />    
                <Route  path="/savedmovies" element = {<SavedMovies />} />                   
                <Route  path="/profile" element = {<Profile />} />            
              </ProtectedRoute>} >
            </Route>
           
            <Route path="*" element = {<NotFound />} />

        </Routes>
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
