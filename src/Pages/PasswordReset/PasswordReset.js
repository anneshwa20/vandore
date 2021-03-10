import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { authMain } from '../../firebase';
import './PasswordReset.scss'

function PasswordReset() {
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);

    const history= useHistory();

    const sendResetEmail = event => {

        event.preventDefault();
        setError('');
        authMain
        .sendPasswordResetEmail(email)
        .then(() => {
          setEmailHasBeenSent(true);
          setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
        })
        .catch(() => {
          setError("Error resetting password");
        });
      };
    return (
        <div className='Register'>
            <div className='Register__left'>
            <img src='https://firebasestorage.googleapis.com/v0/b/restro-main.appspot.com/o/vandore%2Fsign.png?alt=media&token=c482274d-60c2-49e1-8b31-7ff6b831d4e5' />
            </div>
            <div className='Register__right'>
                <div className='vandore__form'>
                <div className='QRComponentBottom--logo'>
                <img src='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png'/>
                <h2 style={{color: 'black'}}>ANDORE</h2>
            </div>

            <form onSubmit={sendResetEmail}>
           <h1>Reset Your Password</h1>
           <label htmlFor='for' >Type Your Registered Email</label>
            <div className='vandore__input'>
                  <input type='email' placeholder='Your Email' required value={email} onChange={e => setEmail(e.target.value)} /> 
           </div>
           {emailHasBeenSent && (
            <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
              {error}
            </div>
          )}
           <button className='vandore__button' type="submit">Send Me Reset Link</button>

           <div className='login__suggest' onClick={() => history.push('/signin')}>
  Have a account ? Sign In Now 
</div>
<div className='login__suggest' onClick={() => history.push('/signup')}>
  Not have a account yet ? Sign up Now
</div>
            </form>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset
