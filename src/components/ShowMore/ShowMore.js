import { useLocation } from 'react-router-dom';

const ShowMore = ({handleShowMoreButtonClick, classList}) => {

  const location = useLocation();

  const moreButtonClassList = (location.pathname === '/movies' ? classList : "showmore showmore_hide");

  return  (
    <button className={moreButtonClassList} onClick={handleShowMoreButtonClick}>Еще</button>
  );
}

export default ShowMore;