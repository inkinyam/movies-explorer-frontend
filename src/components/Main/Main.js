import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Promo from '../Promo/Poromo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

const Main =({loggedIn}) => {
  let header = (loggedIn === true) ? <Navigation/> : <Header />;

  return (
    <>
      {header}

      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer /> 
    </>

  )
}

export default Main;