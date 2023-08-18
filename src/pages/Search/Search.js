import {React}  from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import Form from './Form';
import Api from './Api';

import styles from './Search.module.css';
const Search = () => {

  return (
    <>
     {/* <Routes>
    <Route exact path='/Search/Api' element={<Api/>}> </Route>
    </Routes> */}
    
   <div className={styles.image}>
    <div className={styles.form}>

            <Form/>

    </div>
    </div>

   
    </>
  )
}

export default Search
