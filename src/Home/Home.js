import {React, useEffect, useState} from 'react'
import { Link, Outlet } from 'react-router-dom';
import styles from './Home.module.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import {UserContext} from '../store/cart-context';
import { InputContext } from '../store/cart-context';
import { authContext } from '../store/cart-context';
import Logout from '../Logout/Logout';

 const Home = () => {
  const ctxValue = useContext(authContext);
  const isLoggedIn = ctxValue.isLoggedIn;
  const { user, setUser } = useContext(UserContext);
  const {logger, setLooger} = useContext(InputContext);
  const firstLetter = logger.charAt(0).toUpperCase();
  // console.log(firstLetter)

  const logoutHandler = () => {
    ctxValue.logout();
    console.log('logout')
  }

  const [dateTime, setDateTime] = useState('');
  const s="Faisal";
  const ln = s.length;
    
    const [head, setHead] = useState("");
    const [count, setCount] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const dayOfWeek = now.toLocaleString('default', { weekday: 'long' });
        const dayOfMonth = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const date = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
        const time = `${hours}:${minutes}:${seconds}`;
        const currentDateTime = `${date} ${time}`;
        setDateTime(currentDateTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);

  //   useEffect(() => {

  //     const intervalId = setInterval(() => {
  //       setCount(count => count + 1);
  //       if(count<ln){
  //         if(count>0){
  //           setHead(s[count-1]);
  //         }
  //         setHead(s[count + 1]);
  //       }
       
  //     }, 500);
      
  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, [ln,count]);

  return (
    <>
           <nav className="navbar bg-dark">
      {/* <div className={styles.head}>
        {head}
      </div> */}
      <div className={styles.name}>
        {"Hi, " + logger + " how can we help?"}
      </div>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link fs-5 cursor-pointer" aria-current="page" to='/About'><div className={styles.about}>About Us</div></Link>
        </li>
        <li className="nav-item">
        <div className={styles.first}>{firstLetter}</div>
        {isLoggedIn ? <Link className="nav-link fs-5 cursor-pointer" ><div className={styles.btn}><button style={{all: 'unset'}}onClick={logoutHandler} >Logout</button></div></Link> : <Link className="nav-link fs-5 cursor-pointer" to='/'>Login</Link>}

        </li>
        {/* <li className="nav-item">
          <Link className="nav-link fs-5 cursor-pointer" to='/Link2'>Link 2</Link>
        </li> */}
      </ul>
    </nav>
        
        <div className={styles.reactRail} ><p>
          React-rail
        </p>
        </div>
        {/* <div className={styles.reactRail}> */}
        {/* <p>React-rail</p> */}

        {/* </div> */}
    <div className={styles.rail}>

    </div>
    <div className={styles.rail2}>

    </div>
    {/* <div className={styles.head}>
      {head}
    </div> */}
    
    <div className={styles.container}>
    <Link to ='/Home/Search'>
        <div className={styles.search}>
              Search Trains
        </div>
        </Link>
        <Link to='/Home/Track'>
        <div className={styles.track}>
              Track Trains
        </div>
        </Link>
        <div className={styles.time}><h5>Local time : </h5>{dateTime}</div>

    </div>
    <Outlet/>
    </>
  )
}
 export default Home;
