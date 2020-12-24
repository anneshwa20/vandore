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

function User() {
    const [{user,site_colors,sidebar},dispatch]= useStateValue();
    const [phone,setPhone]= useState('');
    const [name,setName]= useState('');
    const [address,setAddress]= useState('');
    const [image,setImage]= useState('');
    const [open,setOpen]= useState(false);
    const [openImage,setOpenImage]= useState(false);

    useEffect(() => {
        if(user){
            db.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`)
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

              db.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
                name: name,
                image: image,
                address: address,
                phone: phone
            });

            db.collection("userList").doc(user.uid).update({
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
            <Sidebar />
            <div className='userMobile'>
           {sidebar ? <SidebarMobile /> : (
                 <div className='user__page'>
                 <div className='user__details' style={{backgroundColor: `${site_colors.primary}`}}>
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
          <div className='user__details' style={{backgroundColor: `${site_colors.primary}`}}>
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
