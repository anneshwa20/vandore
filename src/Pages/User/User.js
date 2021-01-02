import { Avatar, Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { db, dbMain, firebaseApp, firebaseAppMain } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import 'firebase/storage';
import './User.scss';
import FileUploader from 'react-firebase-file-uploader';
import Social from '../../components/Social/Social';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import { useHistory } from 'react-router-dom';
import { Fastfood, Home, PeopleAltOutlined, PhotoAlbum, Store } from '@material-ui/icons';

function User({pageId}) {
    const [{user,site_colors,sidebar,site_settings,user_details},dispatch]= useStateValue();
    const [phone,setPhone]= useState('');
    const [name,setName]= useState('');
    const [address,setAddress]= useState('');
    const [image,setImage]= useState('');
    const [open,setOpen]= useState(false);
    const [openImage,setOpenImage]= useState(false);

    const history= useHistory();

    useEffect(() => {
        if(user){
            db.collection(pageId).doc('users').collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                   setPhone(doc.data().phone);
                   setName(doc.data().name);
                   setAddress(doc.data().address);
                   setImage(doc.data().image);
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });
        }else{
           console.log('ERROR')
        }
         },[user])

         const handleUploadStart= () => {
             setOpenImage(true);
         }

         const handleUploadSuccess= (filename) =>{
           
         
            firebaseAppMain.storage().ref('users').child(filename).getDownloadURL()
            .then(url => setImage(url)).then(() =>setOpenImage(false));
                          
             
            
          };

          const handleSubmit= (e) => {
              e.preventDefault();

              db.collection(pageId).doc('users').collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
                name: name,
                image: image,
                address: address,
                phone: phone
            });

            db.collection(pageId).doc('userList').collection("userList").doc(user.uid).update({
                name: name,
                image: image,
                address: address,
                phone: phone
            });

            dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
                name: name,
                image: image,
                address: address,
                phone: phone
            });

            dbMain.collection("userList").doc(user.uid).update({
                name: name,
                image: image,
                address: address,
                phone: phone
            }).then(() => setOpen(true));


             dispatch({
                 type: 'UPDATE_USER',
                 user_details: {
                     active: true,
                     address: address,
                     name: name,
                     image: image,
                     phone: phone
                 }
             });

             

          }

    return (
        <div className='user'>
            <Sidebar pageId={pageId} />
            <div className='userMobile'>
           {sidebar ? <SidebarMobile pageId={pageId} /> : (
                 <div className='user__page'>
                         <div className='shortNav' >
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
           

        </div>
                 <div className='user__details' style={{backgroundColor: `white`}}>
                     <Avatar src={image} className='user__dp' />
                     <label style={{backgroundColor: `${site_colors.button}`, color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
                     Select Your Photo
                     <FileUploader
                       hidden
                       accept="image/*"
                       randomizeFilename
                       name="image"
                       storageRef={firebaseAppMain.storage().ref("users")}
                       onUploadStart={handleUploadStart}
                       onUploadSuccess={handleUploadSuccess}
                      />
                      </label>
                  </div>
             
                  <h1>Personal Details</h1>
                   <form>
                           <div className='user__input'>
                               <p>Enter Your Name</p>
                               <div className='user__input--style' style={{borderColor: `${site_colors.primary}`}}>
                                   <input type='text' value={name} onChange={e => setName(e.target.value)}/>
                               </div>
                           </div>
       
                           <div className='user__input'>
                               <p>Enter Your Phone</p>
                               <div className='user__input--style' style={{borderColor: `${site_colors.primary}`}}>
                                   <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
                               </div>
                           </div>
       
                           <div className='user__input'>
                               <p>Enter Your Address</p>
                               <div className='user__input--style' style={{borderColor: `${site_colors.primary}`}}>
                                   <input type='text' value={address} onChange={e => setAddress(e.target.value)} />
                               </div>
                           </div>
       
                           <button style={{backgroundColor: `${site_colors.button}`,color: 'white'}} onClick={handleSubmit}>Save</button>
                          
                   </form>
                   
                   
       
                 </div>
           )}  
            </div>
         <div className='userPc'>
         <div className='user__page'>
          <div className='user__details' style={{backgroundColor: `white`}}>
              <Avatar src={image} className='user__dp' />
              <label style={{backgroundColor: `${site_colors.button}`, color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
              Select Your Photo
              <FileUploader
                hidden
                accept="image/*"
                randomizeFilename
                name="image"
                storageRef={firebaseAppMain.storage().ref("users")}
                onUploadStart={handleUploadStart}
                onUploadSuccess={handleUploadSuccess}
               />
               </label>
           </div>
      
           <h1>Personal Details</h1>
            <form>
                    <div className='user__input'>
                        <p>Enter Your Name</p>
                        <div className='user__input--style' style={{borderColor: `${site_colors.primary}`}}>
                            <input type='text' value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                    </div>

                    <div className='user__input'>
                        <p>Enter Your Phone</p>
                        <div className='user__input--style' style={{borderColor: `${site_colors.primary}`}}>
                            <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                    </div>

                    <div className='user__input'>
                        <p>Enter Your Address</p>
                        <div className='user__input--style' style={{borderColor: `${site_colors.primary}`}}>
                            <input type='text' value={address} onChange={e => setAddress(e.target.value)} />
                        </div>
                    </div>

                    <button style={{backgroundColor: `${site_colors.button}`,color: 'white'}} onClick={handleSubmit}>Save</button>
                   
            </form>
            
            

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
          Your data was upated
        </div>
        <div className='modal__button' style={{margin: '10px auto', backgroundColor: '#3E67D0',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '12px'}} onClick={()=> setOpen(false)}>
          Okay
        </div>
    </div>
 
</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={openImage}
  
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
        <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: '#f0c14b'}}>
         Please wait your photo is uploading
        </div>
        
        <div className='modal__button' style={{margin: '10px auto',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}}>
          <img src='https://i.ibb.co/HqghKW6/2.gif' />
        </div>
    </div>
 
</Modal>
        </div>
    )
}

export default User
