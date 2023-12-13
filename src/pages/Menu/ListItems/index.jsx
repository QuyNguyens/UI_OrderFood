import classNames from "classnames/bind";
import styles from "./ListItems.module.scss";
import pizza from "../../../../public/pizza.png";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function ListItem( {data,title,limit}) {
    const navigate = useNavigate();
    const handleClickDetail = (id) =>{
        navigate('/detail/'+id);
    }
    return ( <div className={cx('wrapper')}>
            {title && <h1>{title.name}</h1>}
            <div className={cx("list-items")}>
                {data.map((item,index)=>{
                    if(index >= limit){
                        return;
                    }else{
                        return <div onClick={e => handleClickDetail(item._id)} key={index} className={cx("item")}>
                        <img src={"http://localhost:3000/uploads/"+item.image} alt="" />
                        <h3>{item.name}</h3>
                        <p>{item.desc}</p>
                        <button>Add to cart (from ${item.price})</button>
                        </div>         
                    }
                })}  
            </div>     
    </div>  );
}

export default ListItem;