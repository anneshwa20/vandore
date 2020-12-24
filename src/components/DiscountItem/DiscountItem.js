import React, { useState } from 'react'
import './DiscountItem.scss'
import { AddCircle } from '@material-ui/icons';
import { useStateValue } from '../../StateProvider';
function DiscountItem({title,price,image,id,rating}) {
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
     setTimeout(() => setShow(false),2000);
  };

    return (
        <div className='discountItem'>
           <div className='discountItem__item' style={{borderColor: `${site_colors.button}`}}>
           <img src={image} />
           <p>{title}</p>
           <div className='discountItem__price'>
              Rs. {price}/-
           </div>
          <div className='discountItem__cart' onClick={addToBasket}>
            <AddCircle />
          </div>
           </div>
          {show ? (
                 <div className='addedCart' style={{alignSelf: 'center',backgroundColor: `${site_colors.primary}`}}>
                Added
                 </div>
             ) : ''} 
        </div>
    )
}

export default DiscountItem
