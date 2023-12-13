import classNames from "classnames/bind";
import styles from "./AddProduct.module.scss";
import axios from "axios";
import { useState } from "react";
const cx = classNames.bind(styles);
function AddProduct() {
    const [imgUpload,setImgUpload ] = useState(null);
    const [name,setName ] = useState();
    const [description,setDescription ] = useState();
    const [price,setPrice ] = useState();
    const [smallSize,setSmallSize ] = useState(1);
    const [mediumSize,setMediumSize ] = useState(3);
    const [largeSize,setLargeSize ] = useState(5);

    const [catalogy,setCatalogy] = useState('Pizza');
    const AddItem = (e) =>{
        e.preventDefault();
        axios.post('/product/create',{name,description,price,imgUpload,catalogy,smallSize,mediumSize,largeSize})
        .then(result => {
            setImgUpload(null);
        })
        .catch(err => console.log(err));
    }
    const handleUploadImg = (e) =>{
        const files = e.target.files;
        const data = new FormData();
        for (var i=0 ;i<files.length;i++){
            data.append('photos',files[i])
        }
        axios.post('/upload/upload-img',data,{
            headers: {'Content-Type':'multipart/form-data'}
        })
        .then(result => {
            const{data:filenames} = result; 
            console.log('filename: ',filenames);
            setImgUpload(...filenames);
        })
        .catch(err => console.log(err));
    }
    return ( <div className={cx('wrapper')}>
        <div className={cx('box-add')}>
            <h1>ADD PRODUCT</h1>
            <form onSubmit={AddItem}>
                <h5>Name</h5>
                <input onChange={e => setName(e.target.value)} type="text" placeholder="enter product name" />
                <h5>Price</h5>
                <input onChange={e => setPrice(e.target.value)} type="text" placeholder="Price ($)" />
                <h5>Description</h5>
                <textarea onChange={e => setDescription(e.target.value)} placeholder="enter product description"></textarea>
                <p className="my-2 h-40">
                    {imgUpload ===null ? <label htmlFor="uploadimg">
                        <input type="file" name="uploadimg" id="uploadimg" onChange={handleUploadImg}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        Upload Image
                    </label>: <img src={"http://localhost:3000/uploads/"+imgUpload}/>}
                </p>
                <h5>Catalogy</h5>
                <select className="p-2 my-4" onChange={e => setCatalogy(e.target.value)}>
                    <option value="Pizza">Pizza</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Dessert">Dessert</option>
                </select>
                <h5>Price Size</h5>
                <div className={cx('size')}>
                    <h6>
                        <span>Small:</span>
                        <select className="p-2 my-4" onChange={e => setSmallSize(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="3">4</option>
                            <option value="3">5</option>
                        </select>
                    </h6>
                    <h6>
                        <span>medium:</span>
                        <select className="p-2 my-4" onChange={e => setMediumSize(e.target.value)}>
                            <option value="1">3</option>
                            <option value="2">4</option>
                            <option value="3">5</option>
                        </select>
                    </h6>
                   <h6>
                        <span>large:</span>
                        <select className="p-2 my-4" onChange={e => setLargeSize(e.target.value)}>
                            <option value="1">5</option>
                            <option value="2">6</option>
                            <option value="3">7</option>
                        </select>
                   </h6>
                </div>
                <button>ADD PRODUCT</button>
            </form>
        </div>
    </div> );
}

export default AddProduct;