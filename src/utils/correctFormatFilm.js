import { MOVIE_SERVER_URL } from './consts.js';
import isURL from 'validator/lib/isURL.js';

export default function correctFormatFilm(movie) {
  return {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: MOVIE_SERVER_URL + movie.image.url,
    trailerLink: isURL(movie.trailerLink)
      ? movie.trailerLink
      : MOVIE_SERVER_URL + movie.image.url,
    thumbnail: MOVIE_SERVER_URL + movie.image.formats.thumbnail.url,
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  };
}