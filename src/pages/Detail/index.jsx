import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Icon from "../../components/Layout/component/Icons";
import { UserContext } from "../../UserContext";
import { ToastContainer } from 'react-toastify';
import { notify } from "../Notify";
const cx = classNames.bind(styles);
function Detail() {
    const {id} = useParams();
    const [product,setProduct] = useState();
    const [size,setSize] = useState('small');
    const [quality,setQuality] = useState(1);
    const [price,setPrice] = useState();
    const [extra,setExtra] = useState();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get('/product/get/'+id)
        .then(data =>{
            setExtra(data.data.sizeAll[0].price);
            setProduct(data.data);
        })
        .catch(err => console.log(err));
    },[])
    const handleQuality = (check) =>{
        if(check ==0){
            if(quality!=1){
                setQuality(pre => pre -1);
                setPrice(product.price*(quality-1));
            }
        }else{
            setQuality(pre => pre + 1);
            setPrice(product.price*(quality+1));
        }
    }
    const handleAddCart = (e) =>{
        e.preventDefault();
        if(!user){
            navigate('/login/'+id);
        }else{
            if(user?.id){
                axios.post('/cart/add-cart',{productId:id,size,userId:user?.id,quality})
                .then(data => {
                    notify('Add to cart success');
                })
                .catch(err => console.log(err));
            }
        }
    }
    const handleSize = (size,i) =>{
        setExtra(product.sizeAll[i].price);
        setSize(size);
    }
    return ( <div className={cx('wrapper')}>
        {product && <div className={cx('container')}>
            <div className={cx('left')}>
                <div className={cx('left-img-main')}>
                    <img src={"http://localhost:3000/uploads/"+product.image} alt=""/>
                </div>
                <div className={cx('left-list-img')}>
                    <img src={"http://localhost:3000/uploads/"+product.image} alt=""/>
                    <img src={"http://localhost:3000/uploads/"+product.image} alt=""/>
                    <img src={"http://localhost:3000/uploads/"+product.image} alt=""/>
                    <img src={"http://localhost:3000/uploads/"+product.image} alt=""/>
                    <img src={"http://localhost:3000/uploads/"+product.image} alt=""/>
                </div>
            </div>
            <div className={cx('right')}>
                <h1>{product.name}</h1>
                <h2>{product.desc}</h2>
                <h3><span>{product.discount}$</span><p>{price?price+extra:product.price+extra}$</p></h3>
                <h4>Size: 
                    <span style={size==='small'?{backgroundColor:'var(--primary-color)',color:'white'}:{}} onClick={e => handleSize('small',0)}>Small</span>
                    <span style={size==='medium'?{backgroundColor:'var(--primary-color)',color:'white'}:{}} onClick={e => handleSize('medium',1)}>Medium</span>
                    <span style={size==='large'?{backgroundColor:'var(--primary-color)',color:'white'}:{}} onClick={e => handleSize('large',2)}>Large</span></h4>
                <h5><b>Quality:</b> <span onClick={e =>handleQuality(0)}>-</span><p>{quality}</p><span onClick={e =>handleQuality(1)}>+</span></h5>
                <h6>
                    <form onSubmit={handleAddCart}>                   
                            <Icon medium>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </Icon>
                            <button>Add to cart</button>
                            <ToastContainer/>
                    </form>
                    <Link to={user==null?("/login/"+id):("/cart/"+user.id)}><p>Buy Now</p></Link>
                </h6>
            </div>
        </div>}
    </div> );
}

export default Detail;