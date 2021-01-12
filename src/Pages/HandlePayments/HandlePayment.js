import { Avatar, Modal } from '@material-ui/core';
import { Call, Delete, LocationOn, Menu, PaymentSharp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import { db, dbMain } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './HandlePayment.scss'
import PaymentSvg from '../../icons/undraw_Payments_re_77x0.svg';
import axios from '../../axios';

function HandlePayment({id}) {
  const [message,setMessage]= useState('');
  const [searchPayments,setSearchPayments]= useState('');
  const [payments,setPayments]= useState([]);
  const [{site_settings,single_guides,site_preview,sidebarVandore,user,user_details},dispatch]= useStateValue();
  const history= useHistory();
  const pageId= id;
  const [open,setOpen]= useState(false);
 const [currentVideo,setCurrentVideo]= useState('');

 const [openAlertDelete,setOpenAlertDelete]= useState(false);
 const [deleteMessage,setDeleteMessage]= useState('');
 const [deleteId,setDeleteId]= useState('');
 const openDeleteModal= (message,id) => {
     setDeleteMessage(message);
     setDeleteId(id);
     setOpenAlertDelete(true);
 } 


  const manageVideo= (link) => {
   setOpen(true);
   setCurrentVideo(link);
 }

 const handleGetStarted= () => {
  db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
      payment: true
  }).then(refreshPage);
}
 const refreshPage = ()=>{
  window.location.reload();  }
  

  useEffect(() => {
  
    db.collection(pageId.toUpperCase()).doc('payments').collection('payments')
    .onSnapshot(snapshot => (
        setPayments(snapshot.docs.map(doc => ({
            id: doc.id,
            email: doc.data().email,
            name: doc.data().name,
            phone: doc.data().phone,
            image: doc.data().image,
            address: doc.data().address,
            amount: doc.data().amount,
            created: doc.data().created,
        })))
    ))
   
    },[])

    const seen = new Set();

    let allUsers= payments.filter(payment => {
        const duplicate = seen.has(payment.phone);
        seen.add(payment.phone);
        return !duplicate;
      });


    const sendSMS= async () => {
    const SMS = await axios({
         method: 'post',
         // Stripe expects the total in a currencies subunits
         url: `/orderSMS?phone=${allUsers.map(user => user.phone)}&message=${message}`
     });
      }

    const handleMessage= () => {
      sendSMS();
      dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
       sms: user_details.sms - allUsers.length
      });
      setMessage('');
    }

   const filteredPayments= payments.filter(payment => 
    payment.name.toLowerCase().includes(searchPayments.toLowerCase()) || payment.phone.toLowerCase().includes(searchPayments.toLowerCase()) || payment.email.toLowerCase().includes(searchPayments.toLowerCase()));






    const deletePayment= (id) => {
        db.collection(pageId.toUpperCase()).doc('payments').collection('payments').doc(id).delete();
        setOpenAlertDelete(false);
    }

    return (
        <div className='handlePayment'>
          <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
          {site_preview.payment ? (
           <>
            <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>Payments</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>Payments</h1>
        </div>
           
           <div className='guide_toast'>
            <p>{site_settings.onlinePay ? 
            'To turn off online payment, go to settings and disable online payment' : 
            'Online Payment is disabled, go to settings and enable online payment'}</p> 
            <div  style={{cursor: 'pointer'}} onClick={() => history.push(`/restro/settings/${pageId}`)}>Settings</div>
           </div>
           <div className='guide_tutorial_toast'>
            <p>
            If you face any difficulties regarding online payments, then see our payment guides
            </p> 
            <div onClick={() => manageVideo(single_guides.payments)}>Guides</div>
           </div>

    <div className='userHolder'>
           <table className='handleUser__user'>
                     <tr>
                         <th>Customer</th>
                         <th>Amount</th>
                          
                         <th>Phone</th>
                         <th>Transaction Date</th>
                       
                         <th>Status</th>
                     </tr>

            {filteredPayments.map(payment => (
            
            <tr>
                    <td style={{display: 'flex',alignItems: 'center'}}><Avatar src={payment.image}  style={{marginRight: '5px'}}/>{payment.name}</td>
                    <td>Rs.{payment.amount*1 /100}</td>
                    <td>{payment.phone}</td>
                   
                    <td>{new Date(payment.created?.toDate()).toUTCString()}</td>
                   
                    <td>
                    <div onClick={() => openDeleteModal('this payment bill',payment.id)} >
                      <Delete />  
                   </div>
                   </td>
           </tr> 
       
            ))}
                     
                 </table>
                 </div>


                 <div className='dashboard__headerTitle'  style={{margin: '10px auto',width: '93%'}}>
       Search Users Based On Names,Phone,Email
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',margin: '0 auto',width: '90%'}} >
       Search Your Users,Start By Typing Name Or Phone Or Email.
       
     </div>
    

                 <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter User Name' value={searchPayments} onChange={e => setSearchPayments(e.target.value)} />
            </div>
                
           </div>



      
    <div className='dashboard__headerTitle'  style={{margin: '0 auto',width: '93%'}}>
       Send Promotional Message To Your Customers Who Pays Online
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',margin: '0 auto',width: '90%'}} >
       Send your online customers  who pays you online, about your new offers, may be greet them or ask for feedbacks.
       
     </div>
     {user_details.sms < allUsers.length ? (
          <div className='deleteAccount' style={{margin: '0 auto',width: '90%',color: 'green'}} >
         You Don't Have Enough SMS Credits To Send Promotional Messages To All Users, Go To Pricing Tab To Buy Some SMS Credits
          
        </div>
     ) : (
        <div className='deleteAccount' style={{color: 'green',margin: '0 auto',width: '90%'}} >
       By Sending Promotional Messages To All Users You Will Spend {allUsers.length} SMS Credits in Total
        
      </div>
     )}



                 <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter Your Message' value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            {user_details.sms < allUsers.length ? (
                 <button style={{backgroundColor: 'gray'}} onClick={()=>{}}>Buy Credits</button>
            ) : (
                <button disabled={user_details.sms < allUsers.length} onClick={handleMessage}>Submit</button>
            )}
               
           </div>
                 <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={openAlertDelete}
onClose={() => setOpenAlertDelete(false)}
aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
   Do You Want to Delete {deleteMessage} ?
 </div>
 <div style={{display: 'flex',justifyContent: 'space-around'}}>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={() => deletePayment(deleteId)}>
   yes
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={()=> {setOpenAlertDelete(false); setDeleteMessage(''); setDeleteId('')}}>
   no
 </div>
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
                         <h1>Manage Your Payments</h1>
                         <h3>In-payment options are available on your E-commerce for receiving online payments.</h3>
                   
                          <div className='site_preview--getStarted' onClick={handleGetStarted}>
                             Get Started
                          </div>
                      </div>

                      <div className='site_preview--topContainer--right'>
                           <img src={PaymentSvg} style={{fill:"#FFFFFF"}} />
                      </div>
              </div>
           </div>
           <div className='guide__learn--more'>
               Learn More
          </div>
           <div className='site_preview--guide'>
              <div className='site_preview--guide--left'>
              <img src={PaymentSvg} style={{fill:"#FFFFFF"}} />
              <h4>In-payment options are available on your E-commerce for receiving online payments.</h4>
              </div>
              <div className='site_preview--guide--right'>
                <iframe src={single_guides.payments} />
              </div>
          </div>
          </div>
          )}  
        </div>
    )
}

export default HandlePayment
