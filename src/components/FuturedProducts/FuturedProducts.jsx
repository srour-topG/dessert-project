import React, { useEffect, useState } from 'react';
import style from './FuturedProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import MainSlider from '../MainSlider/MainSlider';



export default function FuturedProducts() {
  
  let [products,setProducts] = useState([]);
  // let [isLoading,setIsloading] = useState(false);

  async function getProducts(){
    // setIsLoading(true);
    let {data} = await axios.get('https://api.escuelajs.co/api/v1/products');
    setProducts(data);
    // setIsLoading(false);

  }

  useEffect(()=>{
    getProducts();
  },[])
  
  return (
    <>
      <div className="container">

          
          <div className="row">
            {products.map((product)=>
              <div key={product.id} className="col-md-2 gy-5 gx-3">
                <div className="product py-2 px-3 cursor-pointer">
                  <Link to={`/productDetails/${product.id}`} className='links'>
                    <img className='w-100' src={product.images} onError={(e)=>{e.target.src = product.category.image}} alt="" />
                    <span className='font-sm bg-main'>{product.category.name}</span>
                    <h3 className='h5 text-black'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                    <div className="">
                      <span className='text-muted h5'>{product.price}<span className='text-success'>$</span></span>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <button type='button' className="btn bg-success my-3 w-100 text-center text-white">Add product</button>
                    </div>
                  </Link>
                </div>
              </div>
            )}
        </div>
        
      </div>
    </>
  )
}
