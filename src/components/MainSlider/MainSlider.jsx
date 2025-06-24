import React, { useEffect, useState } from 'react';
import style from './MainSlider.module.css';
import axios from 'axios';
import Slider from 'react-slick';



export default function MainSlider() {

  let [categories,setCategories] = useState(null);

  async function getCategories(){
    // setIsLoading(true);
    let {data} = await axios.get(`https://api.escuelajs.co/api/v1/categories`);
    setCategories(data);
    // setIsLoading(false);
  }

  useEffect(()=>{
    getCategories();
  },[])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows:false,
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Slider {...settings}>
            {categories?.map((category) => <div key={category.id}>
              <img height={'200px'} src={category.image} onError={(e)=> e.target.src = '../../assets/images/service1.png'} alt="" />
              <h2 className='h6 pt-2 text-center' >{category.name}</h2>
            </div>)}
          </Slider>
        </div>
      </div>
      {/* <h2>MainSlider</h2> */}
    </>
  )
}
