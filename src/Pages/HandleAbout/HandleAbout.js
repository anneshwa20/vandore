import React, { useEffect, useState } from 'react'
import { db, firebaseApp } from '../../firebase';
import './HandleAbout.scss'
import FileUploader from 'react-firebase-file-uploader';
import { AddAPhoto, Edit, Menu } from '@material-ui/icons';
import { useStateValue } from '../../StateProvider';
import { useHistory } from 'react-router-dom';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import { Modal } from '@material-ui/core';
import AboutSvg from '../../icons/undraw_newspaper_k72w.svg';

function HandleAbout({id}) {
    const [currImage,setCurrImage]= useState('');
    const [currAbout,setCurrAbout]= useState('');
    const [openAlert,setOpenAlert]= useState(false);
    const [openImage,setOpenImage]= useState(false);

    const [{site_settings,single_guides,site_preview,sidebarVandore},dispatch]= useStateValue();
    const history= useHistory();
    const pageId= id;
    const handleGetStarted= () => {
      db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
          about: true
      }).then(refreshPage);
  }
  const refreshPage = ()=>{
      window.location.reload();  }
   
   const [open,setOpen]= useState(false);
   const [currentVideo,setCurrentVideo]= useState('');
   const manageVideo= (link) => {
    setOpen(true);
    setCurrentVideo(link);
  }
    const[edit,setEdit]= useState(false);


    useEffect(() => {
        
        db.collection(pageId.toUpperCase()).doc('about').collection("about").doc('about_site')
        .get()
        .then(function(doc) {
          if (doc.exists) {
               setCurrAbout(doc.data().about);
               setCurrImage(doc.data().image);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
    
     },[])

    const handleUploadStart= () => {
        setOpenImage(true);
    }

    const handleUploadSuccess= (filename) =>{
      
    
       firebaseApp.storage().ref('about').child(filename).getDownloadURL()
       .then(url => setCurrImage(url)).then(() => setOpenImage(false));
                     
        
       
     };

     const handleSubmit= (e) => {
         e.preventDefault();

         db.collection(pageId.toUpperCase()).doc('about').collection("about").doc('about_site').set({
           image: currImage,
           about: currAbout
       }).then(() => setOpenAlert(true)).then(() => setEdit(false));
     }


    return (
        <div className='handleAbout'>
          <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
           {site_preview.about ? (
            <>
               
               <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>About Us</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>About Us</h1>
        </div>
             <img src={currImage} />
             <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',marginTop: 20,display: 'flex',alignItems: 'center',width: 'max-content',margin: '0 auto'}}>
              Select Your Photo <AddAPhoto style={{paddingLeft: '10px'}} />
              <FileUploader
                hidden
                accept="image/*"
                randomizeFilename
                name="image"
                storageRef={firebaseApp.storage().ref("about")}
                onUploadStart={handleUploadStart}
                onUploadSuccess={handleUploadSuccess}
               />
               </label>
               <h1 className='handleAbout__title'>ABOUT US</h1>
             
             {!edit ? (
               <p className='handleAbout__about'>{currAbout}</p>
             ) : (
               <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                 <div className='handleAbout__input'>
                 <textarea  rows={5} cols={5} value={currAbout} onChange={e => setCurrAbout(e.target.value)} />
                </div>
                
                  <button onClick={handleSubmit}>submit</button>
              </div>
             )}
             {!edit ? (
             <label onClick={() => setEdit(true)} style={{backgroundColor: 'rgba(66, 135, 245, 0.8)', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',display: 'flex',alignItems: 'center',width: 'max-content',margin: '10px auto'}}>
            Change Text <Edit style={{paddingLeft: '10px'}}/>  
             </label>
             ) : ''}

<div className='guide_toast'>
            <p>{site_settings.aboutUs ? 
            'To turn off About Us, go to settings and disable About Us' : 
            'About Us is disabled, go to settings and enable About Us'}</p> 
            <div  style={{cursor: 'pointer'}} onClick={() => history.push(`/restro/settings/${pageId}`)}>Settings</div>
           </div>
           <div className='guide_tutorial_toast'>
            <p>
            If you face any difficulties regarding About Us, then see our About Us guides
            </p> 
            <div  onClick={() => manageVideo(single_guides.about)}>Guides</div>
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
                         <h1>Manage About Us Page</h1>
                         <h3>About helps the users to understand your business overview.</h3>
                   
                          <div className='site_preview--getStarted' onClick={handleGetStarted}>
                             Get Started
                          </div>
                      </div>

                      <div className='site_preview--topContainer--right'>
                           <img src={AboutSvg} style={{fill:"#FFFFFF"}} />
                      </div>
              </div>
           </div>
           <div className='guide__learn--more'>
               Learn More
          </div>
           <div className='site_preview--guide'>
              <div className='site_preview--guide--left'>
              <img src={AboutSvg} style={{fill:"#FFFFFF"}} />
              <h4>About helps the users to understand your business overview.</h4>
              </div>
              <div className='site_preview--guide--right'>
                <iframe src={single_guides.about} />
              </div>
          </div>
          </div>
           ) }
        </div>
    )
}

export default HandleAbout
