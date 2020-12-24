import React, { useEffect, useState } from 'react'
import Order from '../../components/Order/Order';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './Orders.scss'

function Orders() {
    const [{user,sidebar},dispatch]= useStateValue();
    const [orders,setOrders]= useState([]);

    useEffect(() => {
   if(user){
    db.collection('users')
    .doc(user?.uid)
    .collection('orders')
    .orderBy('created','desc')
    .onSnapshot(snapshot => (
        setOrders(snapshot.docs.map(doc => ({
            id:doc.id,
            data: doc.data()
        })))
    ))
   }else{
       setOrders([]);
   }
    },[user])

    return (
        <div className='orders'>
            <Sidebar />
            <div className='orderMobile'>
                {sidebar ? <SidebarMobile /> : (
                <div className='orders__page'>
                <h1>Your Orders</h1>

                <div className='orders__order'>
                    {orders?.map(order => (
                        <Order order={order} />
                    ))}
                </div>
                </div>
                )}
            </div>
            <div className='orderPc'>
            <div className='orders__page'>
           <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
           </div>
            </div>
       </div>
            
        
    )
}

export default Orders
