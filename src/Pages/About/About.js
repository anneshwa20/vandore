import { Avatar, Box, Modal, Typography, withStyles} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import Sidebar from '../../components/Sidebar/Sidebar';
import Social from '../../components/Social/Social';
import PropTypes from 'prop-types';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './About.scss'
import firebase from 'firebase';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import { Fastfood, Home, PeopleAltOutlined, PhotoAlbum, Store } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';



function About({pageId}) {
    const [name,setName]= useState('');
    const [value,setValue]= useState(1);
    const [phone,setPhone]= useState('');
    const [message, setMessage]= useState('');
    const [image,setImage]= useState('');
    const [userImage,setUserImage]= useState('');
    const [about,setAbout]= useState('');
    const [{site_settings,site_colors,site_info,user,user_details,sidebar,brand},dispatch]= useStateValue();
    const [open,setOpen]= useState(false);
    

   const history= useHistory();

    useEffect(() => {
        
            db.collection(pageId).doc('about').collection("about").doc('about_site')
            .get()
            .then(function(doc) {
              if (doc.exists) {
                   setAbout(doc.data().about);
                   setImage(doc.data().image);
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });
        
         },[])

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
          }).then(() => setOpen(true));
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
          }).then(() => setOpen(true));
        }
}
    const StyledRating = withStyles({
      iconFilled: {
        color: `${site_colors.icons}`,
      },
      iconHover: {
        color: `${site_colors.icons}`,
      },
    })(Rating);
    
    const customIcons = {
      1: {
        icon: <SentimentVeryDissatisfiedIcon style={{width: '40px',height: '40px'}}/>,
        label: 'Very Dissatisfied',
      },
      2: {
        icon: <SentimentDissatisfiedIcon style={{width: '40px',height: '40px'}}/>,
        label: 'Dissatisfied',
      },
      3: {
        icon: <SentimentSatisfiedIcon style={{width: '40px',height: '40px'}}/>,
        label: 'Neutral',
      },
      4: {
        icon: <SentimentSatisfiedAltIcon style={{width: '40px',height: '40px'}}/>,
        label: 'Satisfied',
      },
      5: {
        icon: <SentimentVerySatisfiedIcon style={{width: '40px',height: '40px'}}/>,
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

    if(!site_settings.aboutUs){
      history.push(`/${pageId}`);
    }
  

    return (
        <div className='about'>
              <Sidebar page='About Us' pageId={pageId}/>
              <div className='aboutMobile'>
              {sidebar ? <SidebarMobile pageId={pageId}/> : (
                <div className='about__page'>
                {/*         <div className='shortNav' >
             <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/home`)}>
            <Home style={{color: `${site_colors.icons}`}}/>
            <p>Home</p>
            </div>
            {site_settings.photoGallery ? (
            <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/gallery`)}>
            <PhotoAlbum style={{color: `${site_colors.icons}`}}/>
            <p>Gallery</p>
            </div>
            ) : ''}
           
            {user && site_settings.userAuth? (
                <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/orders`)}>
                <Fastfood style={{color: `${site_colors.icons}`}}/>
                <p>Orders</p>
            </div>
            )
             : ''}
            
          {site_settings.store ? (
            <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/store`)}>
            <Store style={{color: `${site_colors.icons}`}}/>
            <p>Store</p>
            </div>
          ) : ''}

           {site_settings.userAuth && user ? (
        <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/user`)}>
        <Avatar src={user_details.image}  style={{width: '40px',height: '40px',alignSelf:'center',margin: '5px'}}/>
        <p>Your Profile</p>
        </div>
           ) : (
            <div className='shortNavItem' onClick={() => history.push(`/vandore/${pageId}/login`)}>
            <PeopleAltOutlined style={{color: `${site_colors.icons}`}}/>
            <p>Login</p>
            </div>
           )}
           

        </div> */}
              <div className='about__image' style={{backgroundColor: `${site_colors.primary}`}}>
                  <img src={image} />
              </div>
              <h1>About Us</h1>
              <div className='about__desc'>
                  <p>{about}</p>
              </div>
            
             
              </div>
              )}
             </div>
             <div className='aboutPc'>
             <div className='about__page'>
              <div className='about__image' style={{backgroundColor: `${site_colors.primary}`}}>
                  <img src={image} />
              </div>
              <h1>About Us</h1>
              <div className='about__desc'>
                  <p>{about}</p>
              </div>
             
             
             
              </div>
             </div>
            <Social />

            <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
        <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: '#f0c14b'}}>
          Your feedback was submitted
        </div>
        <div className='modal__button' style={{margin: '10px auto', backgroundColor: '#3E67D0',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '12px'}} onClick={()=> setOpen(false)}>
          Okay
        </div>
    </div>
 
</Modal>
        </div>
    )
}

export default About
