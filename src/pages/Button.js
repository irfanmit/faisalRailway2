import React from 'react'
import styles from './Button.module.css';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
const Button = (props) => {
  return (
    <>
    <div className={styles.Button}>
    {/* <Link to='/Search/Api'> */}
       <button  type="submit"><i className="fa fa-search">Search</i></button>
       {/* </Link> */}
       </div>
       {/* <Outlet/> */}
    </>
  )
}

export default Button
