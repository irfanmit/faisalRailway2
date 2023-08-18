import React from 'react'
import styles from './Logout.module.css'

const Logout = () => {
  return (
    <>
   <div class="container">
  <div class="message">
    <h2>You have successfully logged out.</h2>
    <p>Thanks for visiting us. See you again!</p>
    <a href="/Home" class="btn">Return to Home</a>
  </div>
</div>

    </>
  )
}

export default Logout

