import { FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import React from 'react'
import { useState } from 'react';
import './PriceCard.scss'
import axios  from '../../axios';
import { useEffect } from 'react';
import { useStateValue } from '../../StateProvider';
import { dbMain } from '../../firebase';
import firebase from 'firebase';



const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

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



function PriceCard({plan}) {
    const classes = useStyles();
  const [clientSecret,setClientSecret]= useState(null);
  const [planMonth,setPlanMonth]= useState('1 Month');
  const [planMonthOne,setPlanMonthOne]= useState(1000);
  const [planMonthTwo,setPlanMonthTwo]= useState(2000);
  const [message,setMessage]= useState('');

  const [planSms,setPlanSms]= useState(100);
  const [planSmsPackage,setPlanSmsPackage]= useState(20);


  const [{user_details,user,site_info},dispatch]= useStateValue();
  const [open, setOpen] = useState(false);


  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {

        if(plan === 'plus') {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/razorpay?total=${planMonthOne}`
            });
            setClientSecret(response);
        }
        else if(plan === 'gold') {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/razorpay?total=${planMonthTwo}`
            });
            setClientSecret(response);
        }

        else if(plan === 'sms') {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/razorpay?total=${planSmsPackage}`
            });
            setClientSecret(response);
        }
    }

    getClientSecret();
}, [planMonthOne,planMonthTwo,planSmsPackage])


console.log(clientSecret);



  const handleChange = (event) => {
    if(plan === 'plus') {

        if(event.target.value === '1 Month'){
            setPlanMonthOne(1000);
            setMessage('');
        }
        else if (event.target.value === '3 Months'){
            setPlanMonthOne(2900);
            setMessage('We Provide Extra 3 Days For Free');

        }
        else if (event.target.value === '12 Months'){
            setPlanMonthOne(11000);
            setMessage('We Provide Extra 1 Month For Free');
        }

        setPlanMonth(event.target.value);
    }
    if(plan === 'gold') {

        if(event.target.value === '1 Month'){
            setPlanMonthTwo(2000);
            setMessage('');
        }
        else if (event.target.value === '3 Months'){
            setPlanMonthTwo(5800);
            setMessage('We Provide Extra 3 Days For Free');
        }
        else if (event.target.value === '12 Months'){
            setPlanMonthTwo(22000);
            setMessage('We Provide Extra 1 Month For Free');
        }

        setPlanMonth(event.target.value);
    }

    if(plan === 'sms') {
         
      if(event.target.value === 100) {
          setPlanSmsPackage(20);
      }
      else if(event.target.value === 300) {
        setPlanSmsPackage(60);
       }

       else if(event.target.value === 600) {
        setPlanSmsPackage(120);
       }
       setPlanSms(event.target.value);
    }
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };










  const sendSMS= async () => {
  
     let messageUser= '';
     if(plan === 'plus'){
       messageUser=`Hi ${user_details.name}, You Have Succesfully Updated `;
     }
     else if(plan === 'gold') {
       messageUser=``;
     }
     else if(plan === 'sms'){
       messageUser=``;
     }
     else if(plan === 'lite'){
      messageUser=``;
     }
     else if(plan === 'mail'){
      messageUser=``;
     }
     
   /*  const messageUser=`
    Hi ${user_details.name},Your Order For -${basket.map(item => item.title) }, With Order Id -${clientSecret.data.id} amounting to Rs.${clientSecret.data.amount / 100} has been Recieved on ${moment().format()}.You can track your order by clicking this link - vandore.in/vandore/${pageId.toUpperCase()}/orders . ${mode === 'Cash On Delivery' ? `Please Keep Rs.${clientSecret.data.amount / 100} for payment` : `We have Received the payment of Rs.${clientSecret.data.amount / 100}`}.`; */

 const SMS = await axios({
      method: 'post',
      // Stripe expects the total in a currencies subunits
      url: `/orderSMS?phone=${user_details.phone}&message=${messageUser}`
  });
   }

   const sendEmail= async () => {

    let messageUser= ``;
   
    /* const messageUser=`
    Hi ${user_details.name},Your Order For -${basket.map(item => item.title) }, With Order Id -${clientSecret.data.id} amounting to Rs.${clientSecret.data.amount / 100} has been Recieved on ${moment().format()}.You can track your order by clicking this link - vandore.in/vandore/${pageId.toUpperCase()}/orders . ${mode === 'Cash On Delivery' ? `Please Keep Rs.${clientSecret.data.amount / 100} for payment` : `We have Received the payment of Rs.${clientSecret.data.amount / 100}`}.`; */

 const EMAIL = await axios({
      method: 'post',
      
      url: `/orderEmail?email=ap8335235@gmail.com&message=${messageUser}&business=${site_info.siteName}&subject=Order Details From ${site_info.siteName}`
  });
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

              

              if(plan === 'plus'){
                dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
                    plan: plan,
                    duration: planMonth,
                    planActiveDate: firebase.firestore.FieldValue.serverTimestamp(),
                    planActive: true,
                    sms: 300
                  });

                  dbMain.collection('client_payments').add({
                    clientName: user_details.name,
                    clientPhone: user_details.phone,
                    clientEmail: user.email,
                    clientPlan: plan,
                    clientDuration: planMonth,
                    payment: planMonthOne,
                    payment_id: response.razorpay_payment_id
                })

              }
              else if(plan === 'gold') {
                dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
                    plan: plan,
                    duration: planMonth,
                    planActiveDate: firebase.firestore.FieldValue.serverTimestamp(),
                    planActive: true,
                    sms: 900
                  });

                  dbMain.collection('client_payments').add({
                    clientName: user_details.name,
                    clientPhone: user_details.phone,
                    clientEmail: user.email,
                    clientPlan: plan,
                    clientDuration: planMonth,
                    payment: planMonthTwo,
                    payment_id: response.razorpay_payment_id
                })
              }
              else if(plan === 'sms') {
                dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
                     sms: user_details.sms + planSms
                  });

                  dbMain.collection('client_payments').add({
                    clientName: user_details.name,
                    clientPhone: user_details.phone,
                    clientEmail: user.email,
                    clientPlan: plan,
                    payment: planSmsPackage,
                    payment_id: response.razorpay_payment_id
                })
              }

           

          
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
        <div className='priceCard' style={{backgroundColor: `${user_details.planActive && user_details.plan === plan ? '#1eba4a' : ''}`,minHeight: `${plan === 'sms' ? '315px' : ''}`}}>
            <h2 style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>{plan}</h2>

         <div className='priceCard__price'>
              <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Rs.</p>
              <span style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}> 
            {plan === 'free' ? `0` : ''}
            {plan === 'plus' ? `${planMonthOne}` : ''}
            {plan === 'gold' ? `${planMonthTwo}` : ''}
            {plan === 'sms' ? `${planSmsPackage}` : ''}
            </span>
          {}
             <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>/ {plan === 'plus' ? `${planMonth}` : ''}{plan === 'free' ? `14 Days` : ''}{plan === 'gold' ? `${planMonth}` : ''}{plan === 'sms' ? `${planSms} SMS` : ''}</p>
         </div>

         <div className='priceCard__info'>
             <span style={{color:  `${user_details.planActive && user_details.plan === plan ? 'black' : ''}`}}>{plan === 'free' ? `14 Day Limited Access To` : 'Full Access To'}</span>
             {plan === 'free' ? (
                 <>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Post Feed</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Digital Ecommerce</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Gallery</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Feedbacks/Ratings</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>User Authentication</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Site Analytics + Post Analytics</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Promotional Slider</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Facebook Timeline Integration</p>
                </>
             ) : ''}
              {plan === 'sms' ? (
                 <>
                <p>Feedbacks Messages</p>
                <p>Direct Mass Customer Messaging</p>
                <p>Orders acceppt/cancel messages</p>
                
                </>
             ) : ''}
              {plan === 'plus' ? (
                 <>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Post Feed</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Digital Ecommerce</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}} >Gallery</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Feedbacks/Ratings</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>User Authentication</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Site Analytics + Post Analytics</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Promotional Slider</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Facebook Timeline Integration</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Zomato And Swiggy Integration(optional)</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>SMS SUPPORT</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>300 FREE PROMOTIONAL MESSAGES</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>CUSTOM DOMAIN</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Online Payment (Net-Banking/Wallets/Upi)</p>

                </>
             ) : ''}

          {plan === 'gold' ? (
                 <>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Post Feed</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Digital Ecommerce</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Gallery</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Feedbacks/Ratings</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>User Authentication</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Site Analytics + Post Analytics</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Promotional Slider</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Facebook Timeline Integration</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>SMS SUPPORT</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>900 FREE PROMOTIONAL MESSAGES</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Zomato And Swiggy Integration(optional)</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>CUSTOM DOMAIN</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Online Payment (Net-Banking/Wallets/Upi)</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>No Vandore Watermark</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Exclusive Chat Channels</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>QR CODE Support</p>
                <p style={{color:  `${user_details.planActive && user_details.plan === plan ? 'white' : ''}`}}>Personal App</p>
                </>
             ) : ''}
         </div>
          






        <div className='priceCard__bottom'>

    {message != '' ? (
  <div className='priceCard__message'>
  {message}
  </div>  
    ) : ''}
  
    
    

   {plan === 'free' || plan === 'sms' ? '' : (
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Plan</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={planMonth}
          onChange={handleChange}
        >
         
          <MenuItem value='1 Month'>1 Month</MenuItem>
          <MenuItem value='3 Months'>3 Months</MenuItem>
          <MenuItem value='12 Months'>12 Months</MenuItem>
        </Select>
      </FormControl>
   )}

{plan === 'sms' ?  (
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Plan</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={planSms}
          onChange={handleChange}
        >
         
          <MenuItem value={100}>100 SMS</MenuItem>
          <MenuItem value={300}>300 SMS</MenuItem>
          <MenuItem value={600}>600 SMS</MenuItem>
        </Select>
      </FormControl>
   ) : ''}

  {plan === 'free' ? '' : (
   <div className='priceCard__bottom--button' onClick={displayRazorpay}>Buy {plan==='plus' ? 'Vandore + Subscription' : ''} {plan==='gold' ? 'Vandore Gold Subscription' : ''} {plan==='sms' ? 'SMS Recharge' : ''}</div>
  )}
  
     
        </div>
        


      


        </div>
    )
}

export default PriceCard
