import { Avatar } from '@material-ui/core';
import { Delete, Star } from '@material-ui/icons';
import React from 'react'
import { useStateValue } from '../../StateProvider'
import './CheckoutProduct.css'

function CheckoutProduct({item,hidebutton}) {
    const [{basket,site_colors},dispatch]= useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: item.id,
        });
    }; 
    return (
        <div className='checkout__products--item'>
                  <div style={{alignSelf: 'center',display: 'flex'}}>
                        <img src={item.image} className='checkout__products--item--image'/>
                                <div className='checkout__products--details'>
                                            <h3>{item.title}</h3>
                                            <p>This is a test description</p>
                                            <div className="product__rating">
                                                    {Array(5).fill().map((_,i) => (
                                                        <Star />
                                                        ))}
                                            </div>
                                            <div className="product__pricing">
                                            <h2>Rs.{item.price}</h2>
                                            </div>
                                </div>
                  </div>

                  <div className='checkout__products--item--right'>
                     <h2>Rs.{item.price}</h2>
              
                     {!hidebutton && (
                         <>
                        <div className='checkout__products--item--remove' onClick={removeFromBasket} style={{backgroundColor: `${site_colors.button}`}}>
                        Remove <Delete />
                        </div>
                         <div className='checkout__products--item--removeMobile' onClick={removeFromBasket} style={{backgroundColor: `${site_colors.button}`}}>
                         <Delete />
                         </div>
                         </>
                     )}
                     
                  </div>
                </div>
    )
}

export default CheckoutProduct
