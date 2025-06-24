import React, { use, useState } from 'react';
import style from './Login.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({saveUserData}) {

  let navigate = useNavigate();
  let [isLoading,setIsLoading] = useState(false);
  let [error,setError] = useState('')

  async function handelSubmit(values){
    
    setIsLoading(true);
    let {data} = await axios.post('https://api.escuelajs.co/api/v1/auth/login',values).catch((err)=>{
      setIsLoading(false);
      setError(err.response.data.message);
    })
    if(data.access_token){
      localStorage.setItem('Token',data.access_token);
      localStorage.setItem('UserName',values.email);
      saveUserData();
      navigate('/');
    }
  }


  let validationSchema = Yup.object({
    email:Yup.string().required("email is required").email('email is invalid'),
    password:Yup.string().required("password is required").matches(/^[a-z0-9]{5,16}$/,'password must be 5-16 letter...'),
  })


  // function validate(values){
  //   let errors = {};

  //   if(!values.name){
  //     errors.name = 'name is required';
  //   }else if(values.name.length <= 3){
  //     errors.name = 'min length is 3';
  //   }

  //   return errors;

  // }

  let formik = useFormik({
    initialValues: {
        email:"",
        password:"",
    },
    validationSchema,
    onSubmit: handelSubmit

  })


  
  return (
    <>
    <div className="w-75 mx-auto py-3">
      <h2 className='text-center'>Login</h2>

      {error !== ''?<div className="alert alert-danger">
        {error}
      </div> : null}
      <form onSubmit={formik.handleSubmit} >
        
        <label htmlFor="email">Email</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className={` form-control mb-2 ${!formik.touched.email ? '' : (formik.errors.email)? 'is-invalid' : 'is-valid'}`} name='email' id='email'/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : null}

        <label htmlFor="password">Password</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className={` form-control mb-2 ${!formik.touched.password ? '' : (formik.errors.password)? 'is-invalid' : 'is-valid'}`} name='password' id='password'/>
        {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : null}

        
      
        {isLoading?<button type='button' className="btn btn-success mt-2 "><i className='fas fa-spinner fa-spin'></i></button> : 
        <button disabled = {!(formik.isValid && formik.dirty)} type='submit' className="btn btn-success mt-2 ">Login</button> }  


      </form>

    </div>
    </>
  )
}
