import React, { useState,useEffect } from 'react'
import { db, dbMain, firebaseApp } from '../../firebase';
import './HandleQrApp.scss'
import firebase from 'firebase';

import {  Menu } from '@material-ui/icons';

import { useStateValue } from '../../StateProvider';
import { Modal } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PostSvg from '../../icons/undraw_share_online_r87b.svg';
import { QRCode } from 'react-qrcode-logo';
import QRComponent from '../../components/QRComponent/QRComponent';
import { useRef } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import ReactToPdf from 'react-to-pdf';



function HandleQrApp({id}) {
    const componentRef = React.createRef();
    
   const [message,setMessage]= useState('');
   const [image, setImage]= useState('');
   const [openAlert,setOpenAlert]= useState(false);
   const [openImage,setOpenImage]= useState(false);
   const [show,setShow]= useState(false);
   const [posts,setPosts]= useState([]);
  const pageId= id;
   const history= useHistory();
    const[{single_guides,site_preview,sidebarVandore,user,user_details},dispatch]= useStateValue();
   const [open,setOpen]= useState(false);
   const [currentVideo,setCurrentVideo]= useState('');
   const manageVideo= (link) => {
    setOpen(true);
    setCurrentVideo(link);
  }

  const handleGetStarted= () => {
    db.collection(id.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
        post: true
    }).then(refreshPage);
}
const refreshPage = ()=>{
    window.location.reload();  }


   
  const handleApp= () => {
    dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
      appRequest: true
});
  dbMain.collection("app").add({
      id: user.uid,
      user: user_details.name,
      phone: user_details.phone,
      email: user.email,
      image: user_details.image,
      business: user_details.business
  });
  }


 const handleDesktopApp= () => {
    dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
      desktopAppRequest: true
});
  dbMain.collection("desktopApp").add({
      id: user.uid,
      user: user_details.name,
      phone: user_details.phone,
      email: user.email,
      image: user_details.image,
      business: user_details.business
  });
  }

  const handleDownloadApp= () => {
    //
  }

  const handleDownloadDesktopApp= () => {
    //
  }
   
  

    return (
        <div className='handleQrApp'>
            
          <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
     {site_preview.post ? (
       <>
           <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>QR Code And App</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>QR CODE AND APP</h1>
        </div>
    <div className='guide_tutorial_toast'>
     <p>
     If you face any difficulties regarding Posts, then see our QR CODE & APPs guides
     </p> 
     <div onClick={() => manageVideo(single_guides.posts)}>Guides</div>
    </div>






  
<div className='handleQrApp__Qr'>


<div className='dashboard__headerTitle' style={{marginLeft: '-15px'}}>
       QR Code for your Website
        <hr></hr>
 </div>
     <div className='deleteAccount' style={{color:'white'}} >
     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna nunc id cursus metus aliquam eleifend mi in. Vestibulum sed arcu non odio euismod lacinia at quis.
     
     <div className='domainAccountButton' onClick={() => manageVideo(single_guides.posts)}>
       See Guide Video
       </div>
      {user_details.business ? (
    <ReactToPdf targetRef={componentRef} filename="div-blue.pdf">
    {({toPdf}) => (
       <div className='domainAccountButton' onClick={toPdf}>
       Download And Print QR
       </div>
    )}
</ReactToPdf>
) : ''} 
    </div>

    <div className='QRComponent'  ref={componentRef}>
         <div className='QRComponentTop'>
            <h3>Checkout Our Website</h3>
          
         </div>
        <div className='QRComponentQR'>
        <p>Scan QR to check our Website</p>
          <QRCode enableCORS={true}  logoWidth={70} logoHeight={70} logoImage='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png' value={`${user_details.business  ? `https://vandore.in/${user_details?.business.toUpperCase()}` : 'https://vandore.in'}`} />
        </div>
        <div className='QRComponentBottom'>
            <h3>{user_details?.business}</h3>
            <h4>vandore.in/{user_details?.business}</h4>
            <div className='QRComponentBottom--logo'>
                <img src='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png'/>
                <h2>ANDORE</h2>
            </div>
        </div>
        
        </div>
</div>

<div className='handleQrApp__Qr'>


<div className='dashboard__headerTitle' style={{marginLeft: '-15px'}}>
       Mobile App for your Website
        <hr></hr>
 </div>
     <div className='deleteAccount' style={{color:'white'}} >
     {user_details.appActive ? (
       <>
      Congragulation, Your App is active now, click on the download button to download it.
       </>
    ) : (
        <>
    {!user_details.appRequest  ? ( <>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis eu volutpat odio facilisis. Faucibus nisl tincidunt eget nullam non nisi est sit. </>) 
    : 'Your App is being generated, it usually takes 24hrs to complete the process, please comeback after 24 hrs to download your app'     
    }
       </>
    )}
    
     <div className='domainAccountButton' onClick={() => manageVideo(single_guides.posts)}>
          See Guide Video
      </div>

      <div className='domainAccountButton' onClick={user_details.appActive ? handleDownloadApp : handleApp}  style={{backgroundColor: `${user_details.appRequest ? '#fcb603' : ''}`}}>
        {user_details.appActive ? (
       <>
      Download App
       </>
    ) : (
        <>
    {user_details.appRequest  ? ( <>Generating Your App .....</>) 
    : 'Download Your App'    
    }
       </>
    )}
        </div>
    </div>

    <img src='https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/cover%2FScreenshot_2021-01-10-16-27-33-755_com.android.chrome_iphone12black_portrait.png?alt=media&token=f388a686-4cdb-4ab5-9dc8-e00bd7c94901' style={{height: '450px',width: '300px'}}  />
</div>


<div className='handleQrApp__Qr'>


<div className='dashboard__headerTitle' style={{marginLeft: '-15px'}}>
      Desktop App for your Website
        <hr></hr>
 </div>
     <div className='deleteAccount' style={{color:'white'}} >
     {user_details.desktopAppActive ? (
       <>
      Congragulation, Your App is active now, click on the download button to download it.
       </>
    ) : (
        <>
    {!user_details.desktopAppRequest  ? ( <>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis eu volutpat odio facilisis. Faucibus nisl tincidunt eget nullam non nisi est sit. </>) 
    : 'Your App is being generated, it usually takes 24hrs to complete the process, please comeback after 24 hrs to download your app'     
    }
       </>
    )}
     <div className='domainAccountButton' onClick={() => manageVideo(single_guides.posts)}>
          See Guide Video
      </div>

      <div className='domainAccountButton' onClick={user_details.desktopAppActive ? handleDownloadDesktopApp : handleDesktopApp}  style={{backgroundColor: `${user_details.desktopAppRequest ? '#fcb603' : ''}`}}>
        {user_details.desktopAppActive ? (
       <>
      Download App
       </>
    ) : (
        <>
    {user_details.desktopAppRequest  ? ( <>Generating Your App .....</>) 
    : 'Download Your App'    
    }
       </>
    )}
        </div>
    </div>

    <img src='https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/cover%2FScreenshot%20(338)_macbookgold_front.png?alt=media&token=2a70f9c0-288c-4617-ab6a-43f5ba335b51' style={{height: '450px',width: '350px'}}  />
</div>

<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={open}
onClose={() => setOpen(false)}
aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column', backgroundColor: 'white',padding: '20px'}}>
<iframe width="560" height="315" src={currentVideo} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<button onClick={() => history.push('/restro/guides')}>Show All Guides</button>
</div>

</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={openAlert}
onClose={() => setOpenAlert(false)}
aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
   Your data was upated
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '12px'}} onClick={()=> setOpenAlert(false)}>
   Ok
 </div>
</div>

</Modal>
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
       </>
     ) : (
      <div className='site_preview'>
      <div className='site_preview--top'>
      <div className='preview__menu' onClick={() => {
                    dispatch({
                        type: 'UPDATE_SIDEBAR_VANDORE',
                        sidebarVandore: !sidebarVandore
                    })
                }}>
                  {sidebarVandore ? '' : (
                    <Menu style={{color: 'white'}} fontSize='large'/>
                  )}
                  
                </div>
         <div className='site_preview--topContainer'>
                <div className='site_preview--topContainer--left'>
                   <h1>Posts</h1>
                   <h3>Posting content on your timeline helps driving high customer engagement.</h3>
             
                    <div className='site_preview--getStarted' onClick={handleGetStarted}>
                       Get Started
                    </div>
                </div>

                <div className='site_preview--topContainer--right'>
                     <img src={PostSvg} style={{fill:"#FFFFFF"}} />
                </div>
        </div>
     </div>
     <div className='guide__learn--more'>
         Learn More
    </div>
     <div className='site_preview--guide'>
        <div className='site_preview--guide--left'>
        <img src={PostSvg} style={{fill:"#FFFFFF"}} />
        <h4>Posting content on your timeline helps driving high customer engagement.</h4>
        </div>
        <div className='site_preview--guide--right'>
          <iframe src={single_guides.posts} />
        </div>
    </div>
    </div>
     )}

        </div>
    )
}

export default HandleQrApp
