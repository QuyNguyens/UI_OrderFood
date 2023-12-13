import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { ToastContainer } from "react-toastify";
import { notify } from "../Notify";
import { Link } from "react-router-dom";
import google from '../../../public/google.png';
import axios from "axios";
const cx = classNames.bind(styles);
function Register() {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const RegisterSubmit = (e) =>{
        e.preventDefault();
        axios.post('/auth/register',{name,email,password})
        .then(() =>{
            notify('Register success');
        })
        .catch(err => console.log(err));
    }
    return ( <div className={cx("wrapper")}>
        <div className={cx('form-center')}>
            <h1>Register</h1>
            <form onSubmit={RegisterSubmit}>
                <input onChange={e => setName(e.target.value)}  type="text" placeholder="your name" />
                <input onChange={e => setEmail(e.target.value)}  type="email" placeholder="email" />
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="password"/>
                <button>Register</button>
                <ToastContainer/>
                <h2>or Login with provider</h2>
                <div>
                    <img src={google} alt="" />
                    <span>Login with google
                    </span>
                </div>
            </form>
            <div className={cx('border')}></div>
            <h5>Existing account? <Link to={'/login'}>Login here</Link></h5>
        </div>
    </div> );
}

export default Register;