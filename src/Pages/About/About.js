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



function About() {
    const [name,setName]= useState('');
    const [value,setValue]= useState(1);
    const [phone,setPhone]= useState('');
    const [message, setMessage]= useState('');
    const [image,setImage]= useState('');
    const [userImage,setUserImage]= useState('');
    const [about,setAbout]= useState('');
    const [{site_settings,site_colors,site_info,user,user_details,sidebar},dispatch]= useStateValue();
    const [open,setOpen]= useState(false);
    



    useEffect(() => {
        
            db.collection("about").doc('about_wtf')
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

          db.collection('messages')
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
          db.collection('messages')
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

    return (
        <div className='about'>
              <Sidebar page='About Us'/>
              <div className='aboutMobile'>
              {sidebar ? <SidebarMobile /> : (
                <div className='about__page'>
              <div className='about__image' style={{backgroundColor: `${site_colors.primary}`}}>
                  <img src={image} />
              </div>
              <h1>About Us</h1>
              <div className='about__desc'>
                  <p>{about}</p>
              </div>
            {site_settings.feedback ? (
 <form>
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
            {site_settings.feedback ? (
 <form>
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
