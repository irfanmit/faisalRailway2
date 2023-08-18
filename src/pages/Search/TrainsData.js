import {React, useRef} from 'react'
import classes from './TrainsData.module.css'
import { useContext } from 'react';
import { trackContext } from "../../store/cart-context";
// import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TrainsData = (props) => {

  const trackFormRef = useRef(null);

  const navigate = useNavigate();
  const { theTrainsNo , setTheTrainNo} = useContext(trackContext);

  // const {
  //   handleSubmit
  // } = useFormik({
  //   onSubmit: () => {
  //     setTheTrainNo("");
  //     // trackFormRef.current.submit();
  //     navigate('/Home');
  //   }
  // });

   const handleSubmit = () =>{
    // setTheTrainNo(props.no);
    //   trackFormRef.current.submit();
    //   navigate('/Home/Track');
   }
  

 
  return (
    
    <li className={classes.train}>
      <div className={classes.trainInfo}>
        <div className={classes.name}>
          <h3>{props.name} ({props.no})</h3>
        </div>
        <div className={classes.second}>
          <div className={classes.origin}>
            <h5>{props.origin} | </h5>
          </div>          
          <div className={classes.time}>
            <h5>{props.depTime}</h5>
          </div>
          <div className={classes.centerLine}>
            <h4>---- 8:00 ----</h4>
          </div>
        </div>
        <div className={classes.price}>
          {props.classType}
        </div>
        <div className={classes.running}>
          {props.run}
        </div>
        <div className={classes.dest}>
          <h5>{props.arriv} | {props.dest}</h5>
        </div>
        <form ref={trackFormRef} onSubmit={handleSubmit}>
          <div className={classes.trackLive}>
          <Link to={`/Home/Track?trainNo=${props.no}`}>
              <button type="button">Track Live</button>
           </Link> 
          <Link to='/Home/Booking'> <button>Book now</button></Link>

          </div>
        </form>
      </div>
    </li>
  )
}

export default TrainsData
