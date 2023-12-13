import classNames from 'classnames/bind';
import styles from './Order.module.scss';
const cx = classNames.bind(styles);
function OrderItem({data,order}) {
    return <div>
            {data && data.map((item,index) =>{
                return <div key={index}>
                        {index ==0 && <h3>{order.status?'Success':'Pending'}</h3>}
                        <div className={cx('list-items')}>
                            <img src={"http://localhost:3000/uploads/"+item.image} alt="" />
                            <h6>${item.price}</h6>           
                            <div>
                                <h5>{item.name}</h5>
                                <p>{item.desc}</p>
                                <span>Size: <b>{item.size}({item.priceSize})</b></span>
                                <span>Quality: <b>{item.quality}</b></span>
                            </div>
                            <h6>${item.price * item.quality + item.priceSize}</h6>
                        </div>
                        {index == (data.length-1) && <div className={cx('address-total')}>
                            <button>View Your address</button>
                            <div>
                                <h5>Time Order</h5>
                                <span>Date: <b>{order.createdAt}</b></span><br />
                                <span>Time: <b>{order.createdAt}</b></span>
                            </div>
                            <span>Total: <b>${order.totalPrice}</b></span>
                        </div>}
                    </div>
            })}
    </div>
}

export default OrderItem;