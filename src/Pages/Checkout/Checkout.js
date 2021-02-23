import { Avatar } from '@material-ui/core';
import { Delete, Fastfood, Home, PeopleAltOutlined, PhotoAlbum, RssFeed, ShoppingCartOutlined, Star, Store, StorefrontOutlined } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { get } from 'react-scroll/modules/mixins/scroller';
import CheckoutProduct from '../../components/CheckoutProduct/CheckoutProduct';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import Social from '../../components/Social/Social';
import Subtotal from '../../components/Subtotal/Subtotal'
import VandoreBanner from '../../components/VandoreBanner/VandoreBanner';
import { db } from '../../firebase';
import { getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider'
import StateFill from '../StateFill';
import './Checkout.scss'

function Checkout({pageId}) {
    const [{user,basket,site_colors,sidebar,site_settings,user_details,brand,site_coupons,site_info,final_price,applied_coupon},dispatch]=useStateValue();
    const history= useHistory();
    const [coupon,setCoupon]= useState('');
    const [message,setMessage]= useState('');
    const [finalPrice,setFinalPrice]= useState(0);
    const [appCoupon,setAppCoupon]= useState(null);

    const handleCheckout=() => {
    if(getBasketTotal(basket)===0){
        alert('Your cart is empty, try adding some products');
        history.push(`/vandore/${pageId}/store`);
    }else{
      let delivery= site_info.delivery;
      let deliveryAbove= site_info.deliveryAbove;
      let tax= site_info.tax;
      let calculatedPrice= 0;

      if(finalPrice){
          calculatedPrice= finalPrice;
      }else{
          calculatedPrice= getBasketTotal(basket);
      }
    
    if(deliveryAbove){
        if(deliveryAbove*1 > calculatedPrice){
            calculatedPrice = calculatedPrice + (delivery*1);
        }
    }

    if(tax){
        calculatedPrice= calculatedPrice + (((tax*1)/100)*calculatedPrice);
    }

        dispatch({
            type: 'ADD_FINAL_PRICE',
            final_price: calculatedPrice
        })
        if(appCoupon){
            dispatch({
                type: 'ADD_APPLIED_COUPON',
                applied_coupon: appCoupon
            })
        }else{
            dispatch({
                type: 'ADD_APPLIED_COUPON',
                applied_coupon: null
            })
        }
        
        history.push(`/vandore/${pageId}/payment`);
    }
    }

    if(brand.plan === 'lite' || !site_settings.store){
        history.push(`/${pageId}`);
      }

      useEffect(() => {
        db.collection(pageId.toUpperCase()).doc('coupons').collection('coupons')
        .onSnapshot(snapshot => (
     
         dispatch({
           type: 'ADD_SITE_COUPONS',
           site_coupons: snapshot.docs.map(doc => ({
             id: doc.id,
             coupon: doc.data()
         }))
     })
   ));
   },[])
    

   const handleCoupon= (requestCoupon) => {
    if(getBasketTotal(basket)){
        const couponValid= site_coupons.filter(couponCode => couponCode.id === requestCoupon);
        let total= getBasketTotal(basket);
        if(couponValid[0]){
          const appliedCoupon= couponValid[0];
          if(appliedCoupon.coupon.minUser === '0'){
            setMessage('Coupon is Expired');
            return;
          }
  
          if(appliedCoupon.coupon.minOrder*1 > total){
              setMessage(`Minimum Order Value For This Coupon ${appliedCoupon.id} is ${appliedCoupon.coupon.minOrder}`);
              return;
          }
          if(appliedCoupon.coupon.type  === 'Discount Percentage'){
     
           let price= getBasketTotal(basket);
           let fprice= price - (((appliedCoupon.coupon.discount*1)/100) * price)
              
              setAppCoupon(appliedCoupon);
  
              setFinalPrice(fprice);
  
              setMessage(`Coupon ${appliedCoupon.id} of ${appliedCoupon.coupon.discount} % discount Applied Succesfully`);
  
          }
          else if(appliedCoupon.coupon.type === 'Flat Discount'){
         
           let price= getBasketTotal(basket);
           let fprice= price - (appliedCoupon.coupon.discount*1)
  
             setFinalPrice(fprice);
  
            setAppCoupon(appliedCoupon);
  
              setMessage(`Coupon ${appliedCoupon.id} of ${appliedCoupon.coupon.discount} Rs Flat discount Applied Succesfully`);
          }
          
        }else{
        setMessage('Coupon Is Not Valid !'); 
        }
     
    }else{
        alert('You have no items in your cart to apply coupon code.');
        history.push(`/vandore/${pageId}/store`);
    }
}

   const handleFinalPrice = () => {
       setFinalPrice(0);
       setCoupon('');
       setMessage('');
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
  <div className='apply__coupon'>
                        <div className='apply__coupon--coupon'>
                                <input type='text' placeholder='APPLY COUPON CODE' value={coupon} onChange={e => setCoupon(e.target.value)} />
                                <div className='apply__coupon--coupon__button' onClick={() => handleCoupon(coupon)}>Apply</div>
                        </div>
                        <p>{message}</p>             
            </div>
            <div className='checkout__total'>
             <h2>Rs.{finalPrice ? finalPrice : getBasketTotal(basket)}</h2>
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
                <CheckoutProduct item={item} handleFinalPrice={handleFinalPrice}/>
            ))}
            </div>
            <div className='apply__coupon'>
                        <div className='apply__coupon--coupon'>
                                <input type='text' placeholder='APPLY COUPON CODE' value={coupon} onChange={e => setCoupon(e.target.value)} />
                                <div className='apply__coupon--coupon__button' onClick={() => handleCoupon(coupon)}>Apply</div>
                        </div>
                        <p>{message}</p>             
            </div>
            <div className='checkout__total'>
             <h2>Rs.{finalPrice ? finalPrice : getBasketTotal(basket)}</h2>
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
