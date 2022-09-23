import { Outlet } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

const AppLayout = () => {
  return (
    <>
        <Navigation />
        <Outlet />
        <Footer />
    </>
  )
  }
  
  export default AppLayout;