import React, { useEffect, useState } from 'react';
import style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Slider from 'react-slick';


export default function ProductDetails() {
  let params = useParams();
  let [productDetails,setProductDetails] = useState(null);
  let [isLoading,setIsLoading] = useState(false);

  async function getProductDetails(id){
    setIsLoading(true);
    let {data} = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
    setProductDetails(data);
    setIsLoading(false);
  }

  useEffect(()=>{
    getProductDetails(params.id);
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
  };

  // console.log(productDetails.images);
  return (
    <>
      <div className="container">
        
        {isLoading?
        <LoadingScreen></LoadingScreen>
        :

        <div className="row py-3 d-flex align-items-center ">
            <div className="col-md-4"><Slider {...settings}>{productDetails?.images.map((img)=><img className='w-100' src={img} onError={(e)=>{e.target.src = productDetails?.category.image}} alt="" />)}</Slider></div>
            <div className="col-md-8">
              <h3>{productDetails?.title}</h3>
              <p className="text-muted p-2">{productDetails?.description}</p>
              <div>
                <span className='text-muted h5 '>{productDetails?.price}<span className='text-success'>$</span></span>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button type='button' className="btn bg-success my-3 w-100 text-center text-white">Add product</button>
              </div>
            </div>
        </div>

        }

      </div>
    </>
  )
}
