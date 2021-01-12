import { Switch } from '@material-ui/core'
import { Menu, SettingsOverscanRounded } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { authMain, db, dbMain } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './HandleSettings.scss';
import SettingsSvg from '../../icons/undraw_personal_settings_kihd.svg';
import { useHistory } from 'react-router-dom';

function HandleSettings({id}) {
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
    const [feedbackMessage,setFeedbackMessage]= useState(true);
    const [orderMessage,setOrderMessage]= useState(true);
    const [feedbackEmail,setFeedbackEmail]= useState(true);
    const [orderEmail,setOrderEmail]= useState(true);
    const[{site_settings,site_preview,single_guides,sidebarVandore,user_details,user},dispatch]= useStateValue();

      const pageId= id;

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
             setFeedbackMessage(site_settings.feedbackMessage);
             setOrderMessage(site_settings.orderMessage);
             setFeedbackEmail(site_settings.feedbackEmail);
             setOrderEmail(site_settings.orderEmail);

      },[site_settings])
   const history= useHistory();
   
   const handleDeleteAccount= () => {
    /*    dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
              businessActive: false
       })
       
       if(user){
              authMain.signOut();
        }
     
        history.push('/'); */
        
   }


   const handleDomain= () => {
          /* console.log('domaineeeeeeeeeeeeeeed'); */
       dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
              domainRequest: true
       });
       dbMain.collection("domain").add({
              user: user_details.name,
              phone: user_details.phone,
              email: user.email,
              image: user_details.image,
              business: user_details.business
       });
   }


    const handleGetStarted= () => {
       db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
           setting: true
       }).then(refreshPage);
   }
      const refreshPage = ()=>{
       window.location.reload();  }



    const handleOptions=  (name) =>{
           
       if(name === 'store'){
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
          else if(name === 'feedbackMessage'){
              
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
                     feedbackMessage: !feedbackMessage
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   feedbackMessage: !feedbackMessage
                            }
                     })
              ));
       }
       else if(name === 'orderMessage'){
              
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
                     orderMessage: !orderMessage
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   orderMessage: !orderMessage
                            }
                     })
              ));
       }

       else if(name === 'feedbackEmail'){
              
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
                     feedbackEmail: !feedbackEmail
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   feedbackEmail: !feedbackEmail
                            }
                     })
              ));
       }
       else if(name === 'orderEmail'){
              
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
                     orderEmail: !orderEmail
              }).then(() => (
                     dispatch({
                            type: 'UPDATE_SITE_SETTINGS',
                            data: {
                                   orderEmail: !orderEmail
                            }
                     })
              ));
       }
       else if(name === 'slider'){
              console.log('slider toggle');
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
                     slider: !slider
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
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
              db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_settings').update({
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
               <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
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
            <div className='dashboard__headerTitle' style={{marginLeft: '-15px'}}>
        Request Your Own Custom Domain
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',marginTop: '15px'}} onClick={handleDeleteAccount}>
    
    {user_details.domainActive ? (
       <>
       Your domain name is succesfully changed to ({user_details.domain}) from (vandore.in/{user_details.business}). Old vandore link is still active.
       </>
    ) : (
        <>
    {!user_details.domainRequest  ? ( <>You can now add your own custom domain (www.yourbrand.com) instead of using our free vandore domain ({`vandore.in/${user_details.business}`}) </>) 
    : 'You have requested for a domain change, our team will reach you shortly for domain change.'    
    }
       </>
    )}
    
   
        <div className='domainAccountButton' onClick={handleDomain}  style={{backgroundColor: `${user_details.domainRequest ? '#fcb603' : ''}`}}>
        {user_details.domainActive ? (
       <>
      Domain Name Succesfully Changed
       </>
    ) : (
        <>
    {user_details.domainRequest  ? ( <>Domain Name Requested</>) 
    : 'Request Custom Domain'    
    }
       </>
    )}
        </div>
     </div>

     <div className='dashboard__headerTitle' style={{marginLeft: '-15px'}}>
        Site SMS Settings
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',marginTop: '15px'}} >
     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna nunc id cursus metus aliquam eleifend mi in. Vestibulum sed arcu non odio euismod lacinia at quis.
     </div>
     <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Feedback Message</h2>
                    <p>Send Your Customers Automated messages based on their feedbacks </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                 
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={feedbackMessage}
                    onChange={() => handleOptions('feedbackMessage')}
                    name="feedbackMessage"
                  />
                   </div>
            </div>

            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Order Message</h2>
                    <p>Send Your Customers message on order confirmation/cancelletion</p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                 
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={orderMessage}
                    onChange={() => handleOptions('orderMessage')}
                    name="orderMessage"
                  />
                   </div>
            </div>


            <div className='dashboard__headerTitle' style={{marginLeft: '-15px'}}>
        Site EMAIL Settings
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',marginTop: '15px'}} >
     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna nunc id cursus metus aliquam eleifend mi in. Vestibulum sed arcu non odio euismod lacinia at quis.
     </div>
     <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Feedback Email</h2>
                    <p>Send Your Customers Automated Emails based on their feedbacks </p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                 
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={feedbackEmail}
                    onChange={() => handleOptions('feedbackEmail')}
                    name="feedbackEmail"
                  />
                   </div>
            </div>

            <div className='setting__option'>
                   <div className='setting__option--left'>
                    <h2>Order Email</h2>
                    <p>Send Your Customers Email on order confirmation/cancelletion</p>
                   </div>
                   <div className='setting__option--right'>
                    <Switch
                 
                   color='primary'
                   style={{color: 'rgba(66, 135, 245, 1)'}}
                    checked={orderEmail}
                    onChange={() => handleOptions('orderEmail')}
                    name="orderEmail"
                  />
                   </div>
            </div>




  <div className='dashboard__headerTitle' style={{marginLeft: '-15px'}}>
        Site General Settings
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',marginTop: '15px'}} >
     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna nunc id cursus metus aliquam eleifend mi in. Vestibulum sed arcu non odio euismod lacinia at quis.
     </div>

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
     <div className='dashboard__headerTitle'  style={{marginLeft: '-13px'}}>
        Delete Your Vandore Account
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white'}} >
        After deleting Your Account, All Your Vandore Data Will be deleted Automatically and Your Can't Accessed it Later on
        <div className='deleteAccountButton' onClick={handleDeleteAccount}>
               Delete Account
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
                           <h3>Settings helps in controlling and customising the website features at its best.</h3>
                     
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
                <h4>Settings helps in controlling and customising the website features at its best.</h4>
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
