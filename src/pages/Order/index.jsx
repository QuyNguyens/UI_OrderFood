import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { useState } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
const cx = classNames.bind(styles);
// eslint-disable-next-line react/prop-types
function Order() {
    const {id} = useParams();
    const location = useLocation();
    const { state } = location;
    const { detailPro, order,addressOj } = state || [];
    const [viewOneDetail,setViewOneDetail] =useState(detailPro);
    //const { detailPro, order,addressOj } = state || [];
    const [listOrder,setListOrder] = useState();
    const [orderCreate,setOrderCreate] = useState();
    const [addressOrder,setAddressOrder] = useState();
    const handleViewAll = () =>{
        axios.get('/order/list-order/'+id)
        .then(result => {
            setListOrder(result.data.listDetailPro);
            setOrderCreate(result.data.order);
            setAddressOrder(result.data.addressOj);
            setViewOneDetail(undefined)
        })
        .catch(err => console.log('err: ',err))
    }
    return ( <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <h1>Your Order</h1>
            <p>Thanks for your order</p>
            <p>We will call you when your order be on the way</p>
            {listOrder && listOrder.map((product,index) =>{
                    return <OrderItem key={index} data={product} order={orderCreate[index]}/>
            })}
            {viewOneDetail && <OrderItem data={detailPro} order={order}/>}
            <button onClick={handleViewAll}>view all Your Order</button>
        </div>
    </div> );
}

export default Order;