import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext'; 

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

import api from "../../utils/mainApi";
import moviesApi from '../../utils/MoviesApi';
import * as movieAuth from "../../utils/movieAuth";



const App = () => {
  const [email, setEmail]         = React.useState('');
  const [name, setName]           = React.useState('');
  const [loggedIn, setLoggedIn]   = React.useState(false); 
  const [textError, setTextError] = React.useState('');
  
  // установка контекста для пользователя
  const [currentUser, getCurrentUser] = React.useState({});

  const navigate = useNavigate();
  const location = useLocation();
  /*--------------------------------------------работа с данными юзера------------------------------------------- */
  // проверка jwt
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // удаляем из local storage токен и разлогиниваемся
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('token');
    localStorage.removeItem('searchText');
    localStorage.removeItem('savedSearchText');
    localStorage.removeItem('checkboxState');
    localStorage.removeItem('foundedMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('foundedSavedMovies');

    setLoggedIn(false);
    navigate('/');
    console.log(localStorage);
  };

/*-------------------------------------------работа с данными по фильмам------------------------------------------- */
const storageSearchText = (localStorage.getItem('searchText') )   
                         ? localStorage.getItem('searchText') 
                         : '';

const storageCheckboxState =  (localStorage.getItem('checkboxState')) 
                            ? JSON.parse(localStorage.getItem('checkboxState'))  
                            : false;

const storageSavedCheckboxState =  (localStorage.getItem('savedCheckboxState')) 
                            ? JSON.parse(localStorage.getItem('savedCheckboxState'))  
                            : false;

const storageFoundedMovies  = (localStorage.getItem('foundedMovies'))
                              ? JSON.parse(localStorage.getItem('foundedMovies')) 
                              : [];
                             
const storageSavedMovies  = (localStorage.getItem('savedMovies')) 
                            ? JSON.parse(localStorage.getItem('savedMovies')) 
                            : [];

const [searchText, setSearchText]        = React.useState(storageSearchText);
const [checkboxState, setCheckboxState]  = React.useState(storageCheckboxState);
const [savedCheckboxState, setSavedCheckboxState]  = React.useState(storageSavedCheckboxState);
const [foundedMovies, setFoundedMovies ] = React.useState(storageFoundedMovies);

const [allMovies, setAllMovies]     = React.useState([]);
const [savedMovies, setSavedMovies] = React.useState(storageSavedMovies);
const [foundedSavedMovies, setFoundedSavedMovies ] = React.useState(savedMovies);

// Сохранение параметров поиска в localStorage
React.useEffect(() => {
  localStorage.setItem('searchText', searchText);
  localStorage.setItem('checkboxState', checkboxState);
  localStorage.setItem('foundedMovies', JSON.stringify(foundedMovies));
  localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
}, [searchText, checkboxState, foundedMovies, savedMovies]);


// получение фильмов с бестфильм
const getMoviesFromApi = () => {
  moviesApi.getMovies()
    .then((data) => {
      setAllMovies(data);
      })
      .catch((err) => {
        console.error(`Проблемы с получением фильмов: ${err}`);
      });
}



// обработка клика для чекбокса в movies
function handleCheckboxClick() {
  setCheckboxState(!checkboxState);
  if (allMovies.length === 0) {
    getMoviesFromApi()
  };
}

// обработка сабмита в movies
const handleSubmitSearchingForm = (searchText, checkboxState) => {
  setCheckboxState(checkboxState);
  setSearchText(searchText);
  if (allMovies.length === 0) {
    getMoviesFromApi();
  }
  searchingMovie(allMovies, checkboxState,  searchText)
}

// обработка клика для чекбокса в savedmovies
function handleSavedCheckboxClick() {
  setSavedCheckboxState(!savedCheckboxState);
  setSearchText(searchText);
  if (savedMovies.length === 0) {
    console.log('искать негде');
  }
  setFoundedSavedMovies(searchingMovie(savedMovies, !savedCheckboxState,  searchText));
}


// обработка сабмита в savedmovies
const handleSubmitSaveSearchingForm = (searchText, savedCheckboxState) => {
  setSavedCheckboxState(!savedCheckboxState);
  setSearchText(searchText);
  if (savedMovies.length === 0) {
    console.log('искать негде');
  }
  setFoundedSavedMovies(searchingMovie(savedMovies, savedCheckboxState,  searchText));
}


// функция для поиска фильмов
const searchingMovie = (movies, checkboxState, searchText) => {
  let foundedMovies = movies;
  if (checkboxState === true) {foundedMovies = foundedMovies.filter((movie) => movie.duration <= 40)}
  foundedMovies = foundedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchText.toLowerCase()));
  return foundedMovies;
}

// Поиск фильмов
React.useEffect(() => {
  if (allMovies) { 
   const foundedMovies = searchingMovie(allMovies,checkboxState, searchText);
   setFoundedMovies(foundedMovies);
  }
}, [allMovies, checkboxState, searchText]);



// сохранение видео 
const handleSaveMovie = (movie) => {
  api.saveMovie(movie)
    .then((savedMovie) => {
      setSavedMovies((movies) => [...movies, savedMovie]);
      setFoundedSavedMovies((movies) => [...movies, savedMovie]);
    })
    .catch((err) => {
      console.log(err);
    })
}

// удаление видео 
const handleUnSaveMovie = (movie) => {
  api.unsaveMovie(movie._id)
    .then((res) => {
      setSavedMovies((movies) => movies.filter((savedMovie) => savedMovie._id !== movie._id));
      setFoundedSavedMovies((movies) => movies.filter((savedMovie) => savedMovie._id !== movie._id));
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
                <Movies movies                    = {foundedMovies}
                        savedMovies               = {savedMovies}
                        handleCardButtonClick     = {handleCardButtonClick}
                        handleCheckboxClick       = {handleCheckboxClick}
                        handleSubmitSearchingForm = {handleSubmitSearchingForm}
                        storageCheckboxState      = {storageCheckboxState}
                        storageSearchText         = {storageSearchText}
                       />  
              </ProtectedRoute>   
            } />

            <Route  path="/savedmovies" element = { 
              <ProtectedRoute loggedIn = {loggedIn} >
                <SavedMovies movies                    = {foundedSavedMovies}
                             savedMovies               = {savedMovies}
                             handleCardButtonClick     = {handleUnSaveMovie}
                             handleCheckboxClick       = {handleSavedCheckboxClick}
                             handleSubmitSearchingForm = {handleSubmitSaveSearchingForm}
                             storageCheckboxState      = {storageSavedCheckboxState}
                             storageSearchText         = {storageSearchText}
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
