import React from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext'; 

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UnAuthRoute from '../UnAuthRoute/UnAuthRoute';
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

import correctFormatFilm from '../../utils/correctFormatFilm';



const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = React.useState(false);

  /*--------------------------------------------работа с данными пользователя------------------------------------------- */
  const [email, setEmail]         = React.useState('');
  const [name, setName]           = React.useState('');
  const [loggedIn, setLoggedIn]   = React.useState(false); 
  const [textError, setTextError] = React.useState('');
  
  // установка контекста для пользователя
  const [currentUser, getCurrentUser] = React.useState({});

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
        setTextError(`При авторизации пользователя произошла ошибка: ${err}`);
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
          setTextError(`Проблемы с получением данных пользователя: ${err}`);
        })
        .finally(()=> {
          setTimeout(() => setTextError(""), 10000);
        });
    }
  }, [loggedIn]);


  React.useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  //апдейт данных юзера
  const handleUpdateUser = ({name, email}) => {
    setIsLoading(true);
    api.postUserData(name, email)
      .then((userData)=>{
        getCurrentUser(userData.user);
      })
      .catch((err) => {
        setTextError(err.status === 400 ? 'Вы указали некорректные данные' : 'При обновлении данных пользователя произошла ошибка.');
      })
      .finally(()=> {
        setTimeout(() => setTextError(""), 10000);
        setIsLoading(false);
      });
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
        setTextError(err.status === 409 ? 'Пользователь с таким email уже зарегистрирован' : 'При регистрации пользователя произошла ошибка.');
      })
      .finally(()=> {
        setTimeout(() => setTextError(""), 10000);
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
            getCurrentUser(res);
            setTimeout(() => navigate('/movies'), 1000);
            setLoggedIn(true);
            setEmail(res.email);
            setName(res.name);
            getSavedMoviesFromApi();
          }
        })
      })
      .catch((err) => { 
        setTextError(err.status === 401 ? 'Вы ввели неправильный логин или пароль.' : 'При авторизации произошла ошибка.');
      })
      .finally(()=> {
        setTimeout(() => setTextError(""), 10000);
      })
  }


  // удаляем из local storage токен и разлогиниваемся
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchText');
    localStorage.removeItem('checkboxState');
    localStorage.removeItem('savedCheckboxState');
    localStorage.removeItem('savedSearchText');

    localStorage.removeItem('foundedMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('allMovies');
    setSearchText('');
    setCheckboxState(false);
    setSavedCheckboxState(false);
    setSavedSearchText('');
    setFoundedMovies([]);
    setSavedMovies([]);
    setFoundedSavedMovies([]);

    getCurrentUser([]);
    setLoggedIn(false);
    navigate('/');
  };

/*-------------------------------------------работа с данными по фильмам------------------------------------------- */
  const storageSearchText     = (localStorage.getItem('searchText') )   
                              ? localStorage.getItem('searchText') 
                              : '';

  const storageCheckboxState  = (localStorage.getItem('checkboxState')) 
                              ? JSON.parse(localStorage.getItem('checkboxState'))  
                              : false;

 const storageSavedSearchText = (localStorage.getItem('savedSearchText') )   
                              ? localStorage.getItem('savedSearchText') 
                              : '';

  const storageSavedCheckboxState =  (localStorage.getItem('savedCheckboxState')) 
                              ? JSON.parse(localStorage.getItem('savedCheckboxState'))  
                              : false;

  const storageFoundedMovies  = (localStorage.getItem('foundedMovies')!=='null')
                              ?  (localStorage.getItem('foundedMovies')!=='undefined')
                              ? JSON.parse(localStorage.getItem('foundedMovies')) 
                              : []
                              : [];
                              
  const storageSavedMovies  = (localStorage.getItem('savedMovies')!=='null')
                              ? (localStorage.getItem('savedMovies')!=='undefined')
                              ? JSON.parse(localStorage.getItem('savedMovies')) 
                              : []
                              : [];

  const storageAllMovies    = (localStorage.getItem('allMovies')!=='null')
                              ? (localStorage.getItem('allMovies')!=='undefined')
                              ? JSON.parse(localStorage.getItem('allMovies')) 
                              : []
                              : [];

  const [searchText, setSearchText]                  = React.useState(storageSearchText);
  const [checkboxState, setCheckboxState]            = React.useState(storageCheckboxState);
  const [savedCheckboxState, setSavedCheckboxState]  = React.useState(storageSavedCheckboxState);
  const [savedSearchText, setSavedSearchText]        = React.useState(storageSavedSearchText);
  const [foundedMovies, setFoundedMovies ]           = React.useState(storageFoundedMovies);

  const [allMovies, setAllMovies]                    = React.useState(storageAllMovies);
  const [savedMovies, setSavedMovies]                = React.useState(storageSavedMovies);
  const [foundedSavedMovies, setFoundedSavedMovies ] = React.useState(savedMovies);
  const [allSavedMovies, setAllSavedMovies]          = React.useState([]);

  // Сохранение параметров поиска в localStorage
  React.useEffect(() => {
    localStorage.setItem('searchText', searchText);
    localStorage.setItem('checkboxState', checkboxState);
    localStorage.setItem('savedCheckboxState', savedCheckboxState);
    localStorage.setItem('savedSearchText', savedSearchText);

    localStorage.setItem('foundedMovies', JSON.stringify(foundedMovies));
    localStorage.setItem('allMovies', JSON.stringify(allMovies));
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [searchText, checkboxState, savedCheckboxState, savedSearchText, foundedMovies, savedMovies, allMovies]);


  // получение фильмов с бестфильм
  const getMoviesFromApi = () => {
    moviesApi.getMovies()
      .then((data) => {
        data = data.map(correctFormatFilm);
        setAllMovies(data);
      })
      .catch((err) => {
        setTextError(err.status === 401 ? 'Вам нужно авторизоваться' : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => setTextError(""), 10000);
      });
  }

 const getOwnSavedMovies = (movies) => {
    return movies.filter((movie) => movie.owner === currentUser._id);
  }
  

  // получение сохраненных фильмов
  const getSavedMoviesFromApi = () => {
    setIsLoading(true);
    api.getSavedMovies()
      .then((data) => {
        setAllSavedMovies(data);
      })
      .catch((err) => {
        setTextError(err.status === 401 ? 'Вам нужно авторизоваться' : 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => setTextError(""), 10000);
      });
  }


  React.useEffect(() => {
    if (allSavedMovies.length!==0){
      const ownSavedMovies = getOwnSavedMovies(allSavedMovies) 
      setSavedMovies(ownSavedMovies);
      setFoundedSavedMovies(ownSavedMovies)
      setIsLoading(false);
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSavedMovies]); 

    

  // обработка клика для чекбокса в movies
  function handleCheckboxClick() {
    setIsLoading(true);
    setCheckboxState(!checkboxState);
    if (allMovies.length === 0) {
      getMoviesFromApi()
    };
  }

  // обработка сабмита в movies
  const handleSubmitSearchingForm = (searchText, checkboxState) => {
    setIsLoading(true);
    setCheckboxState(checkboxState);
    setSearchText(searchText);
    if (allMovies.length === 0) {
      getMoviesFromApi();
    }
    searchingMovie(allMovies, checkboxState,  searchText)
  }

  // обработка клика для чекбокса в savedmovies
  function handleSavedCheckboxClick(savedCheckboxState) {
    setSavedCheckboxState(savedCheckboxState);
    setSavedSearchText(savedSearchText);
    if (savedMovies.length === 0) {

    }
    setFoundedSavedMovies(searchingMovie(savedMovies, savedCheckboxState,  savedSearchText));
  }


  // обработка сабмита в savedmovies
  const handleSubmitSaveSearchingForm = (savedSearchText, savedCheckboxState) => {
    setSavedCheckboxState(!savedCheckboxState);
    setSavedSearchText(savedSearchText);
    if (savedMovies.length === 0&&location.pathname === '/savedmovies'&&loggedIn) {
   
    }
    setFoundedSavedMovies(searchingMovie(savedMovies, savedCheckboxState,  savedSearchText));
  
  }


  // функция для поиска фильмов
  const searchingMovie = (movies, checkboxState, searchText) => {
    let foundedMovies = movies;
    if (checkboxState === true) {foundedMovies = foundedMovies.filter((movie) => movie.duration <= 40)}
    foundedMovies = foundedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(searchText.toLowerCase()));
    if (foundedMovies.length === 0&&location.pathname === '/movies'&&loggedIn) {
      setTextError('Ничего не найдено');
      setTimeout(() => setTextError(""), 10000);
    }
    return foundedMovies;
    
  }

  React.useEffect(() => {
    if (allMovies.length!==0) { 
    const foundedMovies = searchingMovie(allMovies,checkboxState, searchText);
    setFoundedMovies(foundedMovies);
    setIsLoading(false);
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMovies, checkboxState, searchText]);



  // сохранение фильма в своей базе 
  const handleSaveMovie = (movie) => {
    api.saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies((movies) => [...movies, savedMovie]);
        setFoundedSavedMovies((movies) => [...movies, savedMovie]);
      })
      .catch((err) => {
        setTextError(err.status === 401 ? 'Вам нужно авторизоваться' : 'При сохранении фильма произошла ошибка.');
      })
      .finally(() => {
        setTimeout(() => setTextError(""), 10000);
      });
  }

  // удаление фильма в своей базе  
  const handleUnSaveMovie = (movie) => {
    api.unsaveMovie(movie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter((savedMovie) => savedMovie._id !== movie._id));
        setFoundedSavedMovies((movies) => movies.filter((savedMovie) => savedMovie._id !== movie._id));
      })
      .catch((err) => {
        setTextError(err.status === 403 ? 'Нельзя удалить фильм, который был сохранен не Вами' : 'При удалении фильма произошла ошибка.');
      })
      .finally(() => {
        setTimeout(() => setTextError(""), 10000);
      });
  }

  // Обработчик клика  на кнопку в карточке
  const handleCardButtonClick = (movie) => {
    const isSaved = savedMovies.some(savedMovie => savedMovie.movieId === movie.movieId);
    if (isSaved) {
      const savedMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.movieId);
      handleUnSaveMovie(savedMovie);
    } else {
      handleSaveMovie(movie);
    }
  }

/*   UnAuthRoute */
/* возвращаемый объект */
  return (
      <div className="app">
        <CurrentUserContext.Provider value = {currentUser}>
         <Routes> 
            <Route path = "*" element  = {<NotFound />} />
            <Route path = "/" element = {<Main loggedIn={loggedIn}/>} />
            <Route path = "/main" element = {<Main loggedIn={loggedIn}/>} />
            <Route path = "/signup" 
                   element = { <UnAuthRoute loggedIn = {loggedIn}>
                                 <Register onRegister = {onRegister} 
                                           textError  = {textError}/> 
                               </UnAuthRoute>}  />
                              
            <Route path = "/signin" 
                   element = { <UnAuthRoute loggedIn = {loggedIn}>
                                 <Login onLogin    = {onLogin} 
                                        loggedIn   = {loggedIn}
                                        textError  = {textError}/> 
                               </UnAuthRoute>}  />

            <Route  path="/movies" element = { 
              <ProtectedRoute loggedIn = {loggedIn} >
                <Movies movies                    = {foundedMovies}
                        savedMovies               = {savedMovies}
                        handleCardButtonClick     = {handleCardButtonClick}
                        handleCheckboxClick       = {handleCheckboxClick}
                        handleSubmitSearchingForm = {handleSubmitSearchingForm}
                        storageCheckboxState      = {checkboxState}
                        storageSearchText         = {searchText}
                        isLoading                 = {isLoading}
                        textError                 = {textError}
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
                             storageCheckboxState      = {savedCheckboxState}
                             storageSearchText         = {savedSearchText}
                             textError                 = {textError}
                             />  
              </ProtectedRoute>   
            } />

          <Route  path="/profile" element = { 
              <ProtectedRoute loggedIn = {loggedIn} >
                <Profile onSignOut    = {onSignOut}
                         onUpdateUser = {handleUpdateUser}
                         isLoading    = {isLoading}
                        />  
              </ProtectedRoute>   
            } />

        </Routes>
        </CurrentUserContext.Provider>
      </div>

  );
}

export default App;