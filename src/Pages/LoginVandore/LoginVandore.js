import { Link,useHistory } from 'react-router-dom';
import React from 'react'
import './LoginVandore.scss'
import { useState } from 'react';
import { auth, authMain, db, dbMain } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Sidebar from '../../components/Sidebar/Sidebar';
import Social from '../../components/Social/Social';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import firebase from 'firebase';

function LoginVandore() {
    const  [{user,user_details},dispatch]= useStateValue();
    const history= useHistory();
    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');
    const [name,setName]= useState('');
    const [address,setAddress]= useState('');
    const [phone,setPhone] = useState('');

    function removeChar() {
    let result= name.split(' ');
    let result2= result.join('-');
    return result2.toUpperCase();
        
    }

    if(user) {
      
        
          if(user_details.business){
              history.push(`/restro/dashboard/${user_details.business}`);
          }
       
        
    }
        



    const register = (e) => {
        e.preventDefault();

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
                      image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/gallery%2Fb94a3cbd-a886-4a9e-84a9-b30810767127.png?alt=media&token=9bad3b29-ce69-44a7-a95b-f985a873bc27'         
                    })
                    db.collection(removeChar()).doc('gallery').collection('gallery').add({
                        image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/gallery%2Fd867e8e7-b212-4b81-8b46-e09a2a60095c.png?alt=media&token=5a2d7111-8ee8-442e-9670-c76388590092'         
                      })
                      db.collection(removeChar()).doc('gallery').collection('gallery').add({
                        image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/gallery%2F06b1e055-cb0a-4d7b-bb04-5e6ef7164298.png?alt=media&token=87a120eb-0f7e-456a-80b0-afab85831b5e'         
                      })
                      db.collection(removeChar()).doc('gallery').collection('gallery').add({
                        image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/gallery%2F5e80a90a-8fb6-4acb-b4f5-825d673c49a7.png?alt=media&token=22c0ac2c-a2c5-45db-ae22-74e28ad4b306'         
                      })

           //POSTS

                  db.collection(removeChar()).doc('posts').collection('posts').add({
                       comments: [],
                       fclicks: '0',
                       wclicks: '0',
                       visits: '0',
                       image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/posts%2F25fc0b6f-4ff9-4c1a-a54d-61e438c06661.png?alt=media&token=2c3db425-6f93-4e8e-8abe-d76f8aa548ed',
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
                    image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/posts%2Fd2a746d0-a794-4586-a46b-e3c13036552c.png?alt=media&token=5cfc4caa-ec9c-40ec-be6e-b25513b7bb28',
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
                image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/posts%2F0e4f4495-badf-4143-9025-bfa0c61d96e6.png?alt=media&token=84a89320-7e03-4d1a-8f1a-7fd6d030d99b',
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
                 siteName: 'YOUR VANDORE SHOP'
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
               store: false
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
              userAuth: true
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
         image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/slider%2F67c04b5e-d106-4458-b6d4-4fa1f51f8a72.png?alt=media&token=1a6162d8-555a-4945-94dd-e9e19f378303'

     })
     db.collection(removeChar()).doc('slider').collection('slider').add({
        image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/slider%2F8b59799c-18f7-4d2c-a4ab-8f8750026b0d.png?alt=media&token=fe1e05dd-a2b6-4b60-a433-ead2b4449d6f'
        
    })
    db.collection(removeChar()).doc('slider').collection('slider').add({
        image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/slider%2Fdb775fff-1e7a-4864-8763-cb62b610715e.png?alt=media&token=6d6e6471-2ad2-4f3c-ba59-696a39ffcebe'
        
    })

  //SOCIAL
     db.collection(removeChar()).doc('social').collection('social').doc('social_links').set({
         facebookLink: 'https://www.facebook.com/Your-Vandore-Shop-100902161950215/',
         youtubeLink: 'https://www.youtube.com/embed/3aiB0qkZTM0',
         swiggyLink: '',
         zomatoLink: ''
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
             image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/products%2Fbd6dcf8d-35a4-4186-bd0b-05ea4069ff73.png?alt=media&token=2eb22a36-d4ea-42b7-8afa-b36bc4c7a183',
             name: 'Demo Discover Product 1',
             price: '170',
             rating: '5.5'
         },
         {
            available: true,
            description: 'This is a demo description',
            id: 'DHUDFVCTUBMGAZLXCRWU',
            image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/products%2Fc0eb55e8-f37a-4f5c-9b19-bb9237fd31b1.png?alt=media&token=7fda3695-346b-421d-85ca-ce12820862fc',
            name: 'Demo Discover Product 2',
            price: '250',
            rating: '5.5'
        },
        {
            available: true,
            description: 'This is a demo description',
            id: 'FODLLPAWFWOGUCXAGNBX',
            image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/products%2F4dc3f80d-7898-4b05-a401-c03a4e3f8a26.png?alt=media&token=7af8650c-a6ac-4503-b1d9-4f75d8ddb697',
            name: 'Demo Discover Product 3',
            price: '200',
            rating: '5.5'
        },
        {
            available: true,
            description: 'This is a demo description',
            id: 'FDYGANXYEBSXBTJFKDHH',
            image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/products%2Fc6f80f59-4ce3-41aa-9388-f801b8bb8863.png?alt=media&token=9a799121-491a-408e-ba99-4051ad026667',
            name: 'Demo Discover Product 4',
            price: '90',
            rating: '5.5'
        },
        {
            available: true,
            description: 'This is a demo description',
            id: 'TEOQYFZJEKRVAFIVEBOE',
            image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/products%2Ff95ed749-c963-4267-8040-33128b9f4005.png?alt=media&token=23e56a91-edd3-4ced-a759-dfbe99c82d5b',
            name: 'Demo Discover Product 5',
            price: '300',
            rating: '5.5'
        }]
     })


     db.collection(removeChar()).doc('store').collection('store').add({
        title: 'Demo',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        items: [{
            available: true,
            description: 'This is a demo description',
            id: 'CBHOPQFNNRWCOQYURJMS',
            image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/products%2Ffa8af720-2b40-44ff-a48f-363f2f990863.png?alt=media&token=e213fd05-5646-439c-b01e-c377ff694d76',
            name: 'Demo Product 1',
            price: '170',
            rating: '5.5'
        },
        {
           available: true,
           description: 'This is a demo description',
           id: 'JUPMNPCNSNSWCYGJOZBB',
           image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/products%2F27878a10-269c-4522-b3a4-d01fa458a7f9.png?alt=media&token=1ccb99da-bae4-4222-91a1-18a74ab5dd3f',
           name: 'Demo Product 2',
           price: '250',
           rating: '5.5'
       },
       {
           available: true,
           description: 'This is a demo description',
           id: 'INTJZBTHSHNAPARGYLHN',
           image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/products%2F655981a8-1620-41db-98a6-852aeca4242b.png?alt=media&token=e5ae7334-8885-4bae-890e-7d427a65d65d',
           name: 'Demo Product 3',
           price: '200',
           rating: '5.5'
       },
       {
           available: true,
           description: 'This is a demo description',
           id: 'UKLRUXTPQUICXENNWDCF',
           image: 'https://firebasestorage.googleapis.com/v0/b/restro-e4874.appspot.com/o/products%2Fa1bee3cd-d2b4-442e-a98d-cd85e54e8f2e.png?alt=media&token=af02defc-54de-45b6-937f-f8dbb384bf86',
           name: 'Demo Product 4',
           price: '90',
           rating: '5.5'
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
        link: '',
        image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
    })

    db.collection(removeChar()).doc('userList').collection('userList')
    .doc(auth.user.uid)
    .set({
        active: true,
        email: auth.user.email,
        name: name,
        phone: phone,
        business: removeChar(),
        link: '',
        address: address,
        image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
    })



/* ------------------------------------------------------------------------------------------                                */
                 

                    dbMain.collection('users')
                    .doc(auth.user.uid)
                    .collection('details')
                    .doc(`details_${auth.user.uid}`)
                    .set({
                        active: true,
                        name: name,
                        phone: phone,
                        address: address,
                        business: removeChar(),
                        link: '',
                        image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
                    })

                    dbMain.collection('userList')
                    .doc(auth.user.uid)
                    .set({
                        active: true,
                        email: auth.user.email,
                        name: name,
                        phone: phone,
                        business: removeChar(),
                        link: '',
                        address: address,
                        image: 'https://cdn0.iconfinder.com/data/icons/face-characters/512/happy_face_character-512.png'
                    })
                    
                    
                    history.push(`/restro/dashboard/${removeChar()}`)
                }
            })
            .catch(error => alert(error.message));
    }

    return (
        <div className="loginVandore">
   <div className='login__container'>
                    <h1>Sign-in</h1>
                    <form>
                       <h5>Your Brand {removeChar()}</h5>
                        <input type='text' value={name} onChange={e => setName(e.target.value)} />
                        <h5>Phone</h5>
                        <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
                        <h5>Address</h5>
                        <input type='text' value={address} onChange={e => setAddress(e.target.value)} />
                        <h5>E-mail</h5>
                        <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
                        <h5>Password</h5>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
    
                       
                    </form>
                    <p>
                      By signing-in you agree to the Vandore Conditions of Use 
                      & Sale. Please see our Privacy Notice,Our Cookies Notice
                      and our Interest-Based Ads
                      Notice.
                    </p>
                    <button
                    onClick={register}
                    className='login__registerButton'>Create Your Vandore Account</button>
                </div>
        </div>
    )
}

export default LoginVandore
