import React, { useState } from 'react';
import style from './Home.module.css';
import FuturedProducts from '../FuturedProducts/FuturedProducts';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Navbar from '../Navbar/Navbar';
import MainSlider from '../MainSlider/MainSlider';


export default function Home() {

  // let [isLoadingOne,setIsLoadingOne] = useState(true);
  // let [isLoadingTwo,setIsLoadingTwo] = useState(true);

  return (
    <>
      {/* {isLoadingOne && isLoadingTwo ?
      <> */}
        <MainSlider ></MainSlider>
        <FuturedProducts ></FuturedProducts>
      {/* </> : <LoadingScreen></LoadingScreen>} */}
      {/* <LoadingScreen></LoadingScreen> */}
    
    </>
  )
}
