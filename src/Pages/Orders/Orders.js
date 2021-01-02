import { Avatar } from '@material-ui/core';
import { Fastfood, Home, PeopleAltOutlined, PhotoAlbum, Store } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Order from '../../components/Order/Order';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import VandoreBanner from '../../components/VandoreBanner/VandoreBanner';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import StateFill from '../StateFill';
import './Orders.scss'

function Orders({pageId}) {
    const [{user,sidebar,site_settings,site_colors,user_details},dispatch]= useStateValue();
    const [orders,setOrders]= useState([]);
    const history= useHistory();
    

    useEffect(() => {
   if(user){
    db.collection(pageId).doc('users').collection('users')
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
            <Sidebar pageId={pageId} />
            <div className='orderMobile'>
                {sidebar ? <SidebarMobile pageId={pageId} /> : (
                <div className='orders__page'>
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
