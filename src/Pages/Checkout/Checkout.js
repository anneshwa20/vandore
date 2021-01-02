import { Avatar } from '@material-ui/core';
import { Delete, Fastfood, Home, PeopleAltOutlined, PhotoAlbum, ShoppingCartOutlined, Star, Store, StorefrontOutlined } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import React from 'react'
import { useHistory } from 'react-router-dom';
import CheckoutProduct from '../../components/CheckoutProduct/CheckoutProduct';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import Social from '../../components/Social/Social';
import Subtotal from '../../components/Subtotal/Subtotal'
import VandoreBanner from '../../components/VandoreBanner/VandoreBanner';
import { getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider'
import StateFill from '../StateFill';
import './Checkout.scss'

function Checkout({pageId}) {
    const [{user,basket,site_colors,sidebar,site_settings,user_details},dispatch]=useStateValue();
    const history= useHistory();
    

    const handleCheckout=() => {
    if(getBasketTotal(basket)===0){
        alert('Your cart is empty, try adding some products');
        history.push(`/vandore/${pageId}/store`);
    }else{
        history.push(`/vandore/${pageId}/payment`);
    }
    }

    return (
       
       
    
        <div className='checkout'>
   <Sidebar pageId={pageId} />
           <div className='checkoutMobile'>
               {sidebar ? <SidebarMobile pageId={pageId} /> : (
  <div className='checkout__page'>
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
  <div className='checkout__products'>
       <div className='checkout__products--title'>
           Your Shopping Basket
       </div>
       {basket.length===0 ? (
           <div className='cartEmpty'>
         Your cart is empty, try adding some products
           <div className='cartEmpty--button' onClick={() => history.push(`/vandore/${pageId}/store`)}  style={{backgroundColor: `${site_colors.button}`}}>
             Store <StorefrontOutlined />
          </div>
           </div>
       ) : ''}
{basket.map(item => (
      <CheckoutProduct item={item} />
  ))}
  </div>
  <div className='checkout__total'>
   <h2>Rs.{getBasketTotal(basket)}</h2>
     <div className='checkout__total--button' style={{backgroundColor: `${getBasketTotal(basket)===0 ? 'gray' : `${site_colors.button}`}`}} onClick={handleCheckout}>
         Proceed to Checkout <ShoppingCartOutlined />
     </div>
  </div>
  </div>
               )}
           </div>
           <div className='checkoutPc'>
           <div className='checkout__page'>
            <div className='checkout__products'>
                 <div className='checkout__products--title'>
                     Your Shopping Basket
                 </div>
                 {basket.length===0 ? (
                     <div className='cartEmpty'>
                   Your cart is empty, try adding some products
                     <div className='cartEmpty--button' onClick={() => history.push('/store')}  style={{backgroundColor: `${site_colors.button}`}}>
                       Store <StorefrontOutlined />
                    </div>
                     </div>
                 ) : ''}
        {basket.map(item => (
                <CheckoutProduct item={item} />
            ))}
            </div>
            <div className='checkout__total'>
             <h2>Rs.{getBasketTotal(basket)}</h2>
               <div className='checkout__total--button' style={{backgroundColor: `${getBasketTotal(basket)===0 ? 'gray' : `${site_colors.button}`}`}} onClick={handleCheckout}>
                   Proceed to Checkout <ShoppingCartOutlined />
               </div>
            </div>
            </div>
           </div>
       <Social />
        </div>
      
    )
}



export default Checkout
