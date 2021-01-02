import { Avatar } from '@material-ui/core';
import { Fastfood, Home, PeopleAltOutlined, PhotoAlbum, ShoppingBasket, Store } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product'
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import Social from '../../components/Social/Social';
import VandoreBanner from '../../components/VandoreBanner/VandoreBanner';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider'
import StateFill from '../StateFill';
import './Menu.scss'

function Menu({pageId}) {
  const [{store,basket,sidebar,site_settings,site_colors,user,user_details},dispatch]= useStateValue();
  const [cover,setCover]= useState('');
  const history= useHistory();
 

  useEffect(() => {
    db.collection(pageId).doc('site').collection("site").doc("site_store_cover")
    .onSnapshot(function(doc) {
        setCover(doc.data().cover);
    });
   },[]);

    return (
     
    
        <div className='menu'>
          
          <Sidebar page='Store' pageId={pageId} />
         <div className='storeMobile'>
           {sidebar ? <SidebarMobile  pageId={pageId} /> : (
 <div className='menu__body'>
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
 <img src={cover} />
 
 <div className='menu__category'>
 {store.length !== 0 ? store.map(category => (
        <div className='menu__products'>
           <p>{category.title}</p>
           <div className='menu__row'>
           {category.items.map(item => item.available ? (
           
         <Product
           id={item.id}
           title={item.name}
           price={item.price}
           rating={item.rating}
           image={item.image}
         />
              
           ) : '')}
            </div>
       </div>
  )) : ''}
 </div>
 
</div>

           )}
         </div>

         <div className='storePc'>
         <div className='menu__body'>
              <img src={cover} />
              
              <div className='menu__category'>
              {store.length !== 0 ? store.map(category => (
                     <div className='menu__products'>
                        <p>{category.title}</p>
                        <div className='menu__row'>
                        {category.items.map(item => item.available ? (
                        
                      <Product
                        id={item.id}
                        title={item.name}
                        price={item.price}
                        rating={item.rating}
                        image={item.image}
                      />
                           
                        ) : '')}
                         </div>
                    </div>
               )) : ''}
              </div>
              
          </div>


         </div>
        

       <Social />
        </div>
   
    )
}

export default Menu
