import React from 'react'
import './Order.scss'
import moment from "moment"
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import { db } from '../../firebase'
import { useStateValue } from '../../StateProvider'
import { Modal } from '@material-ui/core'
import { useState } from 'react'
import axios from '../../axios';


function Order({order,handleDelete,delivery,cancel,handleModal,pageId}) {
    const [{site_colors},dispatch]= useStateValue();
    const [openAlertDelete,setOpenAlertDelete]= useState(false);
    const [deleteMessage,setDeleteMessage]= useState('');
    const [deleteId,setDeleteId]= useState('');
    const openDeleteModal= (message,id) => {
        setDeleteMessage(message);
        setDeleteId(id);
        setOpenAlertDelete(true);
    }
 
 


    const orderDelete= () => {
        db.collection(pageId.toUpperCase()).doc('orders').collection('orders').doc(order.id).delete();

        handleModal(false);
        setOpenAlertDelete(false);
    }

    const handleDelivery= () => {
        db.collection(pageId.toUpperCase()).doc('orders').collection('orders').doc(order.id).update({
            delivery: true
        })

        db.collection(pageId.toUpperCase()).doc('users').collection('users').doc(order.data.user_id).collection('orders').doc(order.data.docId).update({
            delivery: true
        })

        handleModal(false);
    }

    const sendSMS= async () => {
        const messageUser=`Hi ${order.data.name}, Your order for - ${order.data.basket.map(item => item.title)}, has been cancelled due to some internal errors. We are extremely sorry for the inconvinience.`;
  
     const SMS = await axios({
          method: 'post',
          // Stripe expects the total in a currencies subunits
          url: `/orderSMS?phone=${order.data?.phone}&message=${messageUser}`
      });
       }
 
    const handleCancelletion = () => {
        db.collection(pageId.toUpperCase()).doc('orders').collection('orders').doc(order.id).update({
             cancelled: true
        })
        db.collection(pageId.toUpperCase()).doc('users').collection('users').doc(order.data.user_id).collection('orders').doc(order.data.docId).update({
            cancelled: true
        })

        sendSMS();

        handleModal(false);


        
    }


    return (
        <div className='order'>
             <h2>Order</h2>
             <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
             <div className='order__customer'>
             <small>{order.data?.address}</small>
                 <small>{order.data?.name}</small>
                 <small>{order.data?.phone}</small>
                 <small>{order.data?.email}</small>
                 {order.data.cancelled ? (
                    <h2>Order Cancelled</h2>
                 ) : (
                     <>
                 <h2>Order {order.data.delivery ? 'Delivered' : 'Not Delivered'}</h2>
                 {delivery && !order.data.delivery ? <button onClick={handleDelivery}>Delivered</button> : ''}
                 {cancel && !order.data.delivery ? <button onClick={handleCancelletion}>Cancel Order</button> : ''}
                     </>
                 )}
                
                 {handleDelete ? <button onClick={() => openDeleteModal('this order','demo')}>Delete</button> : ''}
             </div>
                
       
             <p className="order__id">
                 <small>{order.data?.payment_id}</small>
               
             </p>
             {order.data.basket?.map(item => (
                 <CheckoutProduct
                 item={item}
                 hidebutton
                 />
             ))}
              <div className='order__price' style={{backgroundColor: `${site_colors.primary}`}}>
                  <h3 >ORDER TOTAL: </h3>
                  <h3>Rs.{order.data.amount / 100}</h3>
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
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={() => orderDelete()}>
   yes
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={()=> {setOpenAlertDelete(false); setDeleteMessage(''); setDeleteId('')}}>
   no
 </div>
 </div>
</div>
</Modal>
        </div>
    )
}

export default Order
