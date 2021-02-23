import React, { useEffect, useState } from 'react'
import './HandleSlider.scss'
import FileUploader from 'react-firebase-file-uploader';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import { db, firebaseApp } from '../../firebase';
import { AddAPhoto, Delete, Menu, Save } from '@material-ui/icons';
import { IconButton, Modal } from '@material-ui/core';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import { useHistory } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import { useStateValue } from '../../StateProvider';
import SliderSvg from '../../icons/undraw_slider_5bgj.svg';


function HandleSlider({id}) {
    const [image,setImage]= useState('');
    const [images,setImages]= useState([]);
    const [show,setShow]= useState(false);
    const [openAlert,setOpenAlert]= useState(false);
    const [openImage,setOpenImage]= useState(false);
    const [{site_settings,single_guides,site_preview,sidebarVandore},dispatch]= useStateValue();
    const history= useHistory();
    const pageId=id;

    const [open,setOpen]= useState(false);
    const [currentVideo,setCurrentVideo]= useState('');

    const [openAlertDelete,setOpenAlertDelete]= useState(false);
    const [deleteMessage,setDeleteMessage]= useState('');
    const [deleteId,setDeleteId]= useState('');
    const openDeleteModal= (message,id) => {
        setDeleteMessage(message);
        setDeleteId(id);
        setOpenAlertDelete(true);
    }

    const manageVideo= (link) => {
     setOpen(true);
     setCurrentVideo(link);
   }

   const handleGetStarted= () => {
    db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
        slider: true
    }).then(refreshPage);
}
   const refreshPage = ()=>{
    window.location.reload();  }
 
    const AutoplaySlider= withAutoplay(AwesomeSlider);
    useEffect(() => {
  
     
            db.collection(pageId.toUpperCase()).doc('slider').collection('slider')
            .onSnapshot(snapshot => (
                setImages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    image: doc.data().image
                })))
            ))
       
  },[])
    
    const sliderDelete= (id) => {
        db.collection(pageId.toUpperCase()).doc('slider').collection('slider').doc(id).delete();
        setOpenAlertDelete(false);
    }

    const handleUploadStart= () => {
       setOpenImage(true);
    }

    const handleUploadSuccess= (filename) =>{
      
    
        firebaseApp.storage().ref('slider').child(filename).getDownloadURL()
        .then(url => setImage(url)).then(() => setOpenImage(false)).then(() => setShow(true));
                      
         
        
      };

     const handleSubmit= () => {
        

         db.collection(pageId.toUpperCase()).doc('slider').collection("slider").add({
           image: image
       }).then(() => setOpenAlert(true)).then(() => setImage('')).then(() => setShow(false));
     }

    return (
        <div className='handleSlider'>
            <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
     {site_preview.slider ? (
       <>
        <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>SLIDER</h1>
        </div>
       <div className='slider__container' style={{backgroundImage: `url(https://i.ibb.co/wS48xmr/i-Phone-X-XS-11-Pro-36-1.png)`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
         <h1>SLIDER</h1>
         <hr></hr>
            <div style={{textAlign: 'center',marginTop: 20,marginBottom: 20}}>
            {show ? (
                <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <img src={image} style={{width: 250,height: 200,marginBottom: 10,marginTop: 10}} />
               <label onClick={handleSubmit}  style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',display: 'flex',alignItems: 'center',width: 'max-content',margin: '0 auto'}}>
                 Save Photo <Save style={{paddingLeft: '10px'}}/>
                </label>
                </div>
    
            ): (
         <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',display: 'flex',alignItems: 'center',width: 'max-content',margin: '0 auto'}}>
              Add New Slider Photo <AddAPhoto style={{paddingLeft: '10px'}}/>
              <FileUploader
                hidden
                accept="image/*"
                randomizeFilename
                name="image"
                storageRef={firebaseApp.storage().ref("slider")}
                onUploadStart={handleUploadStart}
                onUploadSuccess={handleUploadSuccess}
               />
               </label>
            )} 
    </div> 

    {show ? (
   ''
    ) : (
        <div className='slide' style={{margin: '10px auto'}}>
          <div className='slide1Slider'>
          <AutoplaySlider
                   play={true}
                   cancelOnInteraction={false} // should stop playing on user interaction
                   interval={3000}
                   animation='cubeAnimation'
               >
                        {images.map((image,key) => (
                          <div key={key} style={{backgroundImage: `url(${image.image})`,backgroundSize: 'contain'}}>
                             
                          </div>
                       ))}
       </AutoplaySlider> 
          </div>
          <div className='slide2'>
          <AutoplaySlider
                   play={true}
                   cancelOnInteraction={false} // should stop playing on user interaction
                   interval={3000}
                   animation='cubeAnimation'
               >
                       {images.map((image,key) => (
                          <div key={key} style={{backgroundImage: `url(${image.image})`,backgroundSize: '900px 400px'}}>
                             
                          </div>
                       ))}
       </AutoplaySlider> 
       </div>
       
       </div>
    )}
   </div>


    <div className='images__container--slider'>
    {images.map(image => (
                   <div className='images__holder--gallery' style={{height: 'max-content'}}>
                   <Zoom>    <img src={image.image}  className='images__holder__image--gallery'/> </Zoom>  
                       <div className='gallery__delete' onClick={() => openDeleteModal('this slider photo',image.id)}>
                           Remove
                          <Delete />
                       </div>
                   </div>
               ))}
        </div> 
         
       <div className='guide_toast'>
            <p>{site_settings.slider ? 
            'To turn off Slider, go to settings and disable Slider' : 
            'Slider is disabled, go to settings and enable Slider'}</p> 
            <div  style={{cursor: 'pointer'}} onClick={() => history.push(`/restro/settings/${pageId}`)}>Settings</div>
           </div>
           <div className='guide_tutorial_toast'>
            <p>
            If you face any difficulties regarding Slider, then see our Slider guides
            </p> 
            <div onClick={() => manageVideo(single_guides.slider)}>Guides</div>
           </div>  
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
        <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '10px'}} onClick={()=> setOpenAlert(false)}>
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

<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={openAlertDelete}
onClose={() => setOpenAlertDelete(false)}
aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
   Do You Want to Delete {deleteMessage} ?
 </div>
 <div style={{display: 'flex',justifyContent: 'space-around'}}>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={() => sliderDelete(deleteId)}>
   yes
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={()=> {setOpenAlertDelete(false); setDeleteMessage(''); setDeleteId('')}}>
   no
 </div>
 </div>
</div>
</Modal>

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
                           <h1>Slider</h1>
                           <h3>Slider helps you presenting your business value in different ways.</h3>
                     
                            <div className='site_preview--getStarted' onClick={handleGetStarted}>
                               Get Started
                            </div>
                        </div>

                        <div className='site_preview--topContainer--right'>
                             <img src={SliderSvg} style={{fill:"#FFFFFF"}} />
                        </div>
                </div>
             </div>
             <div className='guide__learn--more'>
                 Learn More
            </div>
             <div className='site_preview--guide'>
                <div className='site_preview--guide--left'>
                <img src={SliderSvg} style={{fill:"#FFFFFF"}} />
                <h4>Slider helps you presenting your business value in different ways.</h4>
                </div>
                <div className='site_preview--guide--right'>
                  <iframe src={single_guides.slider} />
                </div>
            </div>
            </div>
     )}
        </div>
    )
}

export default HandleSlider
