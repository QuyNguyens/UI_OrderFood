import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import { notify } from "../Notify";
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import google from '../../../public/google.png';
import { UserContext } from "../../UserContext";
const cx = classNames.bind(styles);
function Login() {
    const {id} = useParams();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const {setUser} = useContext(UserContext);
    const [isWrongPassword,setIsWrongPassword] = useState(false);
    const [isWrongEmail,setIsWrongEmail] = useState(false);
    const navigate = useNavigate();
    const LoginSubmit = (e) =>{
        e.preventDefault();
        axios.post('/auth/login',{email,password})
        .then(result =>{
            console.log('result: ',result.data);
            if(result.data.state==404){
                setIsWrongEmail(true);
            }else if(result.data.state==401){
                setIsWrongEmail(false);
                setIsWrongPassword(true);
            }else{
                notify('Login to success');
                setUser(result.data.otherDetail);
                if(id){
                    navigate('/detail/656d91a94a929b3b6bc9eee8');
                }else{
                    setTimeout(()=>{
                        navigate('/');
                    },2000);
                }
            }
        })
        .catch(err => console.log(err));
    }
    return ( <div className={cx("wrapper")}>
        <div className={cx('form-center')}>
            <h1>Login</h1>
            <form onSubmit={LoginSubmit} >
                <input onChange={e => setEmail(e.target.value)}  type="email" placeholder="email" />
                {isWrongEmail && <b>Email is not found!!!</b>}
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="password"/>
                {isWrongPassword && <b>Password is not correct</b>}               
                <button>Login</button>
                <h2>or login with provider</h2>
                <div>
                    <img src={google} alt="" />
                    <span>Login with google
                    </span>
                </div>
            </form>
            <ToastContainer/>
        </div>
    </div> );
}

export default Login;