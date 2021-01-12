import React, { useState,useEffect } from 'react'
import { db, firebaseApp } from '../../firebase';
import './HandlePricing.scss'
import firebase from 'firebase';

import {  Menu } from '@material-ui/icons';

import { useStateValue } from '../../StateProvider';
import { Modal } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PostSvg from '../../icons/undraw_share_online_r87b.svg';
import PriceCard from '../../components/PriceCard/PriceCard';



function HandlePricing({id}) {
   
  
   
 
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







   


  

    return (
        <div className='handlePrice'>
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
            <h1>Pricing</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>PRICING</h1>
        </div>
    <div className='guide_tutorial_toast'>
     <p>
     If you face any difficulties regarding Pricing, then see our Pricing guides
     </p> 
     <div onClick={() => manageVideo(single_guides.posts)}>Guides</div>
    </div>





    <div className='dashboard__headerTitle' style={{margin: '20px auto',width: '95%'}}>
        Recharge For Your Vandore Service
        <hr></hr>
 </div>
     <div className='deleteAccount' style={{color: 'white',margin:'0 auto',width: '93%'}} >
     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna nunc id cursus metus aliquam eleifend mi in. Vestibulum sed arcu non odio euismod lacinia at quis.
      <div className='domainAccountButton' onClick={() => manageVideo(single_guides.posts)}>
          See Guide Video
      </div>
    </div>
  
                <div className='handlePrice_priceCards'>
                <PriceCard plan='free' />
                <PriceCard plan='plus' />
                <PriceCard plan='gold' />
                
                </div>
 <div className='dashboard__headerTitle' style={{margin: '0 auto',width: '95%'}}>
        Recharge For SMS
        <hr></hr>
 </div>
     <div className='deleteAccount' style={{color: 'white',margin:'0 auto',width: '93%'}} >
     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna nunc id cursus metus aliquam eleifend mi in. Vestibulum sed arcu non odio euismod lacinia at quis.
     <div className='domainAccountButton' onClick={() => manageVideo(single_guides.posts)}>
          See Guide Video
      </div>
    </div>

    <div className='handlePrice_priceCards'>
                <PriceCard plan='sms' />
               
               <div className='smsLeft'>
               <p>SMS</p>
               <span>{user_details.sms}</span>
               <p>LEFT</p>
               </div>
                
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

export default HandlePricing
