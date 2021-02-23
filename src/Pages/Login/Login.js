import { Link,useHistory } from 'react-router-dom';
import React, { useEffect, useRef } from 'react'
import './Login.scss'
import { useState } from 'react';
import { auth, authMain, db, dbMain, firebaseApp } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Sidebar from '../../components/Sidebar/Sidebar';
import Social from '../../components/Social/Social';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import VandoreBanner from '../../components/VandoreBanner/VandoreBanner';
import Header from '../../components/Header/Header';
import StateFill from '../StateFill';
import { Avatar, Modal } from '@material-ui/core';
import FileUploader from 'react-firebase-file-uploader';
import { AddAPhoto } from '@material-ui/icons';
import Geosuggest from 'react-geosuggest';
import firebase from 'firebase';


function Login({pageId}) {
    const  [{user,site_colors,sidebar,site_info},dispatch]= useStateValue();
    const history= useHistory();
    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');
    const [token,setToken]= useState('');
    const [name,setName]= useState('');
    const [phone,setPhone]= useState('');
    const [address,setAddress]= useState('');
    const [image,setImage]= useState('https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png');
    const [openImage,setOpenImage]= useState(false);
    const[toggleSignIn,setToggleSignIn]=useState(false);
    const[siteUsers,setSiteUsers]= useState([]);
    

    useEffect(() => {
  
        db.collection(pageId.toUpperCase()).doc('userList').collection('userList')
        .onSnapshot(snapshot => (
            setSiteUsers(snapshot.docs.map(doc => doc.id))
        ))
       
        },[])


    const handleUploadStart= () => {
        setOpenImage(true);
    }

    const handleUploadSuccess= (filename) =>{
        firebaseApp.storage().ref('user').child(filename).getDownloadURL()
       .then(url => setImage(url)).then(() => setOpenImage(false));
  
     };

     const grantPermission= (e) => {
         e.preventDefault();
        const messaging = firebaseApp.messaging() 
        Notification.requestPermission().then(()=>{
          return messaging.getToken()
        }).then(token=>{
            console.warn(token);
            setToken(token);
            dispatch({
                type: 'ADD_NOTIFICATION_TOKEN',
                notification_token: token
            })
        }).catch((err)=>{
          console.log(err);
          
        })
       }
    
     
    const signIn = (e)=> {
       e.preventDefault();


       authMain.signInWithEmailAndPassword(email,password)
           .then(auth => {
           
            if(!siteUsers.includes(auth.user.uid)){
            dbMain.collection('users')
            .doc(auth.user.uid)
            .collection('details')
            .doc(`details_${auth.user.uid}`)
            .onSnapshot(function(doc) {
               
                db.collection(pageId).doc('users').collection('users')
                    .doc(auth.user.uid)
                    .collection('details')
                    .doc(`details_${auth.user.uid}`)
                    .set({
                        active: doc.data().active,
                        name: doc.data().name,
                        email: doc.data().email,
                        phone: doc.data().phone,
                        notification: token,
                        address: doc.data().address,
                        image: doc.data().image
                    })

                    db.collection(pageId).doc('userList').collection('userList')
                    .doc(auth.user.uid)
                    .set({
                        active: doc.data().active,
                        name: doc.data().name,
                        email: doc.data().email,
                        phone: doc.data().phone,
                        notification: token,
                        address: doc.data().address,
                        image: doc.data().image
                    })
                

              });
            }else{
                db.collection(pageId).doc('users').collection('users')
                .doc(auth.user.uid)
                .collection('details')
                .doc(`details_${auth.user.uid}`)
                .update({
                    notification: token
                })
    
                db.collection(pageId).doc('userList').collection('userList')
                .doc(auth.user.uid)
                .update({
                    notification: token
                })
            }


            dbMain.collection('users')
            .doc(auth.user.uid)
            .collection('details')
            .doc(`details_${auth.user.uid}`)
            .update({
                notification: token
            })

            dbMain.collection('userList')
            .doc(auth.user.uid)
            .update({
                notification: token
            })
            
            history.push(`/vandore/${pageId}/home`)
           }).catch(error => alert(error.message));
    }
    const register = (e) => {
        e.preventDefault();

      if(name === '' || phone=== '' || address=== '' || image === '' || email=== '' || password === ''){
          alert('Fill All Fields To Continue');
          return;
      }

        authMain.createUserWithEmailAndPassword(email,password)
            .then((auth) => {
                console.log(auth);
                if(auth) {

                    db.collection(pageId).doc('users').collection('users')
                    .doc(auth.user.uid)
                    .collection('details')
                    .doc(`details_${auth.user.uid}`)
                    .set({
                        active: true,
                        name: name ? name : 'hello guest',
                        email: auth.user.email,
                        phone: phone ? phone : '1234567890',
                        notification: token,
                        address: address ? address : 'Test Address 1',
                        image: image ? image : 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
                    })

                    db.collection(pageId).doc('userList').collection('userList')
                    .doc(auth.user.uid)
                    .set({
                        active: true,
                        name: name ? name : 'hello guest',
                        email: auth.user.email,
                        phone: phone ? phone : '1234567890',
                        notification: token,
                        address: address ? address : 'Test Address 1',
                        image: image ? image : 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
                    })

                    const acode= getRandomText(5);

                    dbMain.collection('users')
                    .doc(auth.user.uid)
                    .collection('details')
                    .doc(`details_${auth.user.uid}`)
                    .set({
                        active: true,
                        page: pageId,
                        affiliation: acode,
                        name: name ? name : 'hello guest',
                        email: auth.user.email,
                        phone: phone ? phone : '1234567890',
                        notification: token,
                        address: address ? address : 'Test Address 1',
                        apaymentRequest: false,
                        requestDate: firebase.firestore.FieldValue.serverTimestamp(),
                        amountPaid: 0,
                        image: image ? image : 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
                    })

                    dbMain.collection('userList')
                    .doc(auth.user.uid)
                    .set({
                        active: true,
                        page: pageId,
                        affiliation: acode,
                        name: name ? name : 'hello guest',
                        email: auth.user.email,
                        phone: phone ? phone : '1234567890',
                        notification: token,
                        address: address ? address : 'Test Address 1',
                        apaymentRequest: false,
                        requestDate: firebase.firestore.FieldValue.serverTimestamp(),
                        amountPaid: 0,
                        image: image ? image : 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
                    })

                    dbMain.collection('affiliation_codes')
                    .doc(acode)
                    .set({
                      code: acode,
                      uid: auth.user.uid,
                      active: true
                    })
                    
                    
                    history.push(`/vandore/${pageId}/home`)
                }
            })
            .catch(error => alert(error.message));
    }

    function getRandomText(length) {
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/./g);
        var text = "";
        for (var i = 0; i < length; i++) text += charset[Math.floor(Math.random() * charset.length)];
        return text;
      }


    return (
      
        
        <div className="login">
            <Sidebar pageId={pageId} />
          <div className='loginMobile'>
              {sidebar ? <SidebarMobile pageId={pageId} /> : (
  <div className='login__page'>
                
                {toggleSignIn ? (
        <div className='login__container'>
        <h1>Sign-Up</h1>
        <form>
            <Avatar src={image} style={{width: '150px',height: '150px',margin: '0 auto'}} />
 <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',marginTop: 20,display: 'flex',alignItems: 'center',width: 'max-content',margin: '0 auto'}}>
   Select Your Profile Picture <AddAPhoto style={{paddingLeft: '10px'}} />
   <FileUploader
     hidden
     accept="image/*"
     randomizeFilename
     name="image"
     storageRef={firebaseApp.storage().ref("user")}
     onUploadStart={handleUploadStart}
     onUploadSuccess={handleUploadSuccess}
    />
    </label>
            <h5>Name</h5>
            <input type='text' value={name} onChange={e => setName(e.target.value)} />
            <h5>Phone</h5>
            <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
            <h5>Address</h5>
            <input type='text' value={address} onChange={e => setAddress(e.target.value)} />
           
            <h5>E-mail</h5>
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />


            <h5>Password</h5>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

         

          {token ? (
   <button 
   onClick={register}
   style={{backgroundColor: `${site_colors.button}`}}
   className='login__signInButton'>Sign Up</button>
          ) : (
            <button 
            onClick={grantPermission}
            style={{backgroundColor: `${site_colors.button}`}}
            className='login__signInButton'>Give Notification Access To Continue</button>
          )}

        </form>
        <p>
        By signing-in you agree to the {site_info.siteName} Conditions of Use 
        & Sale <Link to='/Terms'>Terms and Conditions</Link>. Please see our Privacy Notice,Our Cookies Notice
        and our Interest-Based Ads
        Notice.
        </p>
        <button
        onClick={() => setToggleSignIn(false)}
        className='login__registerButton'>Log In Your {site_info.siteName} Account</button>
        </div>
                ) : (
                    <div className='login__container'>
                    <h1>Sign-in</h1>
                    <form>
                        <h5>E-mail</h5>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                        <h5>Password</h5>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
    
                        {token ? (
   <button 
   onClick={signIn}
   style={{backgroundColor: `${site_colors.button}`}}
   className='login__signInButton'>Sign In</button>
          ) : (
            <button 
            onClick={grantPermission}
            style={{backgroundColor: `${site_colors.button}`}}
            className='login__signInButton'>Give Notification Access To Continue</button>
          )}
                    </form>
                    <p>
                      By signing-in you agree to the {site_info.siteName} Conditions of Use 
                      & Sale <Link to='/Terms'>Terms and Conditions</Link>. Please see our Privacy Notice,Our Cookies Notice
                      and our Interest-Based Ads
                      Notice.
                    </p>
                    <button
                    onClick={() => setToggleSignIn(true)}
                    className='login__registerButton'>Create Your {site_info.siteName} Account</button>
                </div>
                )}
               
  </div>
              )}
          </div>

          <div className='loginPc'>
          <div className='login__page'>
                
                {toggleSignIn ? (
        <div className='login__container'>
        <h1>Sign-Up</h1>
        <form>
            <Avatar src={image} style={{width: '150px',height: '150px',margin: '0 auto'}} />
 <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',marginTop: 20,display: 'flex',alignItems: 'center',width: 'max-content',margin: '0 auto'}}>
   Select Your Profile Picture <AddAPhoto style={{paddingLeft: '10px'}} />
   <FileUploader
     hidden
     accept="image/*"
     randomizeFilename
     name="image"
     storageRef={firebaseApp.storage().ref("user")}
     onUploadStart={handleUploadStart}
     onUploadSuccess={handleUploadSuccess}
    />
    </label>
            <h5>Name</h5>
            <input type='text' value={name} onChange={e => setName(e.target.value)} />
            <h5>Phone</h5>
            <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
            <h5>Address</h5>
            <input type='text' value={address} onChange={e => setAddress(e.target.value)} />
           
            <h5>E-mail</h5>
            <input type='text' value={email} onChange={e => setEmail(e.target.value)} />


            <h5>Password</h5>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

         

          {token ? (
   <button 
   onClick={register}
   style={{backgroundColor: `${site_colors.button}`}}
   className='login__signInButton'>Sign Up</button>
          ) : (
            <button 
            onClick={grantPermission}
            style={{backgroundColor: `${site_colors.button}`}}
            className='login__signInButton'>Give Notification Access To Continue</button>
          )}

        </form>
        <p>
        By signing-in you agree to the {site_info.siteName} Conditions of Use 
        & Sale <Link to='/Terms'>Terms and Conditions</Link>. Please see our Privacy Notice,Our Cookies Notice
        and our Interest-Based Ads
        Notice.
        </p>
        <button
        onClick={() => setToggleSignIn(false)}
        className='login__registerButton'>Log In Your {site_info.siteName} Account</button>
        </div>
                ) : (
                    <div className='login__container'>
                    <h1>Sign-in</h1>
                    <form>
                        <h5>E-mail</h5>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                        <h5>Password</h5>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
    
                        {token ? (
   <button 
   onClick={signIn}
   style={{backgroundColor: `${site_colors.button}`}}
   className='login__signInButton'>Sign In</button>
          ) : (
            <button 
            onClick={grantPermission}
            style={{backgroundColor: `${site_colors.button}`}}
            className='login__signInButton'>Give Notification Access To Continue</button>
          )}
                    </form>
                    <p>
                      By signing-in you agree to the {site_info.siteName} Conditions of Use 
                      & Sale <Link to='/Terms'>Terms and Conditions</Link>. Please see our Privacy Notice,Our Cookies Notice
                      and our Interest-Based Ads
                      Notice.
                    </p>
                    <button
                    onClick={() => setToggleSignIn(true)}
                    className='login__registerButton'>Create Your {site_info.siteName} Account</button>
                </div>
                )}
               
                </div>
          </div>
            <Social />

            <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={openImage}
  
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
        <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
         Please wait your photo is uploading
        </div>
        
        <div className='modal__button' style={{margin: '10px auto',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}}>
          <img src='https://i.ibb.co/HqghKW6/2.gif' />
        </div>
    </div>
 
</Modal>
        </div>
    
    )
}

export default Login
