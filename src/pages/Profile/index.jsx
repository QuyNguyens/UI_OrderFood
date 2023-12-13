import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";
import {Cookies} from "react-cookie";
function Profile() {
    const {user,setUser} = useContext(UserContext);
    const cookie = new Cookies();
    const navigate = useNavigate();
    const handleLogout = () =>{
        setUser(null);
        cookie.remove('access_token');
        navigate('/');
    }
    console.log('user: ',user);
    return ( <div>
        <div onClick={handleLogout}>Logout</div>
        <Link to={'/order/'+user?.id}>To Your Order</Link>
    </div> );
}

export default Profile;