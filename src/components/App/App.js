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

/* import api from "../../utils/mainApi";
import moviesApi from '../../utils/MoviesApi'; */
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

  // регистрация
  const onRegister = (password, email, name) => {
    movieAuth.register(password, email, name)
      .then(() => {
        handleLogin(true);
        navigate('/movies');
      })
      .catch((err) => {
        err.json().then (err => console.log(err.error))
      })
      .finally(() => {

      })
  }

  //авторизация
  const onLogin = (password, email) => {
    movieAuth.authorize (password, email)
      .then(res => {
        localStorage.setItem('jwt', res.jwt);
        setEmail(email);
        handleLogin(true);
        navigate('/movies');
      })
      .catch(err => {
        console.log(err);
      })
  }

  /*проверяем корректен ли токен, который хранится в local storage*/
/*   React.useEffect(() => {
    if (jwt) {
      movieAuth.checkToken(jwt)
        .then(res => { 
          setEmail(res.email);
          handleLogin(true);
          navigate('/');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [navigate]); */

  /*удаляем из local storage токен и разлогиниваемся*/
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    handleLogin(false);
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
                <Profile onSignOut={onSignOut}/>  
              </ProtectedRoute>   
            } />
            
             
            <Route path="*" element = {<NotFound />} />

        </Routes>
        </CurrentUserContext.Provider>
      </div>

  );
}

export default App;
