import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import Footer from "./Footer";
// eslint-disable-next-line react/prop-types
function DefaultLayout() {
    return ( <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div> );
}

export default DefaultLayout;