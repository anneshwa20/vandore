import React from 'react'
import './Restro.scss'
import SidebarRestro from '../../components/SidebarRestro/SidebarRestro'
import HandlePost from '../HandlePost/HandlePost'
import HandleStore from '../HandleStore/HandleStore'
import HandleOrders from '../HandleOrders/HandleOrders'
import HandleSlider from '../HandleSlider/HandleSlider'
import HandleAbout from '../HandleAbout/HandleAbout'
import HandleFeedback from '../HandleFeedback/HandleFeedback'
import HandleGallery from '../HandleGallery/HandleGallery'
import HandleCategory from '../HandleCategory/HandleCategory'
import HandleUser from '../HandleUser/HandleUser'
import HandlePayment from '../HandlePayments/HandlePayment'
import HandleDashboard from '../HandleDashboard/HandleDashboard'
import HandleSettings from '../HandleSettings/HandleSettings'
import HandleGuide from '../HandleGuide/HandleGuide'
import { useStateValue } from '../../StateProvider'
import { db } from '../../firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import { Modal } from '@material-ui/core'
import ReactAudioPlayer from 'react-audio-player'
import notification from '../../audio/notification.ogg'
import { useHistory } from 'react-router-dom'
import StateFill from './../StateFill'


function Restro(props) {
    const [{sidebarVandore,user,user_details},dispatch]= useStateValue();
    const [orderNotifications,setOrderNotification]= useState(0);
    const history= useHistory();
    const [show,setShow]= useState(true);

    const id= props.match.params.id;


     useEffect(() => {
        db.collection(id.toUpperCase()).doc('site_orders_notification').collection("site_orders_notification").doc("orders")
        .onSnapshot(function(doc) {
            setOrderNotification(doc.data().order);
        });
    },[]); 


    
       
        
    
    
   
         
 
    console.log(orderNotifications);

    const handleNotification= () => {
        db.collection(id.toUpperCase()).doc('site_orders_notification').collection('site_orders_notification').doc('orders').update({
            order: 0
        });

        history.push(`/restro/orders/${id}`);
    }

    return (
        <>
      <StateFill authorization='restro' id={id.toUpperCase()} />
    
 <div className='restro'>
     
 <div className='vandoreMobile'>
     {sidebarVandore ? <SidebarRestro id={id} active={props.match.params.page} /> : ''}
     {orderNotifications > 0 ? (
         <div className='notification__page'>
         <ReactAudioPlayer
         src={notification}
         autoPlay
         
      />
           <div className='notification__content'>
               {orderNotifications === 1 ?  <h2>You Have {orderNotifications} New Order</h2> :  <h2>You Have {orderNotifications} New Orders</h2>}
               
               <div className='notification__content--button' onClick={handleNotification}>
                     OK
                </div>
           </div>
    </div>
     ) : (
      <>

{props.match.params.page === 'post' ? <HandlePost id={id}/> : ''}
{props.match.params.page === 'store' ? <HandleStore id={id}/> : ''}
{props.match.params.page === 'orders' ? <HandleOrders id={id}/> : ''}
{props.match.params.page === 'slider' ? <HandleSlider id={id}/> : ''}
{props.match.params.page === 'about' ? <HandleAbout id={id}/> : ''}
{props.match.params.page === 'feedback' ? <HandleFeedback id={id}/> : ''}
{props.match.params.page === 'gallery' ? <HandleGallery id={id}/> : ''}
{props.match.params.page === 'users' ? <HandleUser id={id}/> : ''}
{props.match.params.page === 'payments' ? <HandlePayment id={id}/> : ''}
{props.match.params.page === 'dashboard' ? <HandleDashboard id={id}/> : ''}
{props.match.params.page === 'settings' ? <HandleSettings id={id}/> : ''}
{props.match.params.page === 'guides' ? <HandleGuide  id={id}/> : ''}
      </>
     )}

 </div>
 <div className='vandorePc'>
 <SidebarRestro  id={id} active={props.match.params.page} />
 {orderNotifications > 0 ? (
     <div className='notification__page'>
         <ReactAudioPlayer
         src={notification}
         autoPlay
         
      />
           <div className='notification__content'>
               {orderNotifications === 1 ?  <h2>You Have {orderNotifications} New Order</h2> :  <h2>You Have {orderNotifications} New Orders</h2>}
               
               <div className='notification__content--button' onClick={handleNotification}>
                     OK
                </div>
           </div>
    </div>
 ) : (
<>
{props.match.params.page === 'post' ? <HandlePost id={id}/> : ''}
{props.match.params.page === 'store' ? <HandleStore id={id}/> : ''}
{props.match.params.page === 'orders' ? <HandleOrders id={id}/> : ''}
{props.match.params.page === 'slider' ? <HandleSlider id={id}/> : ''}
{props.match.params.page === 'about' ? <HandleAbout id={id}/> : ''}
{props.match.params.page === 'feedback' ? <HandleFeedback id={id}/> : ''}
{props.match.params.page === 'gallery' ? <HandleGallery id={id}/> : ''}
{props.match.params.page === 'users' ? <HandleUser id={id}/> : ''}
{props.match.params.page === 'payments' ? <HandlePayment id={id}/> : ''}
{props.match.params.page === 'dashboard' ? <HandleDashboard id={id}/> : ''}
{props.match.params.page === 'settings' ? <HandleSettings id={id}/> : ''}
{props.match.params.page === 'guides' ? <HandleGuide  id={id}/> : ''}
</>
 ) }

 </div>



 </div>
  
       
        </>
    )
}

export default Restro
