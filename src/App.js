import React from 'react'
import Login from './Login/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Search from './pages/Search/Search';
import Track from './pages/Track/Track';
import About from './pages/About/About';
import Api from './pages/Search/Api';
import { authContext } from './store/cart-context';
import { useContext } from 'react';
import Logout from './Logout/Logout';
import TrackApi from './pages/Track/TrackApi';
import SignUp from './signUp/signUp';
import ForgotPass from './ForgotPass/ForgotPass';
import { Navigate } from 'react-router-dom';
import Book from './pages/Search/Book';

const App = () => {

const ctxValue = useContext(authContext)
const isLoggedIn = ctxValue.isLoggedIn
{console.log(isLoggedIn);}

  return (
    
    
    
    <Routes>
    <Route exact path='/ForgotPass' element={<ForgotPass/>} ></Route>
    <Route exact path='/Home/Booking' element={isLoggedIn ?<Book/>: <Login/>}></Route>
    <Route exact path='/SignUp' element={<SignUp/>}></Route>
    <Route exact path='/Logout' element={<Logout/>}></Route>
    <Route exact path='/Home/Track' element={isLoggedIn ?<Track/>: <Login/>}></Route>
    <Route exact path='/Home/Track/TrackApi' element={isLoggedIn ?<TrackApi/>: <Login/>}></Route>
    { <Route exact path='/' element={ isLoggedIn ?( <Home/>): <Login/>}></Route>}
    <Route exact path='/Home/Search/*' element={isLoggedIn ?< Search />: <Login/>}> </Route>
    <Route exact path='/Search/Api' element={isLoggedIn ?<Api/>: <Login/>}> </Route>
    { isLoggedIn && <Route exact path='/Home' element={< Home />}></Route>}
    <Route exact path='/About' element={isLoggedIn ?< About />: <Login/>}></Route>
    <Route path="*" element={<Navigate to="/" replace />} />

</Routes>
  )
}

export default App
