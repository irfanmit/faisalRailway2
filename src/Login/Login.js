import React, { useState } from 'react';
import { Formik, useFormik } from 'formik';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { validSchemas2 } from '../schemas';
import {UserContext} from '../store/cart-context';
import { useContext } from 'react';
import { InputContext } from '../store/cart-context';
import { Link } from 'react-router-dom';
import { authContext } from '../store/cart-context';

const initialValues = {
	username : "", password :""
  };

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const {logger, setLogger} = useContext(InputContext);
  const ctxValue = useContext(authContext);
  const[errMessage, setErrMessage] = useState('');
  const[errorCause, setErrorCause] = useState('');
  const[loading, setLoading] = useState(false)

	const navigate = useNavigate();
  const {values, errors, touched, handleChange, handleSubmit, isSubmitting} = useFormik({
    initialValues: initialValues,
    validationSchema : validSchemas2,
    onSubmit : (values) =>{
      console.log(values);
      console.log(values.username);
      setLoading(true)
      // setLogger(values.theUser);
      localStorage.setItem('user', values.theUser)
      // 
      setUser(true);
      setErrorCause('');
      setErrMessage('');
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD975tRXm5bRspQtVbCA40wN0z2ivzKNaI',
      {
        method: 'POST',
        body: JSON.stringify({
           email: values.email,
           password: values.password,
            returnSecureToken: true
        }),
        headers :{
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
     
      if(res.ok){
        return res.json();
      } 
       else{
        return res.json().then((data)=>{
          let errorMessage='Authentication failed';
          if(data && data.error && data.error.message) {
            setErrorCause(data.error.message)
          }
          throw new Error(errorMessage);
        })
       }
    }).then((data)=>{
      setLoading(false)
      ctxValue.login(data.idToken);
      console.log(data);
    })
    .catch((err)=>{
      setLoading(false)
      setErrMessage(err.message)
    });
      
      
      // {!errMessage && navigate('/Home')};
      
    }
  });
  
  return (
    <>
      <div className={styles.login_container}>
        <div className={styles.login_header}>
       { errMessage && <div className={styles.errorMessage} style={{color:'red', fontSize:'25px'}}>{errMessage}</div>}
          {errorCause && <div className={styles.dataError}><h4 style={{color:'brown'}}>{errorCause}</h4></div>}
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.login_form}>
          <div className={styles.form_group}>
            <label htmlFor="username">Username</label>
            <input onChange={handleChange} placeholder="Enter your first name" value={values.theUser} type="text"  name="theUser" />
			<div className={styles.error}>
    		{errors.theUser && touched.theUser ?(<p>{errors.theUser}</p>): null}
    </div>
    <label htmlFor="username">Email</label>
            <input onChange={handleChange}  value={values.email} type="email"  name="email" />
			<div className={styles.error}>
    		{errors.email && touched.email ?(<p>{errors.email}</p>): null}
    </div>
          </div>
          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} value={values.password} type="password"  name="password" />
			<div className={styles.error}>
    		{errors.password && touched.password ?(<p>{errors.password}</p>): null}
    </div>
          </div>
          {/* <Link to ='https://www.youtube.com/watch?v=dQw4w9WgXcQ'><button style={{backgroundColor: 'blue'}}>Login</button></Link> */}
          { !loading ? <button type="submit">Login</button> : <button style={{borderRadius: '5px', BackgroundColor: 'blue'}}>Loging in...</button>}
        </form>
        <div className={styles.login_footer}>
          <Link to='/ForgotPass'>Forgot password?</Link>
          <p>Don't have an account?</p> <Link to='/SignUp'><div>Sign up</div></Link>
        </div>
      </div>
    </>
  )
}

export default Login;
