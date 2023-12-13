import classNames from "classnames/bind";
import styles from "./Cart.module.scss";

import Icon from "../../components/Layout/component/Icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
function Cart() {
    const {id} = useParams();
    // Display Item and handle buy
    const [listCart,setListCart] = useState();
    const [isCheckedAll,setIsCheckedAll] = useState(false);
    // infor
    const [province,setProvince] = useState();
    const [idDistrict,setIdDistrict] = useState();
    const [district,setDistrict] = useState();
    const [totalPrice,setTotalPrice] = useState();
    const [delivery,setDelivery] = useState();
    const [fullName,setFullName] = useState();
    const [phone,setPhone] = useState();
    const [selectProvince,setSelectProvince] = useState();
    const [selectDistrict,setSelectDistrict] = useState();
    const [houseNumber,setHouseNumber] = useState();
    const navigate = useNavigate();

    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    };
    useEffect( () => {
        const dataPro = async() =>{
            const data = await fetchData('https://vapi.vnappmob.com/api/province');
            setProvince(data.results);
        }
        dataPro();
      }, []);
    useEffect(()=>{
        if(idDistrict){
            const dataPro = async() =>{
                const data = await fetchData('https://vapi.vnappmob.com/api/province/district/'+idDistrict);
                setDistrict(data.results);
            }
            dataPro();
        }
    },[idDistrict]);
    // Get list cart
    useEffect(()=>{
        axios.get('/cart/list-item/'+id)
        .then(data => setListCart(data.data.listDetailPro))
        .catch(err => console.log(err));
    },[])
    const handleAmount = async (check,index,quality,productId,size) =>{
        if(check ==0){
            quality-=1;
        }else{
            quality +=1;
        }
        if(quality>0){
            await axios.post('/cart/update/'+id,{productId,size,quality});
            const newListCart = [...listCart];
            newListCart[index].quality = quality;
            setListCart(newListCart);
        }
    }
    const handleSelectAllItem = (e) => {
        setIsCheckedAll(!isCheckedAll);
        var newCart = [...listCart];
        if(e.target.checked){
            for(var i=0;i<newCart.length;i++){
                newCart[i].check = true;
            }
        }else{
            for(var j=0;j<newCart.length;j++){
                newCart[j].check = false;
            }
        }
        setListCart(newCart);
    };
    // Select Item buy
    const handleChangeItem = (e,index) =>{
        var newCart = [...listCart];
        if(e.target.checked){
            newCart[index].check = true;
        }else{
            newCart[index].check = false;
        }
        setListCart(newCart);
        setIsCheckedAll(false);
    }
    // Set total Price
    useEffect(()=>{
        if(listCart){
            const totalPrice = listCart.reduce((acc, product) => {
                if (product.check) {
                  const total = product.price * product.quality + product.priceSize;
                  return acc + total;
                }
                return acc;
              }, 0);
            setTotalPrice(totalPrice);
            setDelivery(totalPrice<30?5:totalPrice<50?3:0);
        }
    },[listCart])
    const handlePayment = (e) =>{
        e.preventDefault();
        const filteredProducts = listCart.filter(product => product.check === true)               
        const productIds = filteredProducts.map(({ productId, size, quality }) => ({ productId, size, quality }));
        const address = {
            userId: id,
            province: selectProvince,
            district: selectDistrict,
            houseNumber: houseNumber,
            phone: phone
        }
        if(totalPrice!=0){
            axios.post('/order/payment/',{userId:id,address,filteredProducts,productIds,fullname:fullName,totalPrice})
            .then(result => {
                navigate('/order/'+id, { state: { detailPro: result.data.listDetailPro,
                    order: result.data.order,addressOj:result.data.addressOb }});
            })
            .catch(err => console.log('paymentErr: ',err))
        }
    }
    const handleChangeProvince = (e) =>{
        const idName = e.target.value.split(',');
        setIdDistrict(idName[0]);
        setSelectProvince(idName[1]);
    }
    return ( <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <h1>Cart</h1>
            <div className={cx('content')}>
                <div className={cx('left')}>
                    <div className={cx('left-list')}>
                        <div className={cx('left-title-col')}>
                            <input checked={isCheckedAll} onChange={handleSelectAllItem} type="checkbox" />
                            <span>Select All</span>
                        </div>
                        {listCart && listCart.map((item,index) =>{       
                            return <div key={index} className={cx('left-item')}>
                                        <input type="checkbox" checked={item.check} onChange={e => handleChangeItem(e,index)} />
                                        <div className={cx('left-img')}>
                                            <img src={"http://localhost:3000/uploads/"+item.image} alt="" />
                                        </div>
                                        <h3>${(item.price)}</h3>
                                        <div className={cx('left-title')}>
                                            <h5>{item.name}</h5>
                                            <h6>Size: <span>{item.size}({item.priceSize})</span></h6>
                                            <p>Amount: <span onClick={e => handleAmount(0,index,item.quality,item.productId,item.size)}>-</span><b>{item.quality}</b><span onClick={e => handleAmount(1,index,item.quality,item.productId,item.size)}>+</span></p>
                                        </div>
                                        <h3>${item.price*item.quality+item.priceSize}</h3>
                                        <div  className={cx('left-icon')}>
                                            <Icon medium>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </Icon>
                                        </div>
                                    </div> 
                        })}   
                    </div>
                    <div className={cx('left-total')}>
                        <div>
                            <span>Subtotal: <b>${totalPrice}</b></span>
                            <span>Delivery: <b>{totalPrice==0?0:delivery}</b></span>
                            <span>Total: <b>${(totalPrice==0?0:totalPrice+delivery)}</b></span>
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <h4>Checkout</h4>
                    <div>
                        <label>Name</label><br />
                        <input onChange={e => setFullName(e.target.value)} type="text" placeholder="enter your name.." />
                    </div>
                    <div>
                        <label>Phone</label><br />
                        <input onChange={e => setPhone(e.target.value)} type="text" placeholder="enter your phone.." />
                    </div>
                    <div>
                        <label>Province</label><br />
                        <select onChange={handleChangeProvince}>
                            {province&& province.map((pro,index)=>{
                                return <option value={pro.province_id+','+pro.province_name} key={index}>{pro.province_name}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label>District</label><br />
                        <select onChange={e => setSelectDistrict(e.target.value)}>
                            {district&& district.map((dis,index)=>{
                                return <option value={dis.district_name} key={index}>{dis.district_name}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <label >Your home address</label><br />
                        <input onChange={e => setHouseNumber(e.target.value)} type="text" placeholder="enter your house number..." />
                    </div>
                    <form onSubmit={handlePayment}>
                        <button style={totalPrice==0?{backgroundColor:'gray'}:{backgroundColor:'var(--primary-color)'}}>Pay ${(totalPrice==0?0:totalPrice+delivery)}</button>
                    </form>
                </div>
            </div>
        </div>
    </div> );
}

export default Cart;