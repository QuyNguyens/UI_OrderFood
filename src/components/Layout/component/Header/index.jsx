import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from './Header.module.scss';
import Icon from "../Icons";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../../UserContext";
import axios from "axios";
const cx = classNames.bind(styles);
function Header() {
    const {user,setUser} = useContext(UserContext);
    useEffect(()=>{
        axios.get('/auth/profile')
        .then(result =>{
            setUser(result.data);
        })
        .catch(err => console.log(err));
    },[])
    console.log('userID: ',user);
    return ( <header style={{zIndex:5}} className={cx('wrapper')}>
        <div className={cx("header-container")}>
            
            <div className={cx("header-page")}>
                <Link className={cx('header-page-f')} to={'/'}>ST PIZZA</Link>
                <Link to={'/'}>Home</Link>
                <Link to={'/menu'}>Menu</Link>
                <Link to={'/about'}>About</Link>
                <Link to={'/contact'}>Contact</Link>
            </div>
            <div className={cx('header-right')}>
                {user==null?<Link to={'/login'}>Login</Link>:<Link to={"/profile"}>{user.name}</Link>}
                <Link className={cx('register')} to={'/register'}>Register</Link>
                <Link to={user==null?"/login":"/cart/"+user?.id}>
                    <Icon medium>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cx()}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </Icon>
                </Link>
            </div>

        </div>
    </header> );
}

export default Header;