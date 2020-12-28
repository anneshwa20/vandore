import React, { useState, useEffect } from 'react';
import './Payment.scss';
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../reducer";
import axios from '../../axios';
import { db } from '../../firebase';
import moment from 'moment';
import firebase from 'firebase';
import { Avatar } from '@material-ui/core';
import { LocalActivity, PaymentOutlined, Phone } from '@material-ui/icons';
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





function Payment() {
    const [{ basket, user,user_details,site_settings ,site_colors,sidebar}, dispatch] = useStateValue();
    const history = useHistory();
   
    const [error, setError] = useState(null);
    
    const [clientSecret, setClientSecret] = useState(null);
    const [orders,setOrders]= useState('');
    const [ordersNotification,setOrderNotification]= useState(0);

    useEffect(() => {
     
      db.collection("site_orders_notification").doc(`orders`)
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
 
   },[])




    useEffect(() => {
     
        db.collection("OrdersAnalytics").doc(`${moment(new Date()).format('DD-MM-YYYY')}`)
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
                url: `/razorpay?total=${getBasketTotal(basket)}`
            });
            setClientSecret(response);
        }

        getClientSecret();
    }, [basket])

    
   
    const payOff = (mode) => {



        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
        .set({
            basket: basket,
            amount: clientSecret.data.amount.toString(),
            created: firebase.firestore.FieldValue.serverTimestamp(),
            delivered: false,
            cancelled: false
        })
        
        db.collection('orders')
          .add({
            basket: basket,
            amount: clientSecret.data.amount.toString(),
            created: firebase.firestore.FieldValue.serverTimestamp(),
            name: user_details.name,
            email: user.email,
            user_id: user.uid,
            image: user_details.image,
            payment_id: mode,
            phone: user_details.phone,
            address: user_details.address,
            delivered: false,
            cancelled: false
        })

        if(orders==''){
            db.collection('OrdersAnalytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).set({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                orders: '1'
              })
        }else{
            db.collection('OrdersAnalytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).set({
                orders: `${orders*1 + 1}`
              })
        }

        db.collection('site_orders_notification').doc('orders').update({
          order: ordersNotification + 1
        });

        dispatch({
            type: 'EMPTY_BASKET'
        })
        history.replace('/orders')
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
			handler: function (response) {
			/* 	alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
                alert(response.razorpay_signature) */
                db.collection('users')
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
                
                db.collection('orders')
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
                    cancelled: false
                })
    
                db.collection('payments')
                .add({
                  amount: clientSecret.data.amount.toString(),
                  created: firebase.firestore.FieldValue.serverTimestamp(),
                  name: user_details.name,
                  image: user_details.image,
                  email: user.email,
                  phone: user_details.phone,
                  address: user_details.address
              })
    
              if(orders==''){
                db.collection('OrdersAnalytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).set({
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    orders: '1'
                  })
            }else{
                db.collection('OrdersAnalytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).set({
                    orders: `${orders*1 + 1}`
                  })
            }
    
                
    
                dispatch({
                    type: 'EMPTY_BASKET'
                })
    
    
                history.replace('/orders')
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

  
    return (
        <div className='payment'>
    <Sidebar />
  <div className='paymentMobile'>
      {sidebar ? <SidebarMobile /> : (
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
