

import classes from './Card.module.css';

const Card2 = (props) => {
  return <div className={classes.card}>
  {props.children}  
  </div>
}
export default Card2;