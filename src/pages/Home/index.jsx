import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import pizza from '../../../public/pizza.png';
import sallad1 from  '../../../public/sallad1.png';
import sallad2 from  '../../../public/sallad2.png';
import Icon from "../../components/Layout/component/Icons";
import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "../Menu/ListItems";
const cx = classNames.bind(styles);
function Home() {
    const [listItems,setListItems] = useState();
    useEffect( ()=>{
        axios.get('/product/gets')
        .then(data => {
            setListItems(data.data);      
        })
        .catch(err => console.log(err))   
    },[])
    return ( <div className={cx('wrapper')}>
            <div className={cx('component')}>
                <div className={cx('title')}>
                   <div className={cx('title-left')}>
                        <h1>Everything is better with a <span>Pizza</span></h1>
                        <p>Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life</p>
                        <div>
                            <button>ORDER NOW 
                                <Icon medium>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                </Icon>
                            </button>
                            <span>Learn more
                                <Icon medium>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                </Icon>
                            </span>
                        </div>
                    </div> 
                    <div className={cx('title-right')}>
                        <img src={pizza} alt="" />
                    </div> 
                </div>
                <div className={cx('check-out')}>
                    <div className={cx('check-out-left')}>
                        <img src={sallad1} alt="" />
                    </div>
                    <div className={cx('check-out-title')}>
                        <h5>CHECK OUT</h5>
                        <h1>Our Best Sellers</h1>
                    </div>
                    <div className={cx('check-out-right')}>
                        <img src={sallad2} alt="" />                   
                    </div>
                </div>
                {listItems && <ListItem data={listItems} limit={3}/>}
                <div className={cx('about')}>
                    <div>
                        <h5>OUR STORY</h5>
                        <h1>About us</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat inventore laboriosam officiis quam rem!</p>
                        <p>At consectetur delectus ducimus est facere iure molestias obcaecati quaerat vitae voluptate? Aspernatur dolor explicabo iste minus molestiae pariatur provident quibusdam saepe?</p>
                        <p>Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit vitae voluptates? Eos, tenetur.</p>
                    </div>
                </div>
                <div className={cx('contact')}>
                    <div>
                        <h5>DON'T HESITATE</h5>
                        <h1>Contact us</h1>
                        <p>+46 738 123 123</p>
                    </div>
                </div>
            </div>
    </div> );
}

export default Home;