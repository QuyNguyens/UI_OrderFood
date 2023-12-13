import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Register from "../pages/Register";
import AddProduct from "../pages/AddProduct";
import Detail from "../pages/Detail";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Order from "../pages/Order";
export const publicRoute = [
    {path:"/",component: Home},
    {path:"/about",component: About},
    {path:"/contact",component: Contact},
    {path:"/menu",component: Menu},
    {path:"/register",component: Register},
    {path:"/login",component: Login},
    {path:"/login/:id",component: Login},
    {path:"/profile",component: Profile},
    {path:"/add-product",component: AddProduct},
    {path:"/detail/:id",component: Detail},
    {path:"/cart/:id",component: Cart},
    {path:"/order/:id",component: Order},

]
