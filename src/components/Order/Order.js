import React from 'react'
import './Order.scss'
import moment from "moment"
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import { db } from '../../firebase'
import { useStateValue } from '../../StateProvider'

function Order({order,handleDelete,delivery,cancel,handleModal,pageId}) {
    const [{site_colors},dispatch]= useStateValue();
    console.log(order);


    const orderDelete= () => {
        db.collection(pageId.toUpperCase()).doc('orders').collection('orders').doc(order.id).delete().then(alert('deleted'));

        handleModal(false);
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
 
    const handleCancelletion = () => {
        db.collection(pageId.toUpperCase()).doc('orders').collection('orders').doc(order.id).update({
             cancelled: true
        })
        db.collection(pageId.toUpperCase()).doc('users').collection('users').doc(order.data.user_id).collection('orders').doc(order.data.docId).update({
            cancelled: true
        })

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
                
                 {handleDelete ? <button onClick={orderDelete}>Delete</button> : ''}
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
            
        </div>
    )
}

export default Order
