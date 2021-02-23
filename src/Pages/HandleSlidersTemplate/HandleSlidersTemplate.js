import React, { useState,useEffect } from 'react'
import { db, firebaseApp } from '../../firebase';
import './HandleSlidersTemplate.scss'
import firebase from 'firebase';

import { AddAPhoto, Facebook, FolderShared, Menu, Save, Visibility, WhatsApp } from '@material-ui/icons';

import { useStateValue } from '../../StateProvider';
import { Modal } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TemplateSvg from '../../icons/undraw_asset_selection_ix3v.svg';
import Slider1 from '../../Templates/Sliders/Slider1/Slider1';
import Slider2 from '../../Templates/Sliders/Slider2/Slider2';
import Slider3 from '../../Templates/Sliders/Slider3/Slider3';
import Post1 from '../../Templates/Posts/Post1/Post1';
import Post2 from '../../Templates/Posts/Post2/Post2';
import Post3 from '../../Templates/Posts/Post3/Post3';


function HandleSlidersTemplate({id}) {
   
   const [message,setMessage]= useState('');
   const [image, setImage]= useState('');
   const [openAlert,setOpenAlert]= useState(false);
   const [openImage,setOpenImage]= useState(false);
   const [show,setShow]= useState(false);
  
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
        template: true
    }).then(refreshPage);
}
const refreshPage = ()=>{
    window.location.reload();  }


    



   

  

    return (
        <div className='handleSlidersTemplate'>
          <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
     {site_preview.template ? (
       <>
           <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>Templates</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>TEMPLATES</h1>
        </div>
    <div className='guide_tutorial_toast'>
     <p>
     If you face any difficulties regarding  TEMPLATES, then see our Templates guides
     </p> 
     <div onClick={() => manageVideo(single_guides.template)}>Guides</div>
    </div>



    <div className='dashboard__headerTitle' >
      Sliders Templates
        <hr></hr>
 </div>
 <div className='deleteAccount' style={{color:'white',marginLeft: '30px'}} >
    Now you can edit our readymade slider templates and post them into your vandore/social media feed
   </div>


    <div className='handleSlidersTemplate--sliders'>
        
        <div className='templateHolder'>
           <img src='https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/templates%2FScreenshot%20(357).png?alt=media&token=30fad37b-f53a-49bd-8f89-393182941772'/>
           <div onClick={() => history.push(`/componentTemplate/${pageId}/slider1`)}>Edit</div>
        </div>

        <div className='templateHolder'>
           <img src='https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/templates%2FScreenshot%20(358).png?alt=media&token=d7690315-07b6-432a-aea1-7163baa4b71b'/>
           <div onClick={() => history.push(`/componentTemplate/${pageId}/slider2`)}>Edit</div>
        </div>

        <div className='templateHolder'>
           <img src='https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/templates%2Fcomponent(30).jpg?alt=media&token=c808e37f-8b0c-4880-9147-f76d88e8da81'/>
           <div onClick={() => history.push(`/componentTemplate/${pageId}/slider3`)}>Edit</div>
        </div>
        
    </div>


    <div className='dashboard__headerTitle' >
      Post Templates
        <hr></hr>
 </div>
     <div className='deleteAccount' style={{color:'white',marginLeft: '30px'}} >
    Now you can edit our readymade post templates and post them into your vandore/social media feed
   </div>

   <div className='handleSlidersTemplate--sliders'>

        <div className='templateHolderPost'>
           <img src='https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/templates%2Fcomponent(29).jpg?alt=media&token=9d92a5ba-f5e7-47f6-94ff-9efc51c8580b'/>
           <div onClick={() => history.push(`/componentTemplate/${pageId}/post1`)}>Edit</div>
        </div>

        <div className='templateHolderPost'>
           <img src='https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/templates%2FScreenshot%20(364).png?alt=media&token=c2ace24a-716f-4dd1-892b-7b4e363e4df0'/>
           <div onClick={() => history.push(`/componentTemplate/${pageId}/post2`)}>Edit</div>
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
                   <h1>Templates</h1>
                   <h3>Vandore offers striking templates to drive the customers through it.</h3>
             
                    <div className='site_preview--getStarted' onClick={handleGetStarted}>
                       Get Started
                    </div>
                </div>

                <div className='site_preview--topContainer--right'>
                     <img src={TemplateSvg} style={{fill:"#FFFFFF"}} />
                </div>
        </div>
     </div>
     <div className='guide__learn--more'>
         Learn More
    </div>
     <div className='site_preview--guide'>
        <div className='site_preview--guide--left'>
        <img src={TemplateSvg} style={{fill:"#FFFFFF"}} />
        <h4>Vandore offers striking templates to drive the customers through it.</h4>
        </div>
        <div className='site_preview--guide--right'>
          <iframe src={single_guides.template} />
        </div>
    </div>
    </div>
     )}

        </div>
    )
}

export default HandleSlidersTemplate
