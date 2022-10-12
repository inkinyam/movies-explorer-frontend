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
import { useLocation } from 'react-router-dom';
 import api from "../../utils/mainApi";
import moviesApi from '../../utils/MoviesApi';
import * as movieAuth from "../../utils/movieAuth";
import { CurrentUserContext } from '../../context/CurrentUserContext'; 


const App = () => {
  const [email, setEmail]         = React.useState('');
  const [name, setName]           = React.useState('');
  const [loggedIn, setLoggedIn]   = React.useState(false); 
  const [textError, setTextError] = React.useState('');
  
  /*установка контекста для пользователя*/
  const [currentUser, getCurrentUser] = React.useState({});

  const navigate = useNavigate();
  const location = useLocation();
  /*--------------------------------------------работа с данными юзера------------------------------------------- */
  /*проверка jwt*/
  const checkToken = () => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    movieAuth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(email);
          setName(name);
        }
      })
      .then(() => {
        navigate(location.pathname);
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

  //очистка ошибки 
  const clearTextError = () => { 
    setTimeout(() => setTextError(''), 10000) };

 //апдейт данных юзера
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
        console.log(err);
        setTextError(err.status === 409 ? 'Пользователь с таким email уже зарегистрирован' : 'При регистрации пользователя произошла ошибка.');
      })
      .finally(()=> {
        setTimeout(() => clearTextError(), 1000)
      })
  }

  //авторизация
  const onLogin = (password, email) => {
    movieAuth.authorize (password, email)
      .then((res) => {
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
      })
      .catch((err) => { 
        console.log(err);
        setTextError(err.status === 401 ? 'Вы ввели неправильный логин или пароль.' : 'При авторизации произошла ошибка.');
      })
      .finally(()=> {
        setTimeout(() => clearTextError(), 1000)
      })
    
  }

  /*удаляем из local storage токен и разлогиниваемся*/
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/');
  };


/*-------------------------------------------работа с данными по фильмам------------------------------------------- */
const [movies, setMovies]           = React.useState([]);
const [savedMovies, setSavedMovies] = React.useState([]);



React.useEffect(() => {
  if (loggedIn) {
  moviesApi.getMovies()
    .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.error(`Проблемы с получением фильмов: ${err}`);
      });
  }
}, [loggedIn]);

const handleSaveMovie = (movie) => {
  api.saveMovie(movie)
    .then((savedMovie) => {setSavedMovies((movies) => [...movies, savedMovie]);
      console.log('фильм сохранен')
    })
    .catch((err) => {
      console.log(err);
    })
}

const handleUnSaveMovie = (movie) => {
  api.unsaveMovie(movie._id)
    .then((res) => {
      setSavedMovies((movies) => movies.filter((savedMovie) => savedMovie._id !== movie._id))
      console.log('фильм удален из сохраненок')
    })
    .catch((err) => {
      console.log(err);
    })
}

 // Обработчик клика  на кнопку в карточке
const handleCardButtonClick = (movie) => {
  const isSaved = savedMovies.some(savedMovie => savedMovie.movieId === movie.id);
  if (isSaved) {
    const savedMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.id);
    handleUnSaveMovie(savedMovie);
  } else {
    handleSaveMovie(movie);
  }
}


/* возвращаемый объект */
  return (
      <div className="app">
        <CurrentUserContext.Provider value = {currentUser}>
         <Routes> 
            <Route path="*" element  = {<NotFound />} />
            <Route  path="/" element = {<Main loggedIn={loggedIn}/>} />
            <Route path="/signup" 
                   element = {
                    <Register onRegister = {onRegister} 
                              textError  = {textError}/> } /> 
            <Route path="/signin" 
                   element = {
                     <Login  onLogin  = {onLogin} 
                             textError = {textError}/> } /> 

            <Route  path="/movies" element = { 
              <ProtectedRoute loggedIn = {loggedIn} >
                <Movies movies                = {movies}
                        savedMovies           = {savedMovies}
                        handleCardButtonClick = {handleCardButtonClick}
                        />  
              </ProtectedRoute>   
            } />

            <Route  path="/savedmovies" element = { 
              <ProtectedRoute loggedIn = {loggedIn} >
                <SavedMovies movies                = {movies}
                             savedMovies           = {savedMovies}
                             handleCardButtonClick = {handleCardButtonClick}
                             />  
              </ProtectedRoute>   
            } />

          <Route  path="/profile" element = { 
              <ProtectedRoute loggedIn = {loggedIn} >
                <Profile onSignOut   = {onSignOut}
                        onUpdateUser = {handleUpdateUser}
                        />  
              </ProtectedRoute>   
            } />

        </Routes>
        </CurrentUserContext.Provider>
      </div>

  );
}

export default App;
