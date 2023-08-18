import React, { useState } from 'react';
import styles from './ForgotPass.module.css';
import { authContext } from '../store/cart-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';


const ForgotPass = () => {
  const [newPass, setNewPass] = useState('');
  const[message, setMessage]=useState('');

  const ctxValue = useContext(authContext)

  const handleSubmit = async (event) => {
    event.preventDefault();

   fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD975tRXm5bRspQtVbCA40wN0z2ivzKNaI', 
   {
    method: 'POST',
    body : JSON.stringify({
      idToken : ctxValue.token ,
      password : newPass,
      returnSecureToken: false
    }),
    headers: {
      'Content-Type': 'application/json'
    }
   }).then((data)=>{
    setMessage('Password Changed')
   })
  }
  return (
    <>
      <div className={styles.background}>
      
        <form onSubmit={handleSubmit} className={styles.formClass}>
        <h3 style={{color: 'white'}}>{message}</h3>
          <h3>Change password</h3>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="Enter your new password"
          />
          <button type="submit">Submit</button>
        </form>
        <Link to ='/'><button>login</button></Link>
      </div>
    </>
  );
};

export default ForgotPass;
