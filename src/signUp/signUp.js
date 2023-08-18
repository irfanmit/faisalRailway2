import React, { useState } from "react";
import styles from "./signUp.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../store/cart-context";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const[errorMessage, setErrorMessage]=useState('');
  const[errorDisplay, setErrorDisplay] = useState('');
  const[succ, setSucc] =useState('');
  const[loading, setLoading] = useState(false);
  const ctxValue = useContext(authContext);

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    setErrorMessage('');
    setErrorDisplay('');
    setSucc('');
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD975tRXm5bRspQtVbCA40wN0z2ivzKNaI',
    {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        }),
        headers :{
            'Content-Type': 'application/json'
        }
    }
    ).then((res)=>{
        setLoading(false);
        if(res.ok){
          return res.json();
        }
        else{
          return res.json().then((data)=>{
            let error = '';
            if(data && data.error && data.error.message){
               error=data.error.message;
            }
            setErrorDisplay('Sign-up Failed!')
            throw new Error(error);
          })
         }
    }).then((data)=>{
      // ctxValue.login(data.idToken);
      setSucc('Sign-up Successfull')
    })
    .catch((err)=>{
      setErrorMessage(err.message)
    });
  };


  return (
    <>
    <div className={styles.signupPage}>
        {errorDisplay &&<div > <h4 style={{color:'brown'}}>{errorDisplay}</h4></div>}
        {errorMessage &&  <p style={{color:'red', fontSize: '25px'}}>{errorMessage}</p>}
        {succ && <p style={{color:'green', fontSize: '25px'}}>{succ} <div><Link to ='/'>Login from here</Link></div></p>}
    
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.inputField}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
       {!loading && <button className={styles.submitButton} type="submit">Sign Up</button>}
       {loading && <button className={styles.submitButton}>Signing in...</button>}
       <p style={{marginTop: '4px'}}>Already have an account?</p> <div style={{positon: 'relative', bottom: '17px'}}><Link to ='/'>Login</Link></div>
      </form>
    </div>
    </>
  );
};

export default SignUp;