import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authMain, db, dbMain, firebaseApp } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import firebase from 'firebase';
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon , Text } from './signElements'
import { Avatar, FormControl, InputLabel, makeStyles, MenuItem, Modal, Select } from '@material-ui/core';
import { AddAPhoto } from '@material-ui/icons';
import FileUploader from 'react-firebase-file-uploader';


const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '90%',
      color: 'white'
    },
  }));

function SignUp() {
    const classes = useStyles();
    const  [{user,user_details},dispatch]= useStateValue();
    const [codes,setCodes]= useState([]);
    const [sites,setSites]= useState([]);
    const [siteError,setSiteError]= useState('');
    const [rcode,setRcode]= useState('');
    const [validCoupon,setValidCoupon]= useState(true);
    const [couponMessage,setCouponMessage]= useState('Apply Referal Code To Instantly Get Discounts On Our Plans')
    const history= useHistory();
    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');
    const [name,setName]= useState('');
    const [address,setAddress]= useState('');
    const [phone,setPhone] = useState('');
    const [image,setImage]= useState('https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png');
    ////////////////////////////
    const [uname,setUname]= useState('');
    const [uemail,setUemail]= useState('');
    const [uimage,setUimage]= useState('https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png');
    const [uaddress,setUaddress]= useState('');
    const [uphone,setUphone]= useState('');
    const [upassword,setUpassword]= useState('');
    ////////////////////////////
    const [token,setToken]= useState('');
    ////////////////////////////
    const [openDropdown,setOpenDropdown]= useState(false);
    const [option,setOption]= useState(1);

    const [openImage,setOpenImage]= useState(false);
    const handleChange = (event) => {
        
        setOption(event.target.value);
     };
   
     const handleClose = () => {
       setOpenDropdown(false);
     };
   
     const handleOpen = () => {
       setOpenDropdown(true);
     };
    function removeChar() {
    let result= name.split(' ');
    let result2= result.join('-');
    return result2.toUpperCase();
        
    }

    if(user) {
      
      if(user_details){
        if(user_details.business){
          history.push(`/restro/dashboard/${user_details.business}`);
      }
      else{
          history.push('/mobile');
      }
      }
        
         
       
        
    }
        



    const register = (e) => {
        e.preventDefault();

        if(rcode !== '' && codes.includes(rcode.trim().toUpperCase())){
          setValidCoupon(true);
          setCouponMessage('Get Instant 60% Off On Pro Plus And 50% Off On Plus Plan Respectively');
         
          
        }else{
          setValidCoupon(false);
          setCouponMessage('Not A Valid Referal Code');
          return;
         
        }

        if(sites.includes(removeChar())){
          setSiteError('Business Name Exist');
          return;
        }else{
          setSiteError('');
        }


        authMain.createUserWithEmailAndPassword(email,password)
            .then((auth) => {
                console.log(auth);
                if(auth) {

              
                    
                

            //ABOUT
                    db.collection(removeChar()).doc('about').collection('about').doc('about_site').set({
                        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis imperdiet proin fermentum leo vel orci. Duis at consectetur lorem donec massa sapien faucibus. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et. Massa ultricies mi quis hendrerit. Ut etiam sit amet nisl purus in mollis nunc sed. Et pharetra pharetra massa massa ultricies mi quis hendrerit. Aliquam vestibulum morbi blandit cursus   risus at ultrices mi tempus. Gravida dictum fusce ut placerat orci nulla. A iaculis at erat pellentesque adipiscing commodo elit at. Tristique senectus et netus et malesuada. Ut eu sem integer vitae justo eget.',
                        image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/about%2F41e99695-0d52-458e-a980-189ce51ae202.png?alt=media&token=1aa3d694-41cd-428b-a4e5-ec066e02847a'
                    });

           //GALLERY
                 
                    db.collection(removeChar()).doc('gallery').collection('gallery').add({
                      image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/gallery%2Fb94a3cbd-a886-4a9e-84a9-b30810767127.png?alt=media&token=9bad3b29-ce69-44a7-a95b-f985a873bc27' ,
                      timestamp: firebase.firestore.FieldValue.serverTimestamp()        
                    })
                    db.collection(removeChar()).doc('gallery').collection('gallery').add({
                        image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/gallery%2Fd867e8e7-b212-4b81-8b46-e09a2a60095c.png?alt=media&token=5a2d7111-8ee8-442e-9670-c76388590092' ,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()            
                      })
                      db.collection(removeChar()).doc('gallery').collection('gallery').add({
                        image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/gallery%2F06b1e055-cb0a-4d7b-bb04-5e6ef7164298.png?alt=media&token=87a120eb-0f7e-456a-80b0-afab85831b5e'  ,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()           
                      })
                      db.collection(removeChar()).doc('gallery').collection('gallery').add({
                        image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/gallery%2F5e80a90a-8fb6-4acb-b4f5-825d673c49a7.png?alt=media&token=22c0ac2c-a2c5-45db-ae22-74e28ad4b306'  ,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()           
                      })

           //POSTS

                  db.collection(removeChar()).doc('posts').collection('posts').add({
                       comments: [],
                       fclicks: '0',
                       wclicks: '0',
                       visits: '0',
                       type: 'image',
                       link: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/posts%2F25fc0b6f-4ff9-4c1a-a54d-61e438c06661.png?alt=media&token=2c3db425-6f93-4e8e-8abe-d76f8aa548ed',
                       message: 'YOU AND YOUR CUSTOMERS CAN DIRECTLY SHARE THIS POST IN FACEBOOK , WHATSAPP.. ETC.',
                       profilePic: 'https://i.ibb.co/hLRHZSN/Vandore-Logo-3-4.png',
                       username: 'Vandore',
                       userSharing: [],
                       timestamp: firebase.firestore.FieldValue.serverTimestamp()
                  })

                  db.collection(removeChar()).doc('posts').collection('posts').add({
                    comments: [],
                    fclicks: '0',
                    wclicks: '0',
                    visits: '0',
                    type: 'image',
                    link: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/posts%2Fd2a746d0-a794-4586-a46b-e3c13036552c.png?alt=media&token=5cfc4caa-ec9c-40ec-be6e-b25513b7bb28',
                    message: 'YOU CAN CHECK ANALYTICS ON EACH POST BASED ON VIEWS , FACEBOOK SHARES , WHATSAPP SHARES ETC.',
                    profilePic: 'https://i.ibb.co/hLRHZSN/Vandore-Logo-3-4.png',
                    username: 'Vandore',
                    userSharing: [],
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
               })



               db.collection(removeChar()).doc('posts').collection('posts').add({
                comments: [],
                fclicks: '0',
                wclicks: '0',
                visits: '0',
                type: 'image',
                link: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/posts%2F0e4f4495-badf-4143-9025-bfa0c61d96e6.png?alt=media&token=84a89320-7e03-4d1a-8f1a-7fd6d030d99b',
                message: 'NOW YOU CAN POST DIRECTLY TO YOUR OWN FEED',
                profilePic: 'https://i.ibb.co/hLRHZSN/Vandore-Logo-3-4.png',
                username: 'Vandore',
                userSharing: [],
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
           })



          // CHAT ROOMS
               db.collection(removeChar()).doc('rooms').collection('rooms').add({
                   name: 'General',
                   description: 'General Channel for all the customers'
               })
              

         // Feedbacks
                db.collection(removeChar()).doc('messages').collection('messages').add({
                    image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png',
                    message: 'That looks great',
                    name: 'Demo User 1',
                    phone: '1234567890',
                    rating: 5,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })

                db.collection(removeChar()).doc('messages').collection('messages').add({
                    image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png',
                    message: 'Customers can give you feedbacks',
                    name: 'Demo User 2',
                    phone: '1234567890',
                    rating: 4,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })

                db.collection(removeChar()).doc('messages').collection('messages').add({
                    image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png',
                    message: 'You can turn it off whenever not required',
                    name: 'Demo User 3',
                    phone: '1234567890',
                    rating: 3,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })

//---------------------------------------------------------------------------------
        // SITE
           //PAYMENT-GATEWAY
             db.collection(removeChar()).doc('site').collection('site').doc('payment_gateway').set({
                  keyId: 'keyId',
                  keySecret: 'keySecret'
             })

           //SITE-COLOURS
             db.collection(removeChar()).doc('site').collection('site').doc('site_colors').set({
                 button: '#1eac35',
                 icons: '#1eac35',
                 primary: '#77c047'
             })

           //SITE-INFO
             db.collection(removeChar()).doc('site').collection('site').doc('site_info').set({
                 siteCover: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/cover%2Fcd8c966c-7621-4ec4-8b3f-d8970de50534.png?alt=media&token=7480d416-c082-4b00-a772-4d1f96342354',
                 siteDescription: 'A demo description for VANDORE',
                 siteKeyword: 'VANDORE, VANDORE KOLKATA, VANDORE ASSAM',
                 siteName: 'YOUR VANDORE SHOP',
                 tax: '',
                 delivery: '',
                 deliveryAbove: ''
             })

          //SITE-STORE-COVER
          db.collection(removeChar()).doc('site').collection('site').doc('site_store_cover').set({
            cover: 'https://i.ibb.co/Cmr1zmy/handle-store-part-3.png'
          })

         //SITE_PREVIEW
           db.collection(removeChar()).doc('site').collection('site').doc('site_preview').set({
               about: false,
               chatChannel: false,
               dashboard: false,
               feedback: false,
               guide: false,
               order: false,
               payment: false,
               photoGallery: false,
               post: false,
               setting: false,
               slider: false,
               store: false,
               pricing: false,
               qr: false,
               coupon: false,
               template: false
           })

        //SITE_SETTINGS
          db.collection(removeChar()).doc('site').collection('site').doc('site_settings').set({
              aboutUs: true,
              cashOnDel: true,
              chatChannels: true,
              cover: false,
              discount: true,
              feedback: true,
              onlinePay: false,
              photoGallery: true,
              slider: true,
              store: true,
              takeAway: true,
              userAuth: true,
              feedbackMessage: true,
              feedbackEmail: true,
              orderMessage: true,
              orderEmail: true
          })

        //SITE_STORE_COVER
        db.collection(removeChar()).doc('site').collection('site').doc('site_store_cover').set({
            cover: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/storeCover%2Fcf5cb9bf-0076-4ea7-a33f-2772eac45a33.png?alt=media&token=20f2a83d-1479-44a0-9f7b-b4547ce76912'

        })

   // ----------------------------------------------------------------------------
         
   //SITE-ORDERS-NOTIFICATION 
      db.collection(removeChar()).doc('site_orders_notification').collection('site_orders_notification').doc('orders').set({
          order: 0
      })
              
   
   //SLIDER
     db.collection(removeChar()).doc('slider').collection('slider').add({
         image: 'https://i.ibb.co/2Sw9WcF/test-slider-2021.pnG',
         timestamp: firebase.firestore.FieldValue.serverTimestamp()

     })
     db.collection(removeChar()).doc('slider').collection('slider').add({
        image: 'https://i.ibb.co/Q9XgkSs/test-slider-SECOND2.png',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
        
    })
    db.collection(removeChar()).doc('slider').collection('slider').add({
        image: 'https://i.ibb.co/gPD35Ww/test-slider-THIRD-1.png',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
        
    })

  //SOCIAL
     db.collection(removeChar()).doc('social').collection('social').doc('social_links').set({
         facebookLink: 'https://www.facebook.com/Your-Vandore-Shop-100902161950215/',
         youtubeLink: 'https://www.youtube.com/embed/3aiB0qkZTM0',
         swiggyLink: '',
         zomatoLink: ''
     })


  //PRODUCTS
  //P-1
  db.collection(removeChar()).doc('products').collection('products').doc('INQPYUAHWWHAKPDRNWCX').set({
    available: true,
    description: 'This is a demo description',
    id: 'INQPYUAHWWHAKPDRNWCX',
    image: 'https://i.ibb.co/THn4h5L/discover1-1-1.png',
    name: 'Demo Discover Product 1',
    price: '170',
    rating: '5'
  })
  //P-2
  db.collection(removeChar()).doc('products').collection('products').doc('DHUDFVCTUBMGAZLXCRWU').set({
            available: true,
            description: 'This is a demo description',
            id: 'DHUDFVCTUBMGAZLXCRWU',
            image: 'https://i.ibb.co/4jKfrLg/discover1-2-1.png',
            name: 'Demo Discover Product 2',
            price: '250',
            rating: '5'
  })
  //P-3
  db.collection(removeChar()).doc('products').collection('products').doc('FODLLPAWFWOGUCXAGNBX').set({
            available: true,
            description: 'This is a demo description',
            id: 'FODLLPAWFWOGUCXAGNBX',
            image: 'https://i.ibb.co/MRxhsLH/discover1-3-1.png',
            name: 'Demo Discover Product 3',
            price: '200',
            rating: '5'
  })
  //P-4
  db.collection(removeChar()).doc('products').collection('products').doc('FDYGANXYEBSXBTJFKDHH').set({
    available: true,
    description: 'This is a demo description',
    id: 'FDYGANXYEBSXBTJFKDHH',
    image: 'https://i.ibb.co/x2TbJJr/discover1-4-1.png',
    name: 'Demo Discover Product 4',
    price: '90',
    rating: '5'
  })
  //P-5
  db.collection(removeChar()).doc('products').collection('products').doc('TEOQYFZJEKRVAFIVEBOE').set({
            available: true,
            description: 'This is a demo description',
            id: 'TEOQYFZJEKRVAFIVEBOE',
            image: 'https://i.ibb.co/w4v182f/discover1-1.png',
            name: 'Demo Discover Product 5',
            price: '300',
            rating: '5'
  })
  // STORE
     db.collection(removeChar()).doc('store').collection('store').add({
         title: 'Discover',
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         del: false,
         items: [{
             available: true,
             description: 'This is a demo description',
             id: 'INQPYUAHWWHAKPDRNWCX',
             image: 'https://i.ibb.co/THn4h5L/discover1-1-1.png',
             name: 'Demo Discover Product 1',
             price: '170',
             rating: '5'
         },
         {
            available: true,
            description: 'This is a demo description',
            id: 'DHUDFVCTUBMGAZLXCRWU',
            image: 'https://i.ibb.co/4jKfrLg/discover1-2-1.png',
            name: 'Demo Discover Product 2',
            price: '250',
            rating: '5'
        },
        {
            available: true,
            description: 'This is a demo description',
            id: 'FODLLPAWFWOGUCXAGNBX',
            image: 'https://i.ibb.co/MRxhsLH/discover1-3-1.png',
            name: 'Demo Discover Product 3',
            price: '200',
            rating: '5'
        },
        {
            available: true,
            description: 'This is a demo description',
            id: 'FDYGANXYEBSXBTJFKDHH',
            image: 'https://i.ibb.co/x2TbJJr/discover1-4-1.png',
            name: 'Demo Discover Product 4',
            price: '90',
            rating: '5'
        },
        {
            available: true,
            description: 'This is a demo description',
            id: 'TEOQYFZJEKRVAFIVEBOE',
            image: 'https://i.ibb.co/w4v182f/discover1-1.png',
            name: 'Demo Discover Product 5',
            price: '300',
            rating: '5'
        }]
     })

     //PRODUCTS-2

  //P-1
  db.collection(removeChar()).doc('products').collection('products').doc('CBHOPQFNNRWCOQYURJMS').set({
            available: true,
            description: 'This is a demo description',
            id: 'CBHOPQFNNRWCOQYURJMS',
            image: 'https://i.ibb.co/8YR4Wn9/PRODUCT-2021-1.png',
            name: 'Demo Product 1',
            price: '170',
            rating: '5'
})
  //P-2
  db.collection(removeChar()).doc('products').collection('products').doc('JUPMNPCNSNSWCYGJOZBB').set({
    available: true,
    description: 'This is a demo description',
    id: 'JUPMNPCNSNSWCYGJOZBB',
    image: 'https://i.ibb.co/545rT0d/PRODUCT-2021-2.png',
    name: 'Demo Product 2',
    price: '250',
    rating: '5'
})


//P-3
db.collection(removeChar()).doc('products').collection('products').doc('INTJZBTHSHNAPARGYLHN').set({
    available: true,
    description: 'This is a demo description',
    id: 'INTJZBTHSHNAPARGYLHN',
    image: 'https://i.ibb.co/GTzKwCP/PRODUCT-2021-3.png',
    name: 'Demo Product 3',
    price: '200',
    rating: '5'
})

//P-4

db.collection(removeChar()).doc('products').collection('products').doc('UKLRUXTPQUICXENNWDCF').set({
    available: true,
    description: 'This is a demo description',
    id: 'UKLRUXTPQUICXENNWDCF',
    image: 'https://i.ibb.co/8bVDr95/PRODUCT-2021-4.png',
    name: 'Demo Product 4',
    price: '90',
    rating: '5'
})


     db.collection(removeChar()).doc('store').collection('store').add({
        title: 'Demo',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        items: [{
            available: true,
            description: 'This is a demo description',
            id: 'CBHOPQFNNRWCOQYURJMS',
            image: 'https://i.ibb.co/8YR4Wn9/PRODUCT-2021-1.png',
            name: 'Demo Product 1',
            price: '170',
            rating: '5'
        },
        {
           available: true,
           description: 'This is a demo description',
           id: 'JUPMNPCNSNSWCYGJOZBB',
           image: 'https://i.ibb.co/545rT0d/PRODUCT-2021-2.png',
           name: 'Demo Product 2',
           price: '250',
           rating: '5'
       },
       {
           available: true,
           description: 'This is a demo description',
           id: 'INTJZBTHSHNAPARGYLHN',
           image: 'https://i.ibb.co/GTzKwCP/PRODUCT-2021-3.png',
           name: 'Demo Product 3',
           price: '200',
           rating: '5'
       },
       {
           available: true,
           description: 'This is a demo description',
           id: 'UKLRUXTPQUICXENNWDCF',
           image: 'https://i.ibb.co/8bVDr95/PRODUCT-2021-4.png',
           name: 'Demo Product 4',
           price: '90',
           rating: '5'
       }]
    })


    //USERS


    db.collection(removeChar()).doc('users').collection('users')
    .doc(auth.user.uid)
    .collection('details')
    .doc(`details_${auth.user.uid}`)
    .set({
        active: true,
        name: name,
        phone: phone,
        address: address,
        business: removeChar(),
        businessActive: true,
        app: '',
        appActive: false,
        appRequest: false,
        desktopApp: '',
        desktopAppRequest: false,
        desktopAppActive: false,
        paymentLink: '',
        paymentRequest: false,
        paymentActive: false,
        plan: 'free',
        duration: '14 Days',
        planActiveDate: firebase.firestore.FieldValue.serverTimestamp(),
        planActive: true,
        SMS: 0,
        domain: '',
        domainActive: false,
        domainRequest: false,
        link: '',
        image: image,
        notification: token
    })

    db.collection(removeChar()).doc('userList').collection('userList')
    .doc(auth.user.uid)
    .set({
        active: true,
        email: auth.user.email,
        businessActive: true,
        domain: '',
        domainRequest: false,
        name: name,
        phone: phone,
        app: '',
        appActive: false,
        appRequest: false,
        desktopApp: '',
        desktopAppRequest: false,
        desktopAppActive: false,
        paymentLink: '',
        paymentRequest: false,
        paymentActive: false,
        plan: 'free',
        duration: '14 Days',
        planActiveDate: firebase.firestore.FieldValue.serverTimestamp(),
        planActive: true,
        SMS: 0,
        domainActive: false,
        business: removeChar(),
        link: '',
        address: address,
        image: image,
        notification: token
    })



/* ------------------------------------------------------------------------------------------                                */
                 

                    dbMain.collection('users')
                    .doc(auth.user.uid)
                    .collection('details')
                    .doc(`details_${auth.user.uid}`)
                    .set({
                        active: true,
                        name: name,
                        businessActive: true,
                        domain: '',
                        domainRequest: false,
                        app: '',
                        appActive: false,
                        appRequest: false,
                        desktopApp: '',
                        desktopAppRequest: false,
                        desktopAppActive: false,
                        paymentLink: '',
                        paymentRequest: false,
                        paymentActive: false,
                        phone: phone,
                        plan: 'free',
                        duration: '14 Days',
                        planActiveDate: firebase.firestore.FieldValue.serverTimestamp(),
                        planActive: true,
                        SMS: 0,
                        address: address,
                        domainActive: false,
                        business: removeChar(),
                        link: '',
                        image: image,
                        notification: token
                    })

                    dbMain.collection('userList')
                    .doc(auth.user.uid)
                    .set({
                        active: true,
                        email: auth.user.email,
                        businessActive: true,
                        domain: '',
                        domainRequest: false,
                        name: name,
                        app: '',
                        appActive: false,
                        appRequest: false,
                        desktopApp: '',
                        desktopAppRequest: false,
                        desktopAppActive: false,
                        paymentLink: '',
                        paymentRequest: false,
                        paymentActive: false,
                        plan: 'free',
                        duration: '14 Days',
                        planActiveDate: firebase.firestore.FieldValue.serverTimestamp(),
                        planActive: true,
                        SMS: 0,
                        phone: phone,
                        domainActive: false,
                        business: removeChar(),
                        link: '',
                        address: address,
                        image: image,
                        notification: token
                    })


                    dbMain.collection('brands').doc(removeChar()).set({
                        image: image,
                        name: removeChar(),
                        plan: 'free',
                        notification: token,
                        affiliation: validCoupon ? rcode : 'LUCKY50',
                        firstPay:  false,
                        app:'',
                        domain: '',
                        payment: ''
                    })

                    if(validCoupon){
                      dbMain.collection('affiliation').doc(rcode).collection('affiliation').doc(removeChar()).set({
                        name: removeChar(),
                        image: image,
                        paid: false,
                        plan: 'free'
                      })
                    }
                    
                    
                    history.push(`/restro/dashboard/${removeChar()}`)
                }
            })
            .catch(error => alert(error.message));
    }


    const handleUploadStart= () => {
        setOpenImage(true);
    }

    const handleUploadSuccess= (filename) =>{
        firebaseApp.storage().ref('logo').child(filename).getDownloadURL()
       .then(url => setImage(url)).then(() => setOpenImage(false));
  
     };


     const handleUploadStartUser= () => {
      setOpenImage(true);
     }

     const handleUploadSuccessUser= (filename) =>{
      firebaseApp.storage().ref('user').child(filename).getDownloadURL()
     .then(url => setUimage(url)).then(() => setOpenImage(false));

    };


   const registerUser= (e) => {
    e.preventDefault();
    authMain.createUserWithEmailAndPassword(uemail,upassword)
    .then((auth) => {
        console.log(auth);
        if(auth) {

           const acode= getRandomText(5);

            dbMain.collection('users')
            .doc(auth.user.uid)
            .collection('details')
            .doc(`details_${auth.user.uid}`)
            .set({
                active: true,
                page: 'vandore',
                name: uname,
                phone: uphone,
                notification: token,
                affiliation: acode,
                address: uaddress,
                image: uimage,
                paymentRequest: false,
                requestDate: firebase.firestore.FieldValue.serverTimestamp(),
                amountPaid: 0

            })

            dbMain.collection('userList')
            .doc(auth.user.uid)
            .set({
                active: true,
                page: 'vandore',
                email: auth.user.email,
                name: uname,
                phone: uphone,
                notification: token,
                affiliation: acode,
                address: uaddress,
                image: uimage,
                apaymentRequest: false,
                requestDate: firebase.firestore.FieldValue.serverTimestamp(),
                amountPaid: 0
            })

            dbMain.collection('affiliation_codes')
                  .doc(acode)
                  .set({
                    code: acode,
                    uid: auth.user.uid,
                    active: true
                  })
            
            
            history.push(`/mobile`);
        }
    })
    .catch(error => alert(error.message));
   }

   const grantPermission= () => {
    const messaging = firebaseApp.messaging() 
    Notification.requestPermission().then(()=>{
      return messaging.getToken()
    }).then(token=>{
        console.warn(token);
        setToken(token);
        dispatch({
            type: 'ADD_NOTIFICATION_TOKEN',
            notification_token: token
        })
    }).catch((err)=>{
      console.log(err);
      
    })
   }

   function getRandomText(length) {
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/./g);
    var text = "";
    for (var i = 0; i < length; i++) text += charset[Math.floor(Math.random() * charset.length)];
    return text;
  }

  useEffect(() => {
  
    dbMain.collection('affiliation_codes')
    .onSnapshot(snapshot => (
        setCodes(snapshot.docs.map(doc => doc.id))
    ))
   
    },[])


    useEffect(() => {
  
      dbMain.collection('brands')
      .onSnapshot(snapshot => (
          setSites(snapshot.docs.map(doc => doc.id))
      ))
     
      },[])
  
 
    
    

    
    

    
  


    return (
        <>
          <Container style={{overflow: 'scroll'}}>
              <FormWrap>
                  <Icon to='/'> VANDORE </Icon>
                  <FormContent>
                  
                      <Form onSubmit={option===2 ? register : registerUser}>

                          <FormH1>Sign up to your account </FormH1>
                          <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label" style={{color: 'white'}}>Account Type</InputLabel>
        <Select
        style={{backgroundColor: 'white'}}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openDropdown}
          onClose={handleClose}
          onOpen={handleOpen}
          value={option}
          onChange={handleChange}
        >
         
          <MenuItem value={1}>Personal</MenuItem>
          <MenuItem value={2}>Business</MenuItem>
        
        </Select>
      </FormControl>
      
        
        {option===1 ? (
          <>
               <Avatar src={uimage} style={{width: '150px',height: '150px',margin: '0 auto'}}/>
    <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',marginTop: 20,display: 'flex',alignItems: 'center',width: 'max-content',margin: '0 auto'}}>
   Select Your Profile Picture <AddAPhoto style={{paddingLeft: '10px'}} />
   <FileUploader
     hidden
     accept="image/*"
     randomizeFilename
     name="image"
     storageRef={firebaseApp.storage().ref("user")}
     onUploadStart={handleUploadStartUser}
     onUploadSuccess={handleUploadSuccessUser}
    />
    </label>
               <FormLabel htmlFor='for' >Name</FormLabel>
               <FormInput type='text' placeholder='Your Name' required value={uname} onChange={e => setUname(e.target.value)} />
               <FormLabel htmlFor='for' >Phone</FormLabel>
               <FormInput type='text' placeholder='Your Phone Number' required value={uphone} onChange={e => setUphone(e.target.value)} />
               <FormLabel htmlFor='for' >Address</FormLabel>
               <FormInput type='text' placeholder='Your Address' required value={uaddress} onChange={e => setUaddress(e.target.value)} />
               <FormLabel htmlFor='for' >Email</FormLabel>
               <FormInput type='email' placeholder='Your Email' required value={uemail} onChange={e => setUemail(e.target.value)} />
               <FormLabel htmlFor='for' >Password</FormLabel>
               <FormInput type='password' placeholder='Your Password' required value={upassword} onChange={e => setUpassword(e.target.value)} />
               
               {token ? (
                <FormButton type='submit' >Continue</FormButton>
               ) : (
                <FormButton type='button' onClick={grantPermission} >Give Notification Access To Continue</FormButton>
               )}
              
         </>
        ) : ''}

        {option===2 ? (
          <>
           <Avatar src={image} style={{width: '150px',height: '150px',margin: '0 auto'}}/>
 <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',marginTop: 20,display: 'flex',alignItems: 'center',width: 'max-content',margin: '0 auto'}}>
   Select Your Logo <AddAPhoto style={{paddingLeft: '10px'}} />
   <FileUploader
     hidden
     accept="image/*"
     randomizeFilename
     name="image"
     storageRef={firebaseApp.storage().ref("logo")}
     onUploadStart={handleUploadStart}
     onUploadSuccess={handleUploadSuccess}
    />
    </label>
 <FormLabel htmlFor='for' >Your Brand Name {removeChar()}</FormLabel>

               <FormInput type='text' required value={name} onChange={e => setName(e.target.value)}/>
               <FormLabel htmlFor='for' >Phone</FormLabel>
               <FormInput type='text' required value={phone} onChange={e => setPhone(e.target.value)} />
               <FormLabel htmlFor='for' >Address</FormLabel>
               <FormInput type='text' required  value={address} onChange={e => setAddress(e.target.value)} />
               <FormLabel htmlFor='for' >Email</FormLabel>
               <FormInput type='email' required value={email} onChange={e => setEmail(e.target.value)}/>
               <FormLabel htmlFor='for' >Password</FormLabel>
               <FormInput type='password' required  value={password} onChange={e => setPassword(e.target.value)}/>
               <FormLabel htmlFor='for' >Referal Code</FormLabel>
               <FormInput type='text' required value={rcode} onChange={e => setRcode(e.target.value)} />
               <p style={{color: 'white'}}>{couponMessage}</p>
               <p style={{color: 'white'}}>{siteError}</p>
               {token ? (
                <FormButton type='submit' >Continue</FormButton>
               ) : (
                <FormButton type='button' onClick={grantPermission} >Give Notification Access To Continue</FormButton>
               )}
               </>
        ) : ''}

                     </Form>
                  </FormContent>
              </FormWrap>
          </Container>  
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
    )
}

export default SignUp

