import { Link,useHistory } from 'react-router-dom';
import React from 'react'
import './Login.scss'
import { useState } from 'react';
import { auth, authMain, db, dbMain } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Sidebar from '../../components/Sidebar/Sidebar';
import Social from '../../components/Social/Social';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';


function Login() {
    const  [{user,site_colors,sidebar,site_info},dispatch]= useStateValue();
    const history= useHistory();
    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');
     
    const signIn = (e)=> {
       e.preventDefault();

       authMain.signInWithEmailAndPassword(email,password)
           .then(auth => {
               history.push('/')
           }).catch(error => alert(error.message));
    }
    const register = (e) => {
        e.preventDefault();

        authMain.createUserWithEmailAndPassword(email,password)
            .then((auth) => {
                console.log(auth);
                if(auth) {

                    db.collection('users')
                    .doc(auth.user.uid)
                    .collection('details')
                    .doc(`details_${auth.user.uid}`)
                    .set({
                        active: true,
                        name: 'hello guest',
                        phone: '1234567890',
                        address: 'test address 1',
                        image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
                    })

                    db.collection('userList')
                    .doc(auth.user.uid)
                    .set({
                        active: true,
                        email: auth.user.email,
                        name: 'hello guest',
                        phone: '1234567890',
                        address: 'test address 1',
                        image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
                    })

                    dbMain.collection('users')
                    .doc(auth.user.uid)
                    .collection('details')
                    .doc(`details_${auth.user.uid}`)
                    .set({
                        active: true,
                        name: 'hello guest',
                        phone: '1234567890',
                        address: 'test address 1',
                        image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
                    })

                    dbMain.collection('userList')
                    .doc(auth.user.uid)
                    .set({
                        active: true,
                        email: auth.user.email,
                        name: 'hello guest',
                        phone: '1234567890',
                        address: 'test address 1',
                        image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
                    })
                    
                    
                    history.push('/')
                }
            })
            .catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <Sidebar />
          <div className='loginMobile'>
              {sidebar ? <SidebarMobile /> : (
  <div className='login__page'>
                
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
        By signing-in you agree to the {site_info.siteName} Conditions of Use 
        & Sale. Please see our Privacy Notice,Our Cookies Notice
        and our Interest-Based Ads
        Notice.
      </p>
      <button
      onClick={register}
      className='login__registerButton'>Create Your {site_info.siteName} Account</button>
  </div>
  </div>
              )}
          </div>

          <div className='loginPc'>
          <div className='login__page'>
                
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
                      By signing-in you agree to the {site_info.siteName} Conditions of Use 
                      & Sale. Please see our Privacy Notice,Our Cookies Notice
                      and our Interest-Based Ads
                      Notice.
                    </p>
                    <button
                    onClick={register}
                    className='login__registerButton'>Create Your {site_info.siteName} Account</button>
                </div>
                </div>
          </div>
            <Social />
        </div>
    )
}

export default Login
