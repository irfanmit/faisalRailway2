import React, { useState } from 'react';
import { UserContext } from './cart-context';
import { InputContext } from './cart-context';
import { startEndContext } from './cart-context';
import { trackContext } from './cart-context';
import { dataContext } from './cart-context';
import { authContext } from './cart-context';

const CartProvider = (props) => {
 
  const [realStartValue, setRealStartValue] = useState('pnbe');
  const [realEndValue, setRealEndValue] = useState('ndls');
  const [theTrainNo, setTheTrainNo] = useState('');
  const [data, setData] = useState([]);

  const [user, setUser] = useState(null);
  const initialName = localStorage.getItem('user');
 
  const [logger, setLogger] = useState(initialName);
  console.log("logger " + logger);
  // localStorage.setItem('user', logger);
  console.log("local stroage" + (localStorage.getItem('user')));

  const initialToken = localStorage.getItem('token')
  const[token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;


  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    // localStorage.setItem('user', logger);
    setLogger(localStorage.getItem('user'))
    console.log(" first local stroage" + (localStorage.getItem('user')));
  }
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // setLogger('')
  }

  const  contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }
 

  return (
    <authContext.Provider value={contextValue}>
    <dataContext.Provider value={{ data, setData }}>
      <UserContext.Provider value={{ user, setUser }}>
        <InputContext.Provider value={{ logger, setLogger }}>
          <startEndContext.Provider value={{ realStartValue, setRealStartValue, realEndValue, setRealEndValue }}>
            <trackContext.Provider value={{ theTrainNo, setTheTrainNo }}>
              {props.children}
            </trackContext.Provider>
          </startEndContext.Provider>
        </InputContext.Provider>
      </UserContext.Provider>
    </dataContext.Provider>
    </authContext.Provider>
  );
};

export default CartProvider;
