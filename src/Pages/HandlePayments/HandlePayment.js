import { Avatar, Modal } from '@material-ui/core';
import { Call, Delete, LocationOn, Menu, PaymentSharp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './HandlePayment.scss'
import PaymentSvg from '../../icons/undraw_Payments_re_77x0.svg';

function HandlePayment() {
  const [payments,setPayments]= useState([]);
  const [{site_settings,single_guides,site_preview,sidebarVandore},dispatch]= useStateValue();
  const history= useHistory();

  const [open,setOpen]= useState(false);
  const [currentVideo,setCurrentVideo]= useState('');
  const manageVideo= (link) => {
   setOpen(true);
   setCurrentVideo(link);
 }

 const handleGetStarted= () => {
  db.collection('site').doc('site_preview').update({
      payment: true
  }).then(refreshPage);
}
 const refreshPage = ()=>{
  window.location.reload();  }
  

  useEffect(() => {
  
    db.collection('payments')
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

    const deletePayment= (id) => {
        db.collection('payments').doc(id).delete().then(alert('deleted'));
    }

    return (
        <div className='handlePayment'>
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
            <div  style={{cursor: 'pointer'}} onClick={() => history.push('/restro/settings')}>Settings</div>
           </div>
           <div className='guide_tutorial_toast'>
            <p>
            If you face any difficulties regarding online payments, then see our payment guides
            </p> 
            <div onClick={() => manageVideo(single_guides.payments)}>Guides</div>
           </div>

           <table className='handleUser__user'>
                     <tr>
                         <th>Customer</th>
                         <th>Amount</th>
                          
                         <th>Phone</th>
                         <th>Transaction Date</th>
                       
                         <th>Status</th>
                     </tr>

            {payments.map(payment => (
            
            <tr>
                    <td style={{display: 'flex',alignItems: 'center'}}><Avatar src={payment.image}  style={{marginRight: '5px'}}/>{payment.name}</td>
                    <td>Rs.{payment.amount*1 /100}</td>
                    <td>{payment.phone}</td>
                   
                    <td>{new Date(payment.created?.toDate()).toUTCString()}</td>
                   
                    <td>
                    <div onClick={() => deletePayment(payment.id)} >
                      <Delete />  
                   </div>
                   </td>
           </tr> 
       
            ))}
                     
                 </table>
           
         
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
                         <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
                   
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
              <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
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
