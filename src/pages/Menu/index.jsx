import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ListItem from "./ListItems";

const cx = classNames.bind(styles);
function Menu() {
    const [listItems,setListItems] = useState();
    const [catalogy,setCatalogy] = useState();
    const checkRef = useRef(0);
    const displayItem = useRef(null);
    useEffect( ()=>{
        axios.get('/product/catalogy')
        .then(data => {
            setCatalogy(data.data)
        })
        .catch(err => console.log(err));
    },[])
    useEffect( ()=>{
        axios.get('/product/gets')
        .then(data => {
            setListItems(data.data);   
        })
        .catch(err => console.log(err))   
    },[])
    if(checkRef.current==0){
        if(listItems){
            const newItems = [...listItems];
            if(catalogy){
                checkRef.current = 1
                const newListItems = catalogy.map(data => newItems.filter(item => item.catalogyId === data._id));
                displayItem.current = [...newListItems];
            }
        }
    }
    return ( <div className={cx('wrapper')}>
        <div className={cx('container')}>
            {displayItem.current && catalogy.map((title,index) => {
                return <ListItem key={index} data={displayItem.current[index]} title={title}/>
            })}
        </div>
    </div> );
}

export default Menu;