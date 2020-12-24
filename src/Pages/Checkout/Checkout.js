import { Avatar } from '@material-ui/core';
import { Delete, ShoppingCartOutlined, Star, StorefrontOutlined } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import React from 'react'
import { useHistory } from 'react-router-dom';
import CheckoutProduct from '../../components/CheckoutProduct/CheckoutProduct';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import Social from '../../components/Social/Social';
import Subtotal from '../../components/Subtotal/Subtotal'
import { getBasketTotal } from '../../reducer';
import { useStateValue } from '../../StateProvider'
import './Checkout.scss'

function Checkout() {
    const [{user,basket,site_colors,sidebar},dispatch]=useStateValue();
    const history= useHistory();
    const handleCheckout=() => {
    if(getBasketTotal(basket)===0){
        alert('Your cart is empty, try adding some products');
        history.push('/store');
    }else{
        history.push('/payment');
    }
    }

    return (
        <div className='checkout'>
   <Sidebar />
           <div className='checkoutMobile'>
               {sidebar ? <SidebarMobile /> : (
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

{/* {basket.map(item => (
                <CheckoutProduct
                 id={item.id}
                 title={item.title}
                 image={item.image}
                 price={item.price}
                 rating={item.rating}
                 />
            ))} */}

export default Checkout
