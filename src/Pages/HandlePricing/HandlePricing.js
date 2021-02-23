import React, { useState,useEffect } from 'react'
import { db, firebaseApp } from '../../firebase';
import './HandlePricing.scss'
import firebase from 'firebase';

import {  Menu } from '@material-ui/icons';

import { useStateValue } from '../../StateProvider';
import { Modal } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PricingSvg from '../../icons/undraw_online_payments_luau.svg';
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
        pricing: true
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
     {site_preview.pricing ? (
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
     <div onClick={() => manageVideo(single_guides.pricing)}>Guides</div>
    </div>





    <div className='dashboard__headerTitle' style={{margin: '20px auto',width: '95%'}}>
        Recharge For Your Vandore Service
        <hr></hr>
 </div>
     <div className='deleteAccount' style={{color: 'white',margin:'0 auto',width: '93%'}} >
     Vandore primarily offers Two plans. Choose the plan that's suit for your business.
      <div className='domainAccountButton' onClick={() => manageVideo(single_guides.pricing)}>
          See Guide Video
      </div>
    </div>
  
                <div className='handlePrice_priceCards'>
              {/*   <PriceCard plan='free' /> */}
                <PriceCard plan='lite' />
               
                <PriceCard plan='gold' />
                
                </div>
 <div className='dashboard__headerTitle' style={{margin: '0 auto',width: '95%'}}>
        Recharge For SMS
        <hr></hr>
 </div>
     <div className='deleteAccount' style={{color: 'white',margin:'0 auto',width: '93%'}} >
     Buying SMS services results in better customer relationship.
     <div className='domainAccountButton' onClick={() => manageVideo(single_guides.pricing)}>
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
<button onClick={() => history.push(`/restro/guides/${id.toUpperCase()}`)}>Show All Guides</button>
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
                   <h1>Pricing</h1>
                   <h3>Vandore primarily offers three plans. Choose the plan that's suit for your business.</h3>
             
                    <div className='site_preview--getStarted' onClick={handleGetStarted}>
                       Get Started
                    </div>
                </div>

                <div className='site_preview--topContainer--right'>
                     <img src={PricingSvg} style={{fill:"#FFFFFF"}} />
                </div>
        </div>
     </div>
     <div className='guide__learn--more'>
         Learn More
    </div>
     <div className='site_preview--guide'>
        <div className='site_preview--guide--left'>
        <img src={PricingSvg} style={{fill:"#FFFFFF"}} />
        <h4>Vandore primarily offers three plans. Choose the plan that's suit for your business.</h4>
        </div>
        <div className='site_preview--guide--right'>
          <iframe src={single_guides.pricing} />
        </div>
    </div>
    </div>
     )}

        </div>
    )
}

export default HandlePricing
