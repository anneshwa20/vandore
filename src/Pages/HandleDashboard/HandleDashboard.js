import React, { useEffect, useState } from 'react'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import LineChart from '../../components/LineChart/LineChart';
import OrdersAnalytics from '../../components/OrdersAnalytics/OrdersAnalytics';
import { db, firebaseApp } from '../../firebase';
import './HandleDashboard.scss'
import firebase from 'firebase';
import { useStateValue } from '../../StateProvider';
import { Avatar, Modal } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';
import { AddAPhoto, Menu } from '@material-ui/icons';
import Dashboard from '../../icons/undraw_dashboard_nklg.svg';
import { ChromePicker } from 'react-color';
import PostIcon from '../../icons/two-post-it.svg';
import PaymentIcon from '../../icons/credit-card.svg';
import OrderIcon from '../../icons/check-list(1).svg';
import UserIcon from '../../icons/user.svg';
import GalleryIcon from '../../icons/gallery(1).svg'


function HandleDashboard() {
    const[facebookLink,setFacebookLink]= useState('');
    const[zomatoLink,setZomatoLink]= useState('');
    const[swiggyLink,setSwiggyLink]= useState('');
    const[siteName,setSiteName]= useState('');
    const[siteDescription,setSiteDescription]= useState('');
    const[siteKeyword,setSiteKeyword]= useState('');
    const[posts,setPosts]= useState([]);
    const[payments,setPayments]= useState([]);
    const[orders,setOrders]= useState([]);
    const[photos,setPhotos]= useState([]);
    const[users,setUsers]= useState([]);
    const[keyId,setKeyId]= useState('');
    const[keySecret,setKeySecret]= useState('');
    const[youtubeLink,setYoutubeLink]= useState('');
    const colors= ['#FFA07A', '#FF0000','#FFDAB9','#F0E68C','#7CFC00','#8FBC8F','#808000','#E0FFFF','#00FFFF','#ADD8E6','#000080','#DDA0DD','#FF00FF','#FF1493','#FFC0CB','#8B4513','#FFD700','#E6E6FA','#FF6347','#40E0D0','#FFDAB9','#333300' ,'#C71585','#4B0082','#800000'];
    const[ordersDate,setOrdersDate]= useState('');
    const[ordersPerDay,setOrdersPerDay]= useState('');
    const[visitsDate,setVisitsDate]= useState('');
    const[visitsPerday,setVisitsPerDay]= useState('');
    const[{user_details,site_preview,single_guides,site_colors,sidebarVandore},dispatch]= useStateValue();
    const[image,setImage]= useState('');
    const history= useHistory();
   const [openAlert,setOpenAlert]= useState(false);
   const [openImage,setOpenImage]= useState(false);
   const [coverUpload,setCoverUpload]= useState(false);
   const [openColor,setOpenColor]= useState(false);
   const [primaryColor,setPrimaryColor]= useState('');
   const [buttonColor,setButtonColor]= useState('');
   const [iconColor,setIconColor]= useState('');
   const [currentColor,setCurrentColor]= useState('');


   const AutoplaySlider= withAutoplay(AwesomeSlider);
   useEffect(() => {
        
    db.collection("site").doc('site_colors')
    .get()
    .then(function(doc) {
      if (doc.exists) {
         setPrimaryColor(doc.data().primary);
         setButtonColor(doc.data().button);
         setIconColor(doc.data().icons);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

 },[])


    useEffect(() => {
        
        db.collection("social").doc('social_links')
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
        
        db.collection("site").doc('site_info')
        .get()
        .then(function(doc) {
          if (doc.exists) {
              setSiteName(doc.data().siteName);
              setSiteDescription(doc.data().siteDescription);
              setSiteKeyword(doc.data().siteKeyword);
              setImage(doc.data().siteCover);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
    
     },[])

     useEffect(() => {
        
        db.collection("site").doc('payment_gateway')
        .get()
        .then(function(doc) {
          if (doc.exists) {
              setKeyId(doc.data().keyId);
              setKeySecret(doc.data().keySecret);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
    
     },[])

     useEffect(() => {
  
        db.collection('userList')
        .onSnapshot(snapshot => (
            setUsers(snapshot.docs.map(doc => ({
                id: doc.id,
                address: doc.data().address,
                name: doc.data().name,
                phone: doc.data().phone,
                image: doc.data().image,
                email: doc.data().email,
                active: doc.data().active
            })))
        ))
       
        },[])


     useEffect(() => {
  
        db.collection('gallery')
        .onSnapshot(snapshot => (
            setPhotos(snapshot.docs.map(doc => ({
                id: doc.id,
                image: doc.data().image
            })))
        ))
       
        },[])


        useEffect(() => {
  
            db.collection('orders')
            .orderBy('created','desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id:doc.id,
                    data: doc.data()
                })))
            ))
           
            },[])

            useEffect(() => {
  
                db.collection('payments')
                .onSnapshot(snapshot => (
                    setPayments(snapshot.docs.map(doc => ({
                        id: doc.id,
                        email: doc.data().email,
                        name: doc.data().name,
                        phone: doc.data().phone,
                        address: doc.data().address,
                        amount: doc.data().amount,
                    })))
                ))
               
                },[])

                useEffect(() => {
  
                    db.collection('analytics')
                    .orderBy("createdAt","desc")
                    .limit(7)
                    .onSnapshot(snapshot => (
                        setVisitsDate(snapshot.docs.map(doc => doc.id))
                    ))
                   
                    },[])
  
                    useEffect(() => {
  
                        db.collection('analytics')
                        .orderBy("createdAt","desc")
                        .limit(7)
                        .onSnapshot(snapshot => (
                            setVisitsPerDay(snapshot.docs.map(doc => doc.data().visits))
                        ))
                       
                      },[])
                 
                      useEffect(() => {
  
                        db.collection('OrdersAnalytics')
                        .orderBy("createdAt","desc")
                        .limit(7)
                        .onSnapshot(snapshot => (
                            setOrdersDate(snapshot.docs.map(doc => doc.id))
                        ))
                       
                        },[])

                        useEffect(() => {
  
                            db.collection('OrdersAnalytics')
                            .orderBy("createdAt","desc")
                            .limit(7)
                            .onSnapshot(snapshot => (
                                setOrdersPerDay(snapshot.docs.map(doc => doc.data().orders))
                            ))
                           
                          },[])
                     


                useEffect(() => {
                    db.collection('posts')
                    .orderBy("timestamp","desc")
                    .onSnapshot(snapshot => {
                        setPosts(snapshot.docs.map(doc => ({ id: doc.id,data:doc.data()})))
                    });
                },[]);


    const handleSubmit= () => {
       db.collection('social').doc('social_links').update({
           facebookLink: facebookLink,
           zomatoLink: zomatoLink,
           swiggyLink: swiggyLink,
           youtubeLink: youtubeLink
       }).then(() => setOpenAlert(true));
    }

    const handleSubmitPayment= () => {
        db.collection('site').doc('payment_gateway').update({
            keyId: keyId,
            keySecret: keySecret,
            
        }).then(() => setOpenAlert(true));
     }

   

    const handleSubmitSite= () => {
      db.collection('site').doc('site_info').update({
          siteName: siteName,
          siteDescription: siteDescription,
          siteKeyword: siteKeyword
      }).then(() => setOpenAlert(true));
    }



    const handleUploadStart= () => {
       setOpenImage(true);
    }

    const handleUploadSuccess= (filename) =>{
  
       firebaseApp.storage().ref('cover').child(filename).getDownloadURL()
       .then(url => setImage(url)).then(() => setCoverUpload(true)).then(() => setOpenImage(false));
    };

    const handleCover= () => {
      db.collection('site').doc('site_info').update({
          siteCover: image
      }).then(() => setCoverUpload(false));
    }

    const handleGetStarted= () => {
        db.collection('site').doc('site_preview').update({
            dashboard: true
        }).then(refreshPage);
    }
    const refreshPage = ()=>{
        window.location.reload();  }

    const handleColorModal=(color) => {
      if(color==='primary'){
        setCurrentColor('primary');
        setOpenColor(true);
      }
      else if(color==='button') {
        setCurrentColor('button');
        setOpenColor(true);
      }
      else if(color === 'icon'){
        setCurrentColor('icon');
        setOpenColor(true);
      }
    }

   const handleChangePrimaryColor=(color) => {
       setPrimaryColor(color.hex);
   }
   const handleChangeButtonColor=(color) => {
    setButtonColor(color.hex);
   }
const handleChangeIconColor=(color) => {
    setIconColor(color.hex);
   }

   const handleSaveColor=(color) => {
    if(color==='primary'){
        db.collection('site').doc('site_colors').update({
            primary: primaryColor
        });
        setCurrentColor('');
        setOpenColor(false);
      }
      else if(color==='button') {
        db.collection('site').doc('site_colors').update({
            button: buttonColor
        });
        setCurrentColor('');
        setOpenColor(false);
      }
      else if(color === 'icon'){
        db.collection('site').doc('site_colors').update({
            icons: iconColor
        });
        setCurrentColor('');
        setOpenColor(false);
      }
   }

    return (
        <div className='handleDashboard'>
           {site_preview.dashboard ? (
               <>

         <div className='vandoreHeaderPc'>
            <h1>INSIGHTS</h1>
        </div>
            
        <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
            {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>INSIGHTS</h1>
        </div>
     <div className='handleDashboard__header'>
       <div className='handleDashboard__header--left'>
        <Avatar src={user_details.image} style={{height: '100px',width: '100px'}}/>
        <h2 style={{color: 'white',marginTop:'5px'}}>{user_details.name}</h2>
        <h3 style={{color: 'white',marginTop:'5px',width: '300px',fontSize: '12px',marginBottom: '10px',textAlign: 'center'}}>{user_details.address}</h3>
         <div    onClick={() => history.push('/user')} style={{cursor: 'pointer',color: 'white',width: '150px',height: '50px', border: '1px solid white', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
             Edit Profile
         </div>
       </div>
       <div className='handleDashboard__header--right' style={{backgroundImage: `url(${image})`}}>
       <label  style={{cursor: 'pointer',color: 'white',width: '150px',height: '50px', border: '1px solid white', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {coverUpload ? (
                <div onClick={handleCover}>
                Save Photo <AddAPhoto />
                </div>
            ) : (
                <>
                Change Cover Image <AddAPhoto />
                <FileUploader
                hidden
                accept="image/*"
                randomizeFilename
                name="image"
                storageRef={firebaseApp.storage().ref("cover")}
                onUploadStart={handleUploadStart}
                onUploadSuccess={handleUploadSuccess}
                />
                </>
            )}
            
               </label>
       </div>
     </div>

     
     <div className='dashboard__headerTitle'>
        Analytics Overview
        <hr></hr>
     </div>

     <div className='analytics__slide'>
     <AutoplaySlider
                   play={true}
                   cancelOnInteraction={false} // should stop playing on user interaction
                   interval={3000}
                   animation='cubeAnimation'
               >
                      <div className='handleDashboard__insightPost' >
               <div className='handleDashboard__insightPost--top'>
                   <img src={PostIcon}  />
                   <h3>Post</h3>
                   <hr></hr>
               </div>
               <div className='handleDashboard__insightPost--center'>

               </div>
               <div className='handleDashboard__insightPost--bottom'>
                  {posts.length}
               </div>
        </div>

        <div className='handleDashboard__insightPost'>
               <div className='handleDashboard__insightPost--top'>
                   <img src={PaymentIcon} />
                   <h3>Payments</h3>
                   <hr></hr>
               </div>
               <div className='handleDashboard__insightPost--center'>

               </div>
               <div className='handleDashboard__insightPost--bottom'>
                   {payments.length}
               </div>
        </div>

        <div className='handleDashboard__insightPost' >
               <div className='handleDashboard__insightPost--top'>
                  <img src={OrderIcon} />
                   <h3>Orders</h3>
                   <hr></hr>
               </div>
               <div className='handleDashboard__insightPost--center'>

               </div>
               <div className='handleDashboard__insightPost--bottom'>
                   {orders.length}
               </div>
        </div>

        <div className='handleDashboard__insightPost' >
               <div className='handleDashboard__insightPost--top'>
                   <img src={UserIcon} />
                   <h3>Users</h3>
                   <hr></hr>
               </div>
               <div className='handleDashboard__insightPost--center'>

               </div>
               <div className='handleDashboard__insightPost--bottom'>
                   {users.length}
               </div>
        </div>

        <div className='handleDashboard__insightPost'>
               <div className='handleDashboard__insightPost--top'>
                   <img src={GalleryIcon} />
                   <h3>Photos</h3>
                   <hr></hr>
               </div>
               <div className='handleDashboard__insightPost--center'>

               </div>
               <div className='handleDashboard__insightPost--bottom'>
                   {photos.length}
               </div>
        </div>
       </AutoplaySlider> 
     </div>

     
      <div className='handleDashboard__insight'>
         
 
           <div className='handleDashboard__insightPost' >
               <div className='handleDashboard__insightPost--top'>
                   <img src={PostIcon}  />
                   <h3>Post</h3>
                   <hr></hr>
               </div>
               <div className='handleDashboard__insightPost--center'>

               </div>
               <div className='handleDashboard__insightPost--bottom'>
                  {posts.length}
               </div>
        </div>

        <div className='handleDashboard__insightPost'>
               <div className='handleDashboard__insightPost--top'>
                   <img src={PaymentIcon} />
                   <h3>Payments</h3>
                   <hr></hr>
               </div>
               <div className='handleDashboard__insightPost--center'>

               </div>
               <div className='handleDashboard__insightPost--bottom'>
                   {payments.length}
               </div>
        </div>

        <div className='handleDashboard__insightPost' >
               <div className='handleDashboard__insightPost--top'>
                  <img src={OrderIcon} />
                   <h3>Orders</h3>
                   <hr></hr>
               </div>
               <div className='handleDashboard__insightPost--center'>

               </div>
               <div className='handleDashboard__insightPost--bottom'>
                   {orders.length}
               </div>
        </div>

        <div className='handleDashboard__insightPost' >
               <div className='handleDashboard__insightPost--top'>
                   <img src={UserIcon} />
                   <h3>Users</h3>
                   <hr></hr>
               </div>
               <div className='handleDashboard__insightPost--center'>

               </div>
               <div className='handleDashboard__insightPost--bottom'>
                   {users.length}
               </div>
        </div>

        <div className='handleDashboard__insightPost'>
               <div className='handleDashboard__insightPost--top'>
                   <img src={GalleryIcon} />
                   <h3>Photos</h3>
                   <hr></hr>
               </div>
               <div className='handleDashboard__insightPost--center'>

               </div>
               <div className='handleDashboard__insightPost--bottom'>
                   {photos.length}
               </div>
        </div>
</div>

<div className='dashboard__headerTitle' style={{marginBottom: '20px'}}>
        Visual Graphs
        <hr></hr>
     </div>
     
  <div className='dashboard__analytics'>
      <div className='chart' style={{backgroundColor: 'black',borderRadius: '10px'}}>
      <LineChart  dates={visitsDate} datesData={visitsPerday}/>
      </div>
      <div className='chart'  style={{backgroundColor: 'black',borderRadius: '10px'}}>
      <OrdersAnalytics  dates={ordersDate} datesData={ordersPerDay} />
      </div>
      
  </div>

  <div className='dashboard__headerTitle' style={{marginBottom: '20px'}}>
      Manage Your Colors
        <hr></hr>
     </div>
     

  <div className='color__options'>
         <div className='color__options--option'>
             <div className='color__options--color' style={{backgroundColor: `${primaryColor}`}} onClick={() => handleColorModal('primary')}>
              
             </div>
             <h4>Primary Colour</h4>
         </div>
         <div className='color__options--option'>
             <div className='color__options--color' style={{backgroundColor: `${buttonColor}`}} onClick={() => handleColorModal('button')}>

             </div>
             <h4>Buttons Colour</h4>
         </div>
         <div className='color__options--option'>
             <div className='color__options--color' style={{backgroundColor: `${iconColor}`}} onClick={() => handleColorModal('icon')}>

             </div>
             <h4>Icons Colour</h4>
         </div>
         
     </div>

     <div className='dashboard__headerTitle' style={{marginBottom: '20px'}}>
      Manage Your Site Information
        <hr></hr>
     </div>
     
<div className='dashboard_info'>

 <div className='handleDashboard__social'>
            <h2   className='handleDashboard__social--header'>Site Information</h2>
       
                    <div className='user__input'>
                        <p>Enter Site Name</p>
                        <div className='user__input--style'>
                            <input type='text'  placeholder='Enter Your Site Name' value={siteName} onChange={e => setSiteName(e.target.value)}/>
                        </div>
                    </div>

                    <div className='user__input'>
                        <p>Enter Your Site Description</p>
                        <div className='user__input--style'>
                            <input type='text'  placeholder='Enter Your Site Description' value={siteDescription} onChange={e => setSiteDescription(e.target.value)} />
                        </div>
                    </div>

                    <div className='user__input'>
                        <p>Enter Keywords For Your Site</p>
                        <div className='user__input--style'>
                            <input type='text'  placeholder='Enter Keywords For Your Site'  value={siteKeyword} onChange={e => setSiteKeyword(e.target.value)} />
                        </div>
                    </div>

                    <button onClick={handleSubmitSite}>Save</button>
    </div>

        <div className='handleDashboard__social'>
            <h2  className='handleDashboard__social--header'>Social Links</h2>
  
                    <div className='user__input'>
                        <p>Facebook Profile</p>
                        <div className='user__input--style'>
                            <input type='text'  placeholder='Facebook Profile Link' value={facebookLink} onChange={e => setFacebookLink(e.target.value)}/>
                        </div>
                    </div>

                    <div className='user__input'>
                        <p>Zomato Profile</p>
                        <div className='user__input--style'>
                            <input type='text'  placeholder='Zomato Profile Link' value={zomatoLink} onChange={e => setZomatoLink(e.target.value)} />
                        </div>
                    </div>

                    <div className='user__input'>
                        <p>Swiggy Profile</p>
                        <div className='user__input--style'>
                            <input type='text'  placeholder='Swiggy Profile Link'  value={swiggyLink} onChange={e => setSwiggyLink(e.target.value)} />
                        </div>
                    </div>

                    <div className='user__input'>
                        <p>Youtube Promo</p>
                        <div className='user__input--style'>
                            <input type='text'  placeholder='Youtube Promo Link'  value={youtubeLink} onChange={e => setYoutubeLink(e.target.value)} />
                        </div>
                    </div>

                    <button onClick={handleSubmit}>Save</button>
    </div>

    <div className='handleDashboard__social'>
            <h2  className='handleDashboard__social--header'>Payment Gateway Integration</h2>
  
                    <div className='user__input'>
                        <p>Key Id Of Razorpay Account</p>
                        <div className='user__input--style'>
                            <input type='text'  placeholder='Key Id Of Your Razorpay Account' value={keyId} onChange={e => setKeyId(e.target.value)}/>
                        </div>
                    </div>

                    <div className='user__input'>
                        <p>Key Secret Of Razorpay Account</p>
                        <div className='user__input--style'>
                            <input type='text'  placeholder='Key Secret Of Your Razorpay Account' value={keySecret} onChange={e => setKeySecret(e.target.value)} />
                        </div>
                    </div>

                    <button onClick={handleSubmitPayment}>Save</button>
    </div>

    </div>
    <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={openAlert}
  onClose={() => setOpenAlert(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
        <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: '#f0c14b'}}>
          Your data was upated
        </div>
        <div className='modal__button' style={{margin: '10px auto', backgroundColor: '#3E67D0',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '12px'}} onClick={()=> setOpenAlert(false)}>
          Okay
        </div>
    </div>
 
</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center',flexDirection: 'column'}}
  open={openColor}

  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
   <>
       {currentColor === 'primary' ? (
           <>
            <ChromePicker 
            color={primaryColor}
            onChangeComplete={handleChangePrimaryColor}
            />
            <div className='modal__button' style={{margin: '10px', backgroundColor: 'white',color: 'black',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '10px'}} onClick={()=> handleSaveColor('primary')}>
            Save Colour
            </div>
           </>
       ) : ''}
        {currentColor === 'button' ? (
           <>
            <ChromePicker 
            color={buttonColor}
            onChangeComplete={handleChangeButtonColor}
            />
            <div className='modal__button' style={{margin: '10px', backgroundColor: 'white',color: 'black',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '10px'}} onClick={()=> handleSaveColor('button')}>
            Save Colour
            </div>
           </>
       ) : ''}
        {currentColor === 'icon' ? (
           <>
            <ChromePicker 
            color={iconColor}
            onChangeComplete={handleChangeIconColor}
            />
            <div className='modal__button' style={{margin: '10px', backgroundColor: 'white',color: 'black',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '10px'}} onClick={()=> handleSaveColor('icon')}>
            Save Colour
            </div>
           </>
       ) : ''}
   
  </>
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
                               <h1>Dashboard</h1>
                               <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
                         
                                <div className='site_preview--getStarted' onClick={handleGetStarted}>
                                   Get Started
                                </div>
                            </div>

                            <div className='site_preview--topContainer--right'>
                                 <img src={Dashboard} style={{fill:"#FFFFFF"}} />
                            </div>
                    </div>
                 </div>
                 <div className='guide__learn--more'>
                     Learn More
                </div>
                 <div className='site_preview--guide'>
                    <div className='site_preview--guide--left'>
                    <img src={Dashboard} style={{fill:"#FFFFFF"}} />
                    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
                    </div>
                    <div className='site_preview--guide--right'>
                      <iframe src={single_guides.dashboard} />
                    </div>
                </div>
                </div>
           )}
</div>
    )
}

export default HandleDashboard
