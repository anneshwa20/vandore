import { AddShoppingCart, Star } from '@material-ui/icons';
import React, { useState } from 'react'
import { useStateValue } from '../../StateProvider'
import './Product.scss'

function Product({id, title,image,price,rating}) {
    const [{basket,site_colors},dispatch]= useStateValue();
    const [show,setShow]= useState(false);

      
    const addToBasket= () => {

     setShow(true);





       dispatch({
           type: 'ADD_TO_BASKET',
           item: {
               id: id,
               title: title,
               image: image,
               price: price,
               rating: rating
           },
       });

       setTimeout(() => setShow(false),3000);
    };
  
    return (
        <div className='product'>
            <img src={image} />
           <h3>{title}</h3>
           <p>This is a test description</p>
           <div className="product__rating">
                   {Array(5).fill().map((_,i) => (
                    <Star />
                    ))}
            </div>
            <div className='product__bottom'>
             <h2>Rs. {price}</h2>
             <div className='cartButton' onClick={addToBasket} style={{backgroundColor: `${site_colors.button}`}}>
               Add To Cart  <AddShoppingCart />
             </div>
             <div className='cartButtonMobile' onClick={addToBasket} style={{backgroundColor: `${site_colors.button}`}}>
               Add   <AddShoppingCart />
             </div>
            </div>
            {show ? (
                 <div className='addedCart' style={{alignSelf: 'center',backgroundColor: `${site_colors.primary}`}}>
                  Added To Cart
                 </div>
             ) : ''} 
        </div>
    )
}



 {/*  <div className="product__rating">
                   {Array(5).fill().map((_,i) => (
                    <p>🌟</p>
                    ))}
                
                    
                 </div>
             </div>
             <img src={image} alt="" />
             <button onClick={addToBasket}>Add to Basket</button>
             {show ? (
                 <div className='addedCart'>
                  Added To Cart
                 </div>
             ) : ''} */}
export default Product
