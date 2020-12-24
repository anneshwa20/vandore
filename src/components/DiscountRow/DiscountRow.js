import React, { useState } from 'react'
import { useStateValue } from '../../StateProvider'
import DiscountItem from '../DiscountItem/DiscountItem'
import './DiscountRow.scss'
function DiscountRow() {
  const [{store,site_colors},dispatch]= useStateValue();
  const [discountItem,setDiscountItem]= useState([]);


  
   console.log(store);

    return (
        <div className='discountRow' style={{backgroundImage: `linear-gradient(to left top,${site_colors.primary},transparent)`}}>


          {store.length !== 0 ? store[1].items.map(item => (
            <DiscountItem title={item.name} image={item.image} price={item.price}  id={item.id} rating={item.rating}/>
          )) : ''}

         
             
        </div>
    )
}

export default DiscountRow
