import React, { useState, useEffect } from 'react';
import './Payment.scss';
import { useStateValue } from "../../StateProvider";

import { Link, useHistory } from "react-router-dom";


import { getBasketTotal } from "../../reducer";
import axios from '../../axios';
import { db, dbMain } from '../../firebase';
import moment from 'moment';
import firebase from 'firebase';
import { Avatar } from '@material-ui/core';
import { Fastfood, Home, LocalActivity, PaymentOutlined, PeopleAltOutlined, Phone, PhotoAlbum, Store } from '@material-ui/icons';
import Sidebar from '../../components/Sidebar/Sidebar';
import Social from '../../components/Social/Social';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}





function Payment({pageId}) {
    const [{ basket,site_info, user,user_details,site_settings,applied_coupon,final_price ,site_colors,sidebar,brand,order_notification}, dispatch] = useStateValue();
    const history = useHistory();
   
    const [error, setError] = useState(null);
    
    const [clientSecret, setClientSecret] = useState(null);
    const [orders,setOrders]= useState('');
    const [onlinePayment,setOnlinePayment]= useState('');
  

    console.log('payment status',site_settings.onlinePay);





    const sendSMS= async (mode) => {
  
      const messageUser=`
      Hi ${user_details.name},Your Order For -${basket.map(item => item.title) }, With Order Id -${clientSecret.data.id} amounting to Rs.${clientSecret.data.amount / 100} has been Recieved on ${moment().format()}.You can track your order by clicking this link - vandore.in/vandore/${pageId.toUpperCase()}/orders . ${mode === 'Cash On Delivery' ? `Please Keep Rs.${clientSecret.data.amount / 100} for payment` : `We have Received the payment of Rs.${clientSecret.data.amount / 100}`}.`;

   const SMS = await axios({
        method: 'post',
        // Stripe expects the total in a currencies subunits
        url: `/orderSMS?phone=${user_details.phone}&message=${messageUser}`
    });
     }

     const sendEmail= async (mode) => {
     
      const messageUser=`
      Hi ${user_details.name},Your Order For -${basket.map(item => item.title) }, With Order Id -${clientSecret.data.id} amounting to Rs.${clientSecret.data.amount / 100} has been Recieved on ${moment().format()}.You can track your order by clicking this link - vandore.in/vandore/${pageId.toUpperCase()}/orders . ${mode === 'Cash On Delivery' ? `Please Keep Rs.${clientSecret.data.amount / 100} for payment` : `We have Received the payment of Rs.${clientSecret.data.amount / 100}`}.`;

   const EMAIL = await axios({
        method: 'post',
        
        url: `/orderEmail?email=ap8335235@gmail.com&message=${messageUser}&business=${site_info.siteName}&subject=Order Details From ${site_info.siteName}`
    });

   
     }

    /* useEffect(() => {
     
      db.collection(pageId).doc('site_orders_notification').collection("site_orders_notification").doc(`orders`)
      .get()
      .then(function(doc) {
        if (doc.exists) {
           setOrderNotification(doc.data().order);
        } else {
          // doc.data() will be undefined in this case
         
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
 
   },[]) */



   useEffect(() => {
     
    dbMain.collection('brands').doc(pageId.toUpperCase())
    .get()
    .then(function(doc) {
      if (doc.exists) {
         setOnlinePayment(doc.data().payment);
      } else {
        // doc.data() will be undefined in this case
       
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

 },[])



    useEffect(() => {
     
        db.collection(pageId).doc('OrdersAnalytics').collection("OrdersAnalytics").doc(`${moment(new Date()).format('DD-MM-YYYY')}`)
        .get()
        .then(function(doc) {
          if (doc.exists) {
             setOrders(doc.data().orders);
          } else {
            // doc.data() will be undefined in this case
           
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
   
     },[])

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/razorpay?total=${final_price}`
            });
            setClientSecret(response);
        }

        getClientSecret();
    }, [basket])

    
   
    const payOff = (mode) => {

      if(site_settings.orderMessage){
        sendSMS(mode);
      }
      if(site_settings.orderEmail){
        sendEmail(mode);
      }
     
      

   const docId= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        db.collection(pageId).doc('users').collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(docId)
        .set({
            basket: basket,
            amount: final_price,
            coupon: applied_coupon,
            couponid: applied_coupon ? applied_coupon.id : 'none',
            couponDiscount: applied_coupon ? applied_coupon.coupon.discount : 'none',
            created: firebase.firestore.FieldValue.serverTimestamp(),
            delivered: false,
            mode: mode,
            cancelled: false
        })
        
        if(applied_coupon){
          db.collection(pageId).doc('orders').collection('orders')
          .add({
            basket: basket,
            amount: final_price,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            name: user_details.name,
            email: user.email,
            user_id: user.uid,
            image: user_details.image,
            mode: mode,
            payment_id: mode,
            phone: user_details.phone,
            address: user_details.address,
            coupon: applied_coupon,
            couponid: applied_coupon ? applied_coupon.id : 'none',
            couponDiscount: applied_coupon ? applied_coupon.coupon.discount : 'none',
            delivered: false,
            docId: docId,
            cancelled: false,
            applied_coupon: applied_coupon
        })

        }else{
          db.collection(pageId).doc('orders').collection('orders')
          .add({
            basket: basket,
            amount: final_price,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            name: user_details.name,
            email: user.email,
            user_id: user.uid,
            image: user_details.image,
            payment_id: mode,
            phone: user_details.phone,
            address: user_details.address,
            coupon: applied_coupon,
            mode: mode,
            couponid: applied_coupon ? applied_coupon.id : 'none',
            couponDiscount: applied_coupon ? applied_coupon.coupon.discount : 'none',
            delivered: false,
            docId: docId,
            cancelled: false
        })

        }

        if(orders==''){
          db.collection(pageId).doc('OrdersAnalytics').collection('OrdersAnalytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).set({
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              orders: '1'
            })
      }else{
          db.collection(pageId).doc('OrdersAnalytics').collection('OrdersAnalytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).update({
              orders: `${orders*1 + 1}`
            })
      }

        db.collection(pageId).doc('site_orders_notification').collection('site_orders_notification').doc('orders').update({
          order: order_notification + 1
        });

        if(applied_coupon){
          db.collection(pageId).doc('coupons').collection('coupons').doc(applied_coupon.id).update({
            minUser: `${(applied_coupon.coupon.minUser*1) - 1}`
          });
        }

        dispatch({
          type: 'ADD_FINAL_PRICE',
          final_price: 0
      })

       dispatch({
         type: 'ADD_APPLIED_COUPON',
         applied_coupon: null
       })

        dispatch({
            type: 'EMPTY_BASKET'
        })
        history.replace(`/vandore/${pageId}/orders`)
    }
  

   

    const __DEV__ = document.domain === 'localhost'

    async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}


   


		const options = {
			key: __DEV__ ? 'rzp_test_Yw9rV4usIyk5O1' : 'PRODUCTION_KEY',
			currency: clientSecret.data.currency,
			amount: clientSecret.data.amount.toString(),
			order_id: clientSecret.data.id,
			name: 'Buy',
			description: 'Amount Charged For Your Order',
			handler: function async (response) {
			/* 	alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
                alert(response.razorpay_signature) */

               

          

               if(site_settings.orderMessage){
                sendSMS('Online Payment');
              }
              if(site_settings.orderEmail){
                sendEmail('Online Payment');
              }

                db.collection(pageId).doc('users').collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(response.razorpay_payment_id)
                .set({
                    basket: basket,
                    amount: clientSecret.data.amount.toString(),
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    delivered: false,
                    cancelled: false
                })
                
                if(applied_coupon){
                  db.collection(pageId).doc('orders').collection('orders')
                  .add({
                    basket: basket,
                    amount: clientSecret.data.amount.toString(),
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    name: user_details.name,
                    email: user.email,
                    user_id: user.uid,
                    payment_id: response.razorpay_payment_id,
                    phone: user_details.phone,
                    image: user_details.image,
                    address: user_details.address,
                    coupon: applied_coupon,
                    couponid: applied_coupon ? applied_coupon.id : 'none',
                    couponDiscount: applied_coupon ? applied_coupon.coupon.discount : 'none',
                    delivered: false,
                    docId: response.razorpay_payment_id,
                    cancelled: false,
                    applied_coupon: applied_coupon
                })
                }else{
                db.collection(pageId).doc('orders').collection('orders')
                  .add({
                    basket: basket,
                    amount: clientSecret.data.amount.toString(),
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    name: user_details.name,
                    email: user.email,
                    user_id: user.uid,
                    payment_id: response.razorpay_payment_id,
                    phone: user_details.phone,
                    image: user_details.image,
                    address: user_details.address,
                    delivered: false,
                    coupon: applied_coupon,
                    couponid: applied_coupon ? applied_coupon.id : 'none',
                    couponDiscount: applied_coupon ? applied_coupon.coupon.discount : 'none',
                    docId: response.razorpay_payment_id,
                    cancelled: false
                })
              }
    
                db.collection(pageId).doc('payments').collection('payments')
                .add({
                  amount: clientSecret.data.amount.toString(),
                  created: firebase.firestore.FieldValue.serverTimestamp(),
                  name: user_details.name,
                  image: user_details.image,
                  email: user.email,
                  coupon: applied_coupon,
                  couponid: applied_coupon ? applied_coupon.id : 'none',
                  couponDiscount: applied_coupon ? applied_coupon.coupon.discount : 'none',
                  phone: user_details.phone,
                  address: user_details.address
              })
    
              if(orders==''){
              
                db.collection(pageId).doc('OrdersAnalytics').collection('OrdersAnalytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).set({
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    orders: '1'
                  })
            }else{
                db.collection(pageId).doc('OrdersAnalytics').collection('OrdersAnalytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).update({
                    orders: `${orders*1 + 1}`
                  })
            }
    
            db.collection(pageId).doc('site_orders_notification').collection('site_orders_notification').doc('orders').update({
              order: order_notification + 1
            });
                
          if(applied_coupon){
            db.collection(pageId).doc('coupons').collection('coupons').doc(applied_coupon.id).update({
              minUser: `${(applied_coupon.coupon.minUser*1) - 1}`
            });
          }

          dispatch({
            type: 'ADD_FINAL_PRICE',
            final_price: 0
        })

         dispatch({
           type: 'ADD_APPLIED_COUPON',
           applied_coupon: null
         })
             
                
                dispatch({
                    type: 'EMPTY_BASKET'
                })
    
    
                history.replace(`/vandore/${pageId}/orders`)
			},
			prefill: {
				name: user_details.name,
				email: user.email,
				phone_number: user_details.phone
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
  }
  
  if(brand.plan === 'lite' || !site_settings.store || basket.length === 0 || !final_price){
    history.push(`/${pageId}`);
  }

  
    return (
        <div className='payment'>
    <Sidebar pageId={pageId} />
  <div className='paymentMobile'>
      {sidebar ? <SidebarMobile pageId={pageId} /> : (
  <div className='payment__page'>
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
  <div className='payment__container'>
        <div className='checkout__products--title'>
                  Payment and Delivery
               </div>
              
          <div className='payment__details'>
          <div className='payment__profile'>
                 <div className='payment__profile--left'>
                   <img src={user_details.image}  />
                   <h3 style={{color: `${site_colors.icons}`}}>{user_details.name}</h3>
                 </div>
                 <div className='payment__profile--right'>
                     {user_details != '' ? user_details?.address : ''}
                     <div className='payment__profile--right--button' style={{backgroundColor: `${site_colors.button}`}} onClick={() => history.push('/user')}>
                      Change details
                     </div>
                     </div>
             </div>

              <div className='payment__option'>
              <div className='checkout__products--title'>
                 Choose Your Payment Method
               </div>
               <div className='payment__option--price' style={{backgroundColor: `${site_colors.primary}`}}>
                   <h3>ORDER TOTAL:</h3>
                   <h3 style={{marginRight: '10px'}}>Rs.{getBasketTotal(basket)}</h3>
               </div>
               {applied_coupon ? (
                 <div className='payment__option--price' style={{backgroundColor: `${site_colors.primary}`}}>
                 <h3>Coupon Applied {applied_coupon.id}</h3>
                 <h3 style={{marginRight: '10px'}}>{applied_coupon.coupon.type === 'Discount Percentage' ? `${applied_coupon.coupon.discount} % off on basket total` : `${applied_coupon.coupon.discount} Rs. off on basket total`}</h3>
                 </div>
               ) : ''}
               {site_info.delivery && (site_info.deliveryAbove*1) < getBasketTotal(basket)? (
                 <div className='payment__option--price' style={{backgroundColor: `${site_colors.primary}`}}>
                 <h3>Delivery Charges:</h3>
                 <h3 style={{marginRight: '10px'}}>Rs.{site_info.delivery}</h3>
                 </div>
               ) : ''}
               {site_info.tax ? (
                 <div className='payment__option--price' style={{backgroundColor: `${site_colors.primary}`}}>
                 <h3>Tax Rate:</h3>
                 <h3 style={{marginRight: '10px'}}>{site_info.tax}</h3>
             </div>
               ) : ''}
               <div className='payment__option--price' style={{backgroundColor: `${site_colors.primary}`}}>
                   <h3>Total:</h3>
                   <h3 style={{marginRight: '10px'}}>Rs.{final_price}</h3>
               </div>
               <div className='payment__profile'>
                 <div className='payment__profile--left'>
                   <PaymentOutlined style={{marginRight: '5px'}}/>
                   Payment
                 </div>
                 <div className='payment__profile--right'>
                 {site_settings.onlinePay && onlinePayment ? (
                      <div className='payment__profile--right--button' onClick={displayRazorpay} style={{backgroundColor: `${site_colors.button}`}}>
                       Pay now
                      </div>
                   ) : ''}
                   {site_settings.cashOnDel ? (
                      <div className='payment__profile--right--button' onClick={() => payOff('Cash On Delivery')} style={{backgroundColor: `${site_colors.button}`}}>
                       Cash on delivery
                      </div>
                   ) : ''}
                   {site_settings.takeAway ? (
                      <div className='payment__profile--right--button' onClick={() => payOff('Take Away')} style={{backgroundColor: `${site_colors.button}`}}>
                       Take Away
                      </div>
                   ) : ''}
                    

                    
                     </div>
             </div>
           
              </div>
          </div>
            
       </div>     
    


  </div>
      )}

  </div>

  <div className='paymentPc'>
  <div className='payment__page'>
    <div className='payment__container'>
          <div className='checkout__products--title'>
                    Payment and Delivery
                 </div>
                
            <div className='payment__details'>
            <div className='payment__profile'>
                   <div className='payment__profile--left'>
                     <img src={user_details.image}  />
                     <h3 style={{color: `${site_colors.icons}`}}>{user_details.name}</h3>
                   </div>
                   <div className='payment__profile--right'>
                       {user_details != '' ? user_details?.address : ''}
                       <div className='payment__profile--right--button' style={{backgroundColor: `${site_colors.button}`}} onClick={() => history.push('/user')}>
                        Change details
                       </div>
                       </div>
               </div>

                <div className='payment__option'>
                <div className='checkout__products--title'>
                   Choose Your Payment Method
                 </div>
                 <div className='payment__option--price' style={{backgroundColor: `${site_colors.primary}`}}>
                   <h3>ORDER TOTAL:</h3>
                   <h3 style={{marginRight: '10px'}}>Rs.{getBasketTotal(basket)}</h3>
               </div>
               {applied_coupon ? (
                 <div className='payment__option--price' style={{backgroundColor: `${site_colors.primary}`}}>
                 <h3>Coupon Applied <span>{applied_coupon.id}</span></h3>
                 <h3 style={{marginRight: '10px'}}>{applied_coupon.coupon.type === 'Discount Percentage' ? `${applied_coupon.coupon.discount} % off on basket total` : `${applied_coupon.coupon.discount} Rs. off on basket total`}</h3>
                 </div>
               ) : ''}
               {site_info.delivery && (site_info.deliveryAbove*1) > getBasketTotal(basket)? (
                 <div className='payment__option--price' style={{backgroundColor: `${site_colors.primary}`}}>
                 <h3>Delivery Charges:</h3>
                 <h3 style={{marginRight: '10px'}}>Rs.{site_info.delivery}</h3>
                 </div>
               ) : ''}
               {site_info.tax ? (
                 <div className='payment__option--price' style={{backgroundColor: `${site_colors.primary}`}}>
                 <h3>Tax Rate:</h3>
                 <h3 style={{marginRight: '10px'}}>{site_info.tax}%</h3>
             </div>
               ) : ''}
               <div className='payment__option--price' style={{backgroundColor: `${site_colors.primary}`}}>
                   <h3>Total:</h3>
                   <h3 style={{marginRight: '10px'}}>Rs.{final_price}</h3>
               </div>
                 <div className='payment__profile'>
                   <div className='payment__profile--left'>
                     <PaymentOutlined style={{marginRight: '5px'}}/>
                     Payment
                   </div>
                   <div className='payment__profile--right'>
                   {site_settings.onlinePay ? (
                        <div className='payment__profile--right--button' onClick={displayRazorpay} style={{backgroundColor: `${site_colors.button}`}}>
                         Pay now
                        </div>
                     ) : ''}
                     {site_settings.cashOnDel ? (
                        <div className='payment__profile--right--button' onClick={() => payOff('Cash On Delivery')} style={{backgroundColor: `${site_colors.button}`}}>
                         Cash on delivery
                        </div>
                     ) : ''}
                     {site_settings.takeAway ? (
                        <div className='payment__profile--right--button' onClick={() => payOff('Take Away')} style={{backgroundColor: `${site_colors.button}`}}>
                         Take Away
                        </div>
                     ) : ''}
                      

                      
                       </div>
               </div>
             
                </div>
            </div>
              
         </div>     
      


    </div>
  </div>
          
                                   {/*  <button onClick={displayRazorpay} >
                                       Buy Now
                                    </button>
                                    <button onClick={() => payOff('Cash On Delivery')}>
                                        Cash On Delivery
                                    </button>
                                    <button onClick={() => payOff('Take Away')}>
                                        Take Away
                                    </button> */}
        <Social />
                             
        </div>
    )
}

export default Payment
