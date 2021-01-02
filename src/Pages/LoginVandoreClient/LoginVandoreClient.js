import { Link,useHistory } from 'react-router-dom';
import React from 'react'

import { useState } from 'react';
import { auth, authMain, db, dbMain } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';

function LoginVandoreClient() {
    const  [{user,site_colors,sidebar,site_info,user_details},dispatch]= useStateValue();
    const history= useHistory();
    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');

    if(user) {
      
        
        if(user_details.business){
            history.push(`/restro/dashboard/${user_details.business}`);
        }
     
      
  }
   

    const signIn = (e)=> {
       e.preventDefault();

       authMain.signInWithEmailAndPassword(email,password)
           .then(auth => {
               console.log(auth.user.uid);

              
                dbMain.collection('userList').doc(auth.user.uid)
                .onSnapshot(function(doc) {
                    if(doc.data().business){
                        history.push(`/restro/dashboard/${doc.data().business}`);
                    }
                    else {
                        history.push(`/`);
                    }
                
                });
            
           }).catch(error => alert(error.message));
    }
   
    return (
        <div className="loginVandore">
   <div className='login__container'>
                    <h1>Sign-in</h1>
                    <form>
                     
                        <h5>E-mail</h5>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                        <h5>Password</h5>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
    
                        <button 
                        onClick={signIn}
                        style={{backgroundColor: `${site_colors.button}`}}
                        className='login__signInButton'>Sign In</button>
                    </form>
                    <p>
                      By signing-in you agree to the Vandore Conditions of Use 
                      & Sale. Please see our Privacy Notice,Our Cookies Notice
                      and our Interest-Based Ads
                      Notice.
                    </p>
                   
                </div>
        </div>
    )
}

export default LoginVandoreClient
