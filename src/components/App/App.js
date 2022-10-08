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

 import api from "../../utils/mainApi";
/*import moviesApi from '../../utils/MoviesApi'; */
import * as movieAuth from "../../utils/movieAuth";
import { CurrentUserContext } from '../../context/CurrentUserContext'; 


const App = () => {
  const [selectedMovie, handleSelectMovie] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [loggedIn, setLoggedIn]  = React.useState(false); 

  
  /*установка контекста для пользователя*/
  const [currentUser, getCurrentUser] = React.useState({});

  const navigate = useNavigate();

  /*проверка jw*/
  const checkToken = () => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    movieAuth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate('/movies');
          setEmail(email);
          setName(name);
        }
      })
      .catch((err) => {
        onSignOut();
        console.error(err);
      });
    }
  };

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserData()
        .then((data) => {
          getCurrentUser(data);
        })
        .catch((err) => {
          console.error(`Проблемы с получением данных пользователя: ${err}`);
        });
    }
  }, [loggedIn]);


  React.useEffect(() => {
    checkToken();
  }, []);

 const handleUpdateUser = ({name, email}) => {
    api.postUserData(name, email)
      .then((userData)=>{
        getCurrentUser(userData.user);
      })
      .catch((err) => console.error(err));
  }

  // регистрация
  const onRegister = (password, email, name) => {
    movieAuth.register(password, email, name)
      .then((res) => {
       if (res) {
        onLogin(password, email);
       }
      })
      .catch((err) => {
        err.json().then (err => console.log(err))
      })
      .finally(() => {

      })
  }

  //авторизация
  const onLogin = (password, email) => {
    movieAuth.authorize (password, email)
      .then( res => {
        localStorage.setItem('jwt', res.jwt);
        movieAuth.checkToken(res.jwt)
        .then((res) => {
          if (res) {
            setTimeout(() => navigate('/movies'), 1000);
            setLoggedIn(true);
            setEmail(email);
            setName(name);
          }
      })
      .catch(err => {console.log(err)})
    })
  }

  /*удаляем из local storage токен и разлогиниваемся*/
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/');
  };

/* возвращаемый объект */
  return (
    
      <div className="app">
        <CurrentUserContext.Provider value={currentUser}>
         <Routes> 

            <Route  path="/" element = {<Main loggedIn={loggedIn}/>} />
            <Route path="/signup" element = {<Register onRegister={onRegister}/> } /> 
            <Route path="/signin" element = {<Login  onLogin={onLogin}/> } /> 

            <Route  path="/movies" element = { 
              <ProtectedRoute loggedIn={loggedIn} >
                <Movies />  
              </ProtectedRoute>   
            } />

            <Route  path="/savedmovies" element = { 
              <ProtectedRoute loggedIn={loggedIn} >
                <SavedMovies />  
              </ProtectedRoute>   
            } />

          <Route  path="/profile" element = { 
              <ProtectedRoute loggedIn={loggedIn} >
                <Profile onSignOut={onSignOut}
                        onUpdateUser={handleUpdateUser}
                        />  
              </ProtectedRoute>   
            } />
            
             
            <Route path="*" element = {<NotFound />} />

        </Routes>
        </CurrentUserContext.Provider>
      </div>

  );
}

export default App;
