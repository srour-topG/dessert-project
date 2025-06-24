import React, { useState } from 'react';
import style from './Register.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

  let navigate = useNavigate();
  let [isLoading,setIsloading] = useState(false);

    
  async function handelSubmit(values){
      
      
    setIsloading(true);
    
    let {data} = await axios.post('https://api.escuelajs.co/api/v1/users/',values)
    if(data.id){
      navigate('/login');
    }
  }


  let validationSchema = Yup.object({
    name:Yup.string().required("name is required").min(3,"min length is 3").max(10,"max length is 10"),
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
        name:"",
        email:"",
        password:"",
        avatar:"https://picsum.photos/800"
    },
    validationSchema,
    onSubmit: handelSubmit

  })


  
  return (
    <>
    <div className="w-75 mx-auto py-3">
      <h2 className='text-center'>Register</h2>

      <form onSubmit={formik.handleSubmit} >
        
        <label htmlFor="name">name</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" className={` form-control mb-2 ${!formik.touched.name ? '' : (formik.errors.name)? 'is-invalid' : 'is-valid'}`} name='name' id='name'/>
        {formik.errors.name && formik.touched.name? <div className="alert alert-danger">{formik.errors.name}</div> : null}

        <label htmlFor="password">Password</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className={` form-control mb-2 ${!formik.touched.password ? '' : (formik.errors.password)? 'is-invalid' : 'is-valid'}`} name='password' id='password'/>
        {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : null}

        <label htmlFor="email">Email</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className={` form-control mb-2 ${!formik.touched.email ? '' : (formik.errors.email)? 'is-invalid' : 'is-valid'}`} name='email' id='email'/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : null}
        
      
        {isLoading?<button type='button' className="btn btn-success mt-2 "><i className='fas fa-spinner fa-spin'></i></button> : 
        <button disabled = {!(formik.isValid && formik.dirty)} type='submit' className="btn btn-success mt-2 ">Register</button> }  


      </form>

    </div>
    </>
  )
}
