import { Avatar, Modal } from '@material-ui/core';
import { Delete, DoneAll, Menu } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import { db, dbMain, firebaseAppMain } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './HandleUser.scss';
import UserSvg from '../../icons/undraw_newspaper_k72w.svg';
import axios from '../../axios';
import FileUploader from 'react-firebase-file-uploader';



function HandleUser({id}) {
    const [users,setUsers]= useState([]);
    const [openImage,setOpenImage]=useState(false);
    const [openPricing,setOpenPricing]= useState(false);
    const [searchUser,setSearchUser]= useState('');
    const [{site_settings,single_guides,site_preview,sidebarVandore,user_details,user,site_info},dispatch]= useStateValue();
    const [message,setMessage]= useState('');
    const [notification,setNotification]= useState('');
    const [notificationImage,setNotificationImage]= useState('https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png');
    const history= useHistory();
    const pageId= id;
    const [plan,setPlan]= useState('');
    const handleGetStarted= () => {
        db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
            user: true
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
    
    useEffect(() => {
  
        db.collection(pageId.toUpperCase()).doc('userList').collection('userList')
        .onSnapshot(snapshot => (
            setUsers(snapshot.docs.map(doc => ({
                id: doc.id,
                address: doc.data().address,
                name: doc.data().name,
                phone: doc.data().phone,
                image: doc.data().image,
                email: doc.data().email,
                active: doc.data().active,
                notification: doc.data().notification
            })))
        ))
       
        },[])

     const onDelete= (id,active) => {
        db.collection(pageId.toUpperCase()).doc('userList').collection('userList').doc(id).update({
           active: !active
        });

        db.collection(pageId.toUpperCase()).doc('users').collection('users').doc(id).collection('details').doc(`details_${id}`).update({
            active: !active
         });
     }

     const allUsers= `${users.map(user => user.phone)}`;
     const alltokens= `${users.map(user => user.notification)}`;

     const sendSMS= async () => {
        if(plan!=='gold' || plan !== 'lite'){
            setOpenPricing(true);
            return;
        }
     
     if(user_details.plan === 'free'){
         setOpenPricing(true);
     }
     else{
        const SMS = await axios({
            method: 'post',
            // Stripe expects the total in a currencies subunits
            url: `/orderSMS?phone=${allUsers}&message=${message}`
        });
     }
  
     
       }

    const sendNotification= async () => {
        if(plan!=='gold' || plan !== 'lite'){
            setOpenPricing(true);
            return;
        }
        if(user_details.plan === 'free'){
         setOpenPricing(true);
          }
       else {
        const NOTIFY = await axios({
            method: 'post',
            url: `/sendNotification`,
            data: {
                title: `Vandore. ${site_info.siteName}`,
                desc: notification,
                tokens: alltokens.split(','),
                image: notificationImage
            }
        });
       }


    }
 


     const handleMessage= () => {
        sendSMS();
         if(user_details.plan !== 'free'){
            dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
                sms: user_details.sms - users.length
               });
               setMessage('');
         }
    
       
       


     }

     const handleNotification= () => {
         sendNotification();
         setNotification('');

        
     }

     const handleUploadStart= () => {
        setOpenImage(true);
    }

    const handleUploadSuccess= (filename) =>{
      
    
       firebaseAppMain.storage().ref('notifications').child(filename).getDownloadURL()
       .then(url => setNotificationImage(url)).then(() =>setOpenImage(false));
                     
        
       
     };



     const filteredUsers= users.filter(user => 
        user.name.toLowerCase().includes(searchUser.toLowerCase()) || user.phone.toLowerCase().includes(searchUser.toLowerCase()) || user.email.toLowerCase().includes(searchUser.toLowerCase()));

        useEffect(() => {
     
            dbMain.collection('brands').doc(pageId.toUpperCase())
            .get()
            .then(function(doc) {
              if (doc.exists) {
                 setPlan(doc.data().plan);
              } else {
                // doc.data() will be undefined in this case
               
                console.log("No such document!");
              }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });
        
         },[])

    return (
        <div className='handleUser'>
            <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
               {site_preview.user ? (
                <>
                   <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>Users</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>Users</h1>
        </div>
                  <div className='guide_toast'>
            <p>{site_settings.userAuth ? 
            'To turn off User Authentication, go to settings and disable User Authentication' : 
            'User Authentication is disabled, go to settings and enable User Authentication'}</p> 
            <div  style={{cursor: 'pointer'}} onClick={() => history.push(`/restro/settings/${pageId}`)}>Settings</div>
           </div>
           <div className='guide_tutorial_toast'>
            <p>
            If you face any difficulties regarding User Authentication, then see our User Authentication guides
            </p> 
            <div onClick={() => manageVideo(single_guides.user)}>Guides</div>
           </div>

     <div className='userHolder'>

     
                  <table className='handleUser__user'>
                     <tr>
                         <th>Picture</th>
                         <th>Name</th>
                         <th>Phone</th>
                         <th>Email</th>
                         <th>Address</th>
                         <th>Status</th>
                     </tr>

            {filteredUsers.map(user => (
            
            <tr  style={{   backgroundColor: `${user.active ? '' : 'red'}`,color: `${user.active ? '' : 'white'}`}}>
                    <td><Avatar src={user.image} style={{margin: '0 auto'}} /></td>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                    <div onClick={() => onDelete(user.id,user.active)} >
                        {user.active ? <Delete  /> : <DoneAll />}     
                   </div>
                   </td>
           </tr> 
       
            ))}
                     
                 </table>

                 </div>


     <div className='dashboard__headerTitle'  style={{margin: '0 auto',width: '93%'}}>
       Search Users Based On Names,Phone,Email
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',margin: '0 auto',width: '90%'}} >
       Search Your Users,Start By Typing Name Or Phone Or Email.
       
     </div>
    

                 <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter User Name' value={searchUser} onChange={e => setSearchUser(e.target.value)} />
            </div>
                
           </div>



      
    <div className='dashboard__headerTitle'  style={{margin: '0 auto',width: '93%'}}>
       Send Promotional Message To Your Customers
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',margin: '0 auto',width: '90%'}} >
       Send your customers about your new offers, may be greet them or ask for feedbacks.
       
     </div>
     {user_details.sms < users.length ? (
          <div className='deleteAccount' style={{margin: '0 auto',width: '90%',color: 'green'}} >
         You Don't Have Enough SMS Credits To Send Promotional Messages To All Users, Go To Pricing Tab To Buy Some SMS Credits
          
        </div>
     ) : (
        <div className='deleteAccount' style={{color: 'green',margin: '0 auto',width: '90%'}} >
       By Sending Promotional Messages To All Users You Will Spend {users.length} SMS Credits in Total
        
      </div>
     )}



                 <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter Your Message' value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            {user_details.sms < users.length ? (
                 <button style={{backgroundColor: 'gray'}} onClick={()=>{}}>Buy Credits</button>
            ) : (
                <button disabled={user_details.sms < users.length} onClick={handleMessage}>Submit</button>
            )}
               
           </div>


           <div className='dashboard__headerTitle'  style={{margin: '0 auto',width: '93%'}}>
       Send Promotional Notifications To Your Customers
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',margin: '0 auto',width: '90%'}} >
       Send your customers about your new offers, may be greet them or ask for feedbacks.
       
     </div>
    



                 <div className='handleStore__add'>
            <div className='notification__image--holder'>
        <img src={notificationImage} />
        <label style={{backgroundColor: `green`, color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
                     Select Your Photo
                     <FileUploader
                       hidden
                       accept="image/*"
                       randomizeFilename
                       name="image"
                       storageRef={firebaseAppMain.storage().ref("notifications")}
                       onUploadStart={handleUploadStart}
                       onUploadSuccess={handleUploadSuccess}
                      />
                      </label>
            </div>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter Your Notification Message' value={notification} onChange={e => setNotification(e.target.value)} />
            </div>
            
                <button  onClick={handleNotification}>Submit</button>
            
               
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
open={openPricing}

aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
   Update Your Vandore Plan To Use This Feature
 </div>
 
 <div style={{display: 'flex',justifyContent: 'space-around'}}>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={() => history.push(`/restro/dashboard/${pageId}`)}>
  Dashboard
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={()=>  history.push(`/restro/pricing/${pageId}`)}>
   Upgrade
 </div>
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
                             <h1>Manage Your Users</h1>
                             <h3>User database helps you understand user behaviour and interact with them better.</h3>
                       
                              <div className='site_preview--getStarted' onClick={handleGetStarted}>
                                 Get Started
                              </div>
                          </div>
  
                          <div className='site_preview--topContainer--right'>
                               <img src={UserSvg} style={{fill:"#FFFFFF"}} />
                          </div>
                  </div>
               </div>
               <div className='guide__learn--more'>
                   Learn More
              </div>
               <div className='site_preview--guide'>
                  <div className='site_preview--guide--left'>
                  <img src={UserSvg} style={{fill:"#FFFFFF"}} />
                  <h4>User database helps you understand user behaviour and interact with them better.</h4>
                  </div>
                  <div className='site_preview--guide--right'>
                    <iframe src={single_guides.user} />
                  </div>
              </div>
              </div>
               )}
        </div>
    )
}

export default HandleUser
