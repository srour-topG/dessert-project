import React from 'react';
import style from './LoadingScreen.module.css';

export default function LoadingScreen() {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
        <i className="fas fa-spinner fa-spin text-success fa-5x h1"></i>
      </div>
    </>
  )
}
