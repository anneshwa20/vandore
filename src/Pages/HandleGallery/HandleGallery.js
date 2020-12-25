import React, { useEffect, useState } from 'react'
import './HandleGallery.scss'
import FileUploader from 'react-firebase-file-uploader';
import { db, firebaseApp } from '../../firebase';
import { IconButton, Modal } from '@material-ui/core';
import { AddAPhoto, Delete, Menu, Save } from '@material-ui/icons';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useStateValue } from '../../StateProvider';
import { useHistory } from 'react-router-dom';
import GallerySvg from '../../icons/undraw_online_gallery_dmv3.svg';

function HandleGallery() {
    const [image,setImage]= useState('');
    const [images,setImages]= useState([]);
    const [show,setShow]= useState(false);
    const [{site_settings,single_guides,site_preview,sidebarVandore},dispatch]= useStateValue();

    const history= useHistory();
   const [open,setOpen]= useState(false);
   const [currentVideo,setCurrentVideo]= useState('');
   const manageVideo= (link) => {
    setOpen(true);
    setCurrentVideo(link);
  }

  const handleGetStarted= () => {
    db.collection('site').doc('site_preview').update({
        photoGallery: true
    }).then(refreshPage);
}
const refreshPage = ()=>{
    window.location.reload();  }

    
    useEffect(() => {
  
        db.collection('gallery')
        .onSnapshot(snapshot => (
            setImages(snapshot.docs.map(doc => ({
                id: doc.id,
                image: doc.data().image
            })))
        ))
       
        },[])
    
    const sliderDelete= (id) => {
        db.collection('gallery').doc(id).delete().then(alert('deleted'));
    }

    const handleUploadStart= () => {
        alert('UPLOAD STARTED')
    }

    const handleUploadSuccess= (filename) =>{
      
    
       firebaseApp.storage().ref('gallery').child(filename).getDownloadURL()
       .then(url => setImage(url)).then(() => setShow(true));
                     
        
       
     };

     const handleSubmit= () => {
         

         db.collection("gallery").add({
           image: image
       }).then(alert('Upload Finish')).then(() => setImage('')).then(() => setShow(false));
     }

    return (
        <div className='handleSlider'>
          {site_preview.photoGallery ? (
           <>
          <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>Gallery</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>Gallery</h1>
        </div>
           <div className='guide_toast'>
            <p>{site_settings.photoGallery ? 
            'To turn off Photo Gallery, go to settings and disable Photo gallery' : 
            'Photo gallery is disabled, go to settings and enable photo gallery'}</p> 
            <div  style={{cursor: 'pointer'}} onClick={() => history.push('/restro/settings')}>Settings</div>
           </div>
           <div className='guide_tutorial_toast'>
            <p>
            If you face any difficulties regarding photo gallery, then see our photo gallery guides
            </p> 
            <div onClick={() => manageVideo(single_guides.photoGallery)}>Guides</div>
           </div>
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
              Add New Photo <AddAPhoto style={{paddingLeft: '10px'}}/>
              <FileUploader
                hidden
                accept="image/*"
                randomizeFilename
                name="image"
                storageRef={firebaseApp.storage().ref("gallery")}
                onUploadStart={handleUploadStart}
                onUploadSuccess={handleUploadSuccess}
               />
               </label>
            )} 
    </div> 
               <div className='images__container'>
               {images.map(image => (
                   <div className='images__holder--gallery' style={{height: 'max-content'}}>
                    <Zoom>    <img src={image.image}  className='images__holder__image--gallery'/> </Zoom>  
                        <div className='gallery__delete' onClick={() => sliderDelete(image.id)}>
                            Remove
                           <Delete />
                        </div>
                    </div>
               ))}
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
          ): (
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
                           <h1>Photo Gallery</h1>
                           <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
                     
                            <div className='site_preview--getStarted' onClick={handleGetStarted}>
                               Get Started
                            </div>
                        </div>

                        <div className='site_preview--topContainer--right'>
                             <img src={GallerySvg} style={{fill:"#FFFFFF"}} />
                        </div>
                </div>
             </div>
             <div className='guide__learn--more'>
                 Learn More
            </div>
             <div className='site_preview--guide'>
                <div className='site_preview--guide--left'>
                <img src={GallerySvg} style={{fill:"#FFFFFF"}} />
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
                </div>
                <div className='site_preview--guide--right'>
                  <iframe src={single_guides.photoGallery} />
                </div>
            </div>
            </div>
          )}
        </div>
    )
}

export default HandleGallery
