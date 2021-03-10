import React from 'react'
import './Vlogin.scss'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authMain, dbMain, firebaseApp } from '../../firebase';
import { useStateValue } from '../../StateProvider';

function Vlogin() {
    const  [{user,site_colors,sidebar,site_info,user_details},dispatch]= useStateValue();
    const history= useHistory();
    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');

    if(user) {
      
        if(user_details){
            if(user_details.business){
                history.push(`/restro/dashboard/${user_details.business}`);
            }else{
                history.push(`/mobile`);
            }
         
        }
        
      
  }
   

    const signIn = (e)=> {
       e.preventDefault();

       authMain.signInWithEmailAndPassword(email,password)
           .then(auth => {
               

              
                dbMain.collection('userList').doc(auth.user.uid)
                .onSnapshot(function(doc) {
                    if(doc.data().business){
                        history.push(`/restro/dashboard/${doc.data().business}`);
                    }
                    else {
                        history.push(`/mobile`);
                    }
                
                });
            
           }).catch(error => alert(error.message));
    }

    const sendNotification= () => {
        const messaging = firebaseApp.messaging() 
                        Notification.requestPermission().then(()=>{
                          return messaging.getToken()
                        }).then(token=>{
                            console.warn(token);
                           dispatch({
                               type: 'ADD_NOTIFICATION_TOKEN',
                               notification_token: token
                           });
                        }).catch((err)=>{
                          console.log(err);
                          
                        })
    }
    return (
        <div className='Vlogin'>
             <div className='Register__left'>
        <img src='https://firebasestorage.googleapis.com/v0/b/restro-main.appspot.com/o/vandore%2Fsign.png?alt=media&token=c482274d-60c2-49e1-8b31-7ff6b831d4e5' />
             </div>
             <div className='Register__right'>
             <div className='vandore__form'>
               <div className='QRComponentBottom--logo'>
                <img src='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png'/>
                <h2 style={{color: 'black'}}>ANDORE</h2>
            </div>
            <form onSubmit={signIn}>
                          <h1>Sign in to your account </h1>
                          <label htmlFor='for' >Email</label>
                          <div className='vandore__input'>
                          <input type='email' required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email"/>
                          </div>
                     
                          <label htmlFor='for' >Password</label>
                          <div className='vandore__input'>
                          <input type='password' required value={password} onChange={e => setPassword(e.target.value)} placeholder="Your Password" />
                          </div>
                       
                          <button type='submit' className='vandore__button'>Continue</button>
                          <div className='login__suggest' onClick={() => history.push('/passwordReset')}>
               Forgot Password ?
           </div>
           <div className='login__suggest' onClick={() => history.push('/signup')}>
               Not Have An Account Yet?, Sign Up Now
           </div>
                     </form>
           
            </div>
             </div>
        </div>
    )
}

export default Vlogin
