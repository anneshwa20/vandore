import { Switch } from '@material-ui/core'
import { Menu, SettingsOverscanRounded } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './HandleSettings.scss';
import SettingsSvg from '../../icons/undraw_personal_settings_kihd.svg';

function HandleSettings() {
    const[store,setStore]=useState(true);
    const [slider,setSlider]= useState(true);
    const [discount,setDiscount]=useState(true);
    const [cover,setCover]= useState(true);
    const [cashOnDel,setCashOnDel]= useState(true);
    const [onlinePay,setOnlinePay]= useState(true);
    const [takeAway,setTakeAway]= useState(true);
    const [photoGallery,setPhotoGallery]= useState(true);
    const [aboutUs,setAboutUs]= useState(true);
    const [chatChannels,setChatChannels]= useState(true);
    const [userAuth,setUserAuth]= useState(true);
    const [feedback,setFeedback]= useState(true);
    const[{site_settings,site_preview,single_guides,sidebarVandore},dispatch]= useStateValue();

    useEffect(() => {
             setStore(site_settings.store);
             setSlider(site_settings.slider);
             setDiscount(site_settings.discount);
             setCashOnDel(site_settings.cashOnDel);
             setOnlinePay(site_settings.onlinePay);
             setTakeAway(site_settings.takeAway);
             setPhotoGallery(site_settings.photoGallery);
             setAboutUs(site_settings.aboutUs);
             setChatChannels(site_settings.chatChannels);
             setUserAuth(site_settings.userAuth);
             setCover(site_settings.cover);
             setFeedback(site_settings.feedback);

      },[site_settings])

   
    const handleGetStarted= () => {
       db.collection('site').doc('site_preview').update({
           setting: true
       }).then(refreshPage);
   }
      const refreshPage = ()=>{
       window.location.reload();  }



    const handleOptions=  (name) =>{
           
       if(name === 'store'){
              db.collection('site').doc('site_settings').update({
                     store: !store,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   store: !store
                            }
                     })
              ));

              
          }
       else if(name === 'slider'){
              db.collection('site').doc('site_settings').update({
                     slider: !slider,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   slider: !slider
                            }
                     })
              ));
       }
       else if(name === 'feedback'){
              db.collection('site').doc('site_settings').update({
                     feedback: !feedback,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   feedback: !feedback
                            }
                     })
              ));
       }
       else if(name === 'discount') {
              db.collection('site').doc('site_settings').update({
                     discount: !discount,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   discount: !discount
                            }
                     })
              ));
       }
       else if(name === 'cashOnDel'){
              db.collection('site').doc('site_settings').update({
                     cashOnDel: !cashOnDel,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   cashOnDel: !cashOnDel
                            }
                     })
              ));
       }
       else if(name === 'onlinePay') {
              db.collection('site').doc('site_settings').update({
                     onlinePay: !onlinePay,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   onlinePay: !onlinePay
                            }
                     })
              ));
       }
       else if(name === 'takeAway') {
              db.collection('site').doc('site_settings').update({
                     takeAway: !takeAway,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   takeAway: !takeAway
                            }
                     })
              ));
       }
       else if(name === 'photoGallery') {
              db.collection('site').doc('site_settings').update({
                     photoGallery: !photoGallery,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   photoGallery: !photoGallery
                            }
                     })
              ));
       }
       else if(name === 'aboutUs') {
              db.collection('site').doc('site_settings').update({
                     aboutUs: !aboutUs,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   aboutUs: !aboutUs
                            }
                     })
              ));
       }
       else if(name === 'chatChannels') {
              db.collection('site').doc('site_settings').update({
                     chatChannels: !chatChannels,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   chatChannels: !chatChannels
                            }
                     })
              ));
       }
       else if(name === 'userAuth') {
              db.collection('site').doc('site_settings').update({
                     userAuth: !userAuth,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   userAuth: !userAuth
                            }
                     })
              ));
       }
       else if(name === 'cover') {
              db.collection('site').doc('site_settings').update({
                     cover: !cover,
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   cover: !cover
                            }
                     })
              ));
       }
    }


    return (
        <div className='handleSettings'>
           {site_preview.setting ? (
            <>
                   <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>Settings</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>Settings</h1>
        </div>
            <div className='handleSettings__setting'>

               <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Store</h2>
                    <p>Turn on or turn off your store pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                 
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={store}
                    onChange={() => handleOptions('store')}
                    name="store"
                  />
                   </div>
            </div>

            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Slider</h2>
                    <p>Turn on or turn off your Slider pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={slider}
                    onChange={() => handleOptions('slider')}
                    name="slider"
                  />
                   </div>
            </div>

            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Cover Image</h2>
                    <p>Use Cover image instead of slider (Note: Please turn off cover image if you want to show Photo Slider)  </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={cover}
                    onChange={() => handleOptions('cover')}
                    name="cover"
                  />
                   </div>
            </div>

            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Feedback Section</h2>
                    <p>Turn on or turn off your Feedback pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={feedback}
                    onChange={() => handleOptions('feedback')}
                    name="feedback"
                  />
                   </div>
            </div>


            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Discount Section</h2>
                    <p>Turn on or turn off your discount section pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={discount}
                    onChange={() => handleOptions('discount')}
                    name="discount"
                  />
                   </div>
            </div>


            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Cash on delivery</h2>
                    <p>Turn on or turn off your Cash on delivery pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={cashOnDel}
                    onChange={() => handleOptions('cashOnDel')}
                    name="cashOnDel"
                  />
                   </div>
            </div>



            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Online Payment</h2>
                    <p>Turn on or turn off your Online payment pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={onlinePay}
                    onChange={() => handleOptions('onlinePay')}
                    name="onlinePay"
                  />
                   </div>
            </div>




            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Take Away</h2>
                    <p>Turn on or turn off your Take Away pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={takeAway}
                    onChange={() => handleOptions('takeAway')}
                    name="takeAway"
                  />
                   </div>
            </div>



            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Photo Gallery</h2>
                    <p>Turn on or turn off your Photo Gallery pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={photoGallery}
                    onChange={() => handleOptions('photoGallery')}
                    name="photoGallery"
                  />
                   </div>
            </div>



            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>About Us Page</h2>
                    <p>Turn on or turn off your About Us pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={aboutUs}
                    onChange={() => handleOptions('aboutUs')}
                    name="aboutUs"
                  />
                   </div>
            </div>



            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Chat Channels</h2>
                    <p>Turn on or turn off your Chat Channels pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={chatChannels}
                    onChange={() => handleOptions('chatChannels')}
                    name="chatChannels"
                  />
                   </div>
            </div>



            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>User Authentication</h2>
                    <p>Turn on or turn off your User Authentication pluglin,based on your requirements </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={userAuth}
                    onChange={() => handleOptions('userAuth')}
                    name="userAuth"
                  />
                   </div>
            </div>
        


            </div>
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
                           <h1>Manage Your Settings</h1>
                           <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
                     
                            <div className='site_preview--getStarted' onClick={handleGetStarted}>
                               Get Started
                            </div>
                        </div>

                        <div className='site_preview--topContainer--right'>
                             <img src={SettingsSvg} style={{fill:"#FFFFFF"}} />
                        </div>
                </div>
             </div>
             <div className='guide__learn--more'>
                 Learn More
            </div>
             <div className='site_preview--guide'>
                <div className='site_preview--guide--left'>
                <img src={SettingsSvg} style={{fill:"#FFFFFF"}} />
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
                </div>
                <div className='site_preview--guide--right'>
                  <iframe src={single_guides.settings} />
                </div>
            </div>
            </div>
           )}
        </div>
    )
}

export default HandleSettings
