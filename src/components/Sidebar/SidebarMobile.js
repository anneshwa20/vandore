import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import './SidebarMobile.scss';
import SidebarRow from './../SidebarRow/SidebarRow';
import Leftqoute from '../../icons/lq.svg';
import Rightqoute from '../../icons/rq.svg';
import firebase from 'firebase';
import axios from '../../axios';


import { LocalHospital,EmojiFlags,People,Chat,Storefront,VideoLibrary,ExpandMoreOutlined, Home, Fastfood, AccountCircle, ExitToApp} from '@material-ui/icons'
import { authMain, db } from '../../firebase';
import { Avatar, Box, Modal, Typography, withStyles } from '@material-ui/core';
import { useStateValue } from '../../StateProvider';



function SidebarMobile({page,pageId}) {
  const history= useHistory();
  const [show,setShow]=useState(false);
  const [siteDescription,setSiteDescription]= useState('');
  const [currentFeedback,setCurrentFeedback]= useState({});
  const [siteKeyword,setSiteKeyword]= useState('');
  const [siteName,setSiteName]= useState('');
  const [facebookLink,setFacebookLink]= useState('');
  const [zomatoLink,setZomatoLink]= useState('');
  const [swiggyLink,setSwiggyLink]= useState('');
  const [{site_settings,site_colors,user,user_details,sidebar,site_info,brand},dispatch]= useStateValue();
  const [youtubeLink,setYoutubeLink]= useState('');
  const [feedbacks,setFeedbacks]= useState([]);
  const [open,setOpen]= useState(false);
  const [openRate,setOpenRate]= useState(false);
  const [name,setName]= useState('');
  const [value,setValue]= useState(1);
  const [phone,setPhone]= useState('');
  const [message, setMessage]= useState('');
  const [image,setImage]= useState('');

  const AutoplaySlider= withAutoplay(AwesomeSlider);



  
  const sendSMS= async () => {
    var messageUser= '';
  
     if(value > 3) {
        messageUser='Thank you for feedback.';
     }
     else if(value < 3) {
       messageUser= 'sorry for the inconvinience';
     }
     else{
       messageUser =`we will try to improve it.`;
     }
  
   const SMS = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits
        url: `/orderSMS?phone=${user_details.phone}&message=${messageUser}`
    });
     }
  
     const sendEmail= async (mode) => {
     
      var messageUser= '';
  
      if(value > 3) {
         messageUser='Thank you for feedback.';
      }
      else if(value < 3) {
        messageUser= 'sorry for the inconvinience';
      }
      else{
        messageUser =`we will try to improve it.`;
      }
   const EMAIL = await axios({
        method: 'post',
        
        url: `/feedbackEmail?email=ap8335235@gmail.com&message=${messageUser}&business=${site_info.siteName}&subject=Thanks From ${site_info.siteName}`
    });
  }
  

  const StyledRating = withStyles({
    iconFilled: {
      color: `${site_colors.icons}`,
    },
    iconHover: {
      color: `${site_colors.icons}`,
    },
  })(Rating);

  const handleAuthentication= () => {
    if(user){
        authMain.signOut();
    }
}
  
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon style={{width: '20px',height: '20px'}}/>,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon style={{width: '20px',height: '20px'}}/>,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon style={{width: '20px',height: '20px'}}/>,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon style={{width: '20px',height: '20px'}}/>,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon style={{width: '20px',height: '20px'}}/>,
      label: 'Very Satisfied',
    },
  };
  
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };


  useEffect(() => {
        
    db.collection(pageId).doc('social').collection("social").doc('social_links')
    .get()
    .then(function(doc) {
      if (doc.exists) {
           setFacebookLink(doc.data().facebookLink);
           setZomatoLink(doc.data().zomatoLink);
           setSwiggyLink(doc.data().swiggyLink);
           setYoutubeLink(doc.data().youtubeLink);
           
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

 },[])

 useEffect(() => {
  
  db.collection(pageId).doc('messages').collection('messages')
  .orderBy('timestamp','desc')
  .limit(5)
  .onSnapshot(snapshot => (
      setFeedbacks(snapshot.docs.map(doc => ({
          id: doc.id,
          message: doc.data().message,
          name: doc.data().name,
          phone: doc.data().phone,
          image: doc.data().image,
          rating: doc.data().rating
      })))
  ))
 
  },[])

 const handleExternal= (external) => {
   if(external==='zomato'){
    window.location.href = zomatoLink;
   }else {
    window.location.href = swiggyLink;
   }
 }



  const [channels,setChannels]= useState([]);


 

  useEffect(() => {
     db.collection(pageId).doc('rooms').collection('rooms').onSnapshot(snapshot => (
         setChannels(
             snapshot.docs.map(doc => ({
                 id: doc.id,
                 name: doc.data().name
             }))
         )
     ))
  },[]);
  const handleUser= () => {
    dispatch({
      type: 'UPDATE_SIDEBAR',
      sidebar: !sidebar
  })
  history.push(`/vandore/${pageId}/user`);
  
  }

  const handleHome= () => {
    dispatch({
      type: 'UPDATE_SIDEBAR',
      sidebar: !sidebar
  })
  history.push(`/vandore/${pageId}/home`);
  
  }
  const handleOrders= () => {
    dispatch({
      type: 'UPDATE_SIDEBAR',
      sidebar: !sidebar
  })
  history.push(`/vandore/${pageId}/orders`);
  
  }

  const handleAbout= () => {
    dispatch({
      type: 'UPDATE_SIDEBAR',
      sidebar: !sidebar
  })
  history.push(`/vandore/${pageId}/about`);
  
  }
  const handleStore= () => {
    dispatch({
      type: 'UPDATE_SIDEBAR',
      sidebar: !sidebar
  })
  history.push(`/vandore/${pageId}/store`);
  
  }
  const handleGallery= () => {
    dispatch({
      type: 'UPDATE_SIDEBAR',
      sidebar: !sidebar
  })
  history.push(`/vandore/${pageId}/gallery`);
  
  }
  const handleLogin= () => {
    dispatch({
      type: 'UPDATE_SIDEBAR',
      sidebar: !sidebar
  })
  history.push(`/vandore/${pageId}/login`);
  
  }
  const handleSubmit= (e) => {
    e.preventDefault();

    if(user){

      db.collection(pageId).doc('messages').collection('messages')
      .doc()
      .set({
         name: user_details.name,
         phone: user_details.phone,
         message: message,
         image: user_details.image,
         rating: value,
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => setOpenRate(false));


      if(site_settings.feedbackMessage && brand.plan !== 'free'){
        sendSMS();
      }
      if(site_settings.feedbackEmail && brand.plan !== 'free'){
        sendEmail();
      }
    }else{
      db.collection(pageId).doc('messages').collection('messages')
      .doc()
      .set({
         name: name,
         image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png',
         phone: phone,
         message: message,
         rating: value,
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => setOpenRate(false));
    }
}

    return (
        <div className="sidebarMobile">
          {/* {youtubeLink==='' ? '' : (
        <div className='sidebar__youtube' >
        <iframe  src={youtubeLink} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div> 
          )} */}
            
 
        <div className='sidebar__option'>
        <div onClick={handleHome}>
        <SidebarRow Icon={Home} title="Home" page={page}/>
        </div>
        {!user ? '' : (
             <div onClick={handleOrders}>
             {site_settings.userAuth && brand.plan !== 'lite' ? <SidebarRow Icon={Fastfood} title="Your Orders" page={page}/> : ''}
             </div>
        )}
         {!user ? '' : (
             <div onClick={handleUser}>
             {site_settings.userAuth ? <SidebarRow src={user_details.image} title="Your Profile" page={page}/> : ''}
             </div>
        )}

        
       
          {site_settings.aboutUs ? (
        <div onClick={handleAbout}>
        <SidebarRow Icon={EmojiFlags} title="About Us" page={page}/>
        </div>
          ) : ''}
       
        {site_settings.chatChannels && brand.plan === 'gold' ? (
        <div onClick={() => setShow(!show)}>
        <SidebarRow Icon={Chat} title="Chat With Us" page={page}/>
        </div>
        ) : ''}
          
             
                {show ? channels.map(channel => (
                    <div onClick={() => {
                      dispatch({
                        type: 'UPDATE_SIDEBAR',
                        sidebar: !sidebar
                      })
                      history.push(`/chatsPublic/${pageId}/${channel.id}`)}} page={page}>
                   <SidebarRow  title={`# ${channel.name}`} />
                   </div>
               )) : ''}
            {site_settings.store && brand.plan !== 'lite' ? (
              <div onClick={handleStore} >
          <SidebarRow Icon={Storefront} title="Store" page={page}/>
              </div> 
            ) : ''}
          
           {site_settings.photoGallery ? (
                   <div onClick={handleGallery} >
                   <SidebarRow Icon={VideoLibrary} title="Photo Gallery" page={page}/>
                   </div>
           ) : ''}
             
             {site_settings.userAuth ? (
            <>
          {!user ? 
          (
            <div onClick={handleLogin}>
              <SidebarRow Icon={AccountCircle} title="Login" page={page}/>
            </div>
          )
           : 
           (
            <div onClick={handleAuthentication}>
            <SidebarRow Icon={ExitToApp} title="Logout" page={page}/>
          </div>
           )}
            </>
        )  : '' }
         </div>
          {site_settings.feedback ? (
 <div className='sidebar__ratings'>
 <div className='sidebar__ratings--bottom' onClick={() => setOpenRate(!openRate)} style={{width: '100%',height: 'max-content',padding: '5px',display: 'flex',justifyContent: 'center',color: 'white', backgroundColor: `${site_colors.primary}`,cursor: 'pointer'}}>
  Rate Us Now
 </div>  
 {openRate ? (
    <>
    {site_settings.feedback ? (
      <form className='rateForm'>
      <h1>Rate Us</h1>
          {!user ? (
         <>
         <div className='user__input'>
                <p>Enter Your Name</p>
                <div className='user__input--style' style={{borderColor: `${site_colors.primary}`}}>
                    <input type='text'  placeholder='Enter Your Name' value={name} onChange={e => setName(e.target.value)}/>
                </div>
            </div>
     
            <div className='user__input'>
                <p>Enter Your Phone</p>
                <div className='user__input--style' style={{borderColor: `${site_colors.primary}`}}>
                    <input type='text'  placeholder='Enter Your Phone' value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
            </div>
         </>
          ) : (
            <>
            <Avatar src={user_details.image} style={{width: '50px',height: '50px',marginTop: '15px',marginBottom: '15px'}}/> 
            </>
          )}
            
     
            <div className='user__input'>
                <p>Enter Your Feedback</p>
                <div className='user__input--style' style={{borderColor: `${site_colors.primary}`}}>
                    <input type='text'  placeholder='Enter Your Feedback'  value={message} onChange={e => setMessage(e.target.value)} />
                </div>
            </div>
            <div>
           
             
             <StyledRating
               name="customized-icons"
     
               value={value}
               onChange={(event, newValue) => {
                
                 setValue(newValue);
               }}
               getLabelText={(value) => customIcons[value].label}
               IconContainerComponent={IconContainer}
             />
         
            </div>
     
     
            <button onClick={handleSubmit} style={{backgroundColor: `${site_colors.button}`,color: 'white'}}>Save</button>
           
             </form>
                 ) : ''}
                 </>
  ) : (
     <AutoplaySlider
     play={true}
     cancelOnInteraction={false} // should stop playing on user interaction
     interval={3000}
     animation='cubeAnimation'
 >
         {feedbacks.map((feedback,key) => (
            <div className='sidebar__feedback'>
                <div className='sidebar__feedback--top' style={{borderBottom: `2px solid ${site_colors.primary}`,borderTop: `2px solid${site_colors.primary}`}}>
                    <Avatar src={feedback.image} style={{marginRight: '15px'}}/> 
                    <div className='sidebar__feedback--topRight'>
                     <h4 style={{fontWeight: 'lighter'}}>{feedback.name}</h4>
                    <StyledRating
                              name="customized-icons"

                              value={feedback.rating}
                              
                              getLabelText={(value) => customIcons[value].label}
                              IconContainerComponent={IconContainer}
                              readOnly
                            />

                    </div>
                    </div>

                    <div className='sidebar__feedback--bottom'>
                    <img src={Leftqoute} style={{width: '20px',height: '20px'}}/>
                    <p style={{padding: '5px'}}>{feedback.message.substr(0,60)}</p> <span onClick={() => { setOpen(true); setCurrentFeedback({image: feedback.image,name: feedback.name,rating: feedback.rating,message: feedback.message})}}  style={{color: 'blue', textDecoration: 'underline',cursor: 'pointer'}}>see more</span>
                     <img src={Rightqoute} style={{width: '20px',height: '20px'}}/>

                    </div>
                </div>
        
         ))}
</AutoplaySlider> 
  )}  
 </div>
          ) : ''}
        
   
        {openRate ? '' : (
 <div className='external' style={{marginTop: '70px'}}>
 {zomatoLink==='' ? '' : (
  <div className='external__option' onClick={() => handleExternal('zomato')}>
   <SidebarRow src='data:image/png;base64,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' title="Order with zomato"/>
   </div>
 )}
 {swiggyLink==='' ? '' : (
    <div className='external__option' onClick={() => handleExternal('swiggy')}>
    <SidebarRow src='https://www.theindianwire.com/wp-content/uploads/2017/07/swiggy-logo.png' title="Order with swiggy"/>
    </div>
 )}
  
   
</div>  
    )}
         <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
<div className='sidebar__feedback' style={{width: '500px',height: '400px'}}>
       <div className='sidebar__feedback--top' style={{borderBottom: `2px solid ${site_colors.primary}`,borderTop: `2px solid${site_colors.primary}`}}>
                                  <Avatar src={currentFeedback?.image} style={{marginRight: '15px'}}/> 
                                  <div className='sidebar__feedback--topRight'>
                                   <h4 style={{fontWeight: 'lighter'}}>{currentFeedback?.name}</h4>
                                  <StyledRating
                                            name="customized-icons"

                                            value={currentFeedback?.rating}
                                            
                                            getLabelText={(value) => customIcons[value].label}
                                            IconContainerComponent={IconContainer}
                                            readOnly
                                          />
    
                                  </div>
                                  </div>

                                  <div className='sidebar__feedback--bottom'>
                                  <img src={Leftqoute} style={{width: '20px',height: '20px'}}/>
                                  <p style={{padding: '10px'}}>{currentFeedback.message ? currentFeedback.message : ''}</p> 
                                   <img src={Rightqoute} style={{width: '20px',height: '20px'}}/>

                                  </div>
        </div>
 
</Modal>
          
        </div>
    )
}

export default SidebarMobile
