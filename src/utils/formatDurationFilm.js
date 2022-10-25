export const formatDurationFilm = (duration) => {
  if (duration > 60) {
      const min = duration % 60;
      const hour = (duration - min) / 60;
      const result = (`${hour}ч ${min}м`);
      return result;
  } else {
      const result = `${duration}м`;
      return result;
  }
}