import { ShoppingBasket } from '@material-ui/icons';
import React from 'react'
import { Link } from 'react-router-dom';
import Product from '../../components/Product/Product'
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import Social from '../../components/Social/Social';
import { useStateValue } from '../../StateProvider'
import './Menu.scss'

function Menu() {
  const [{store,basket,sidebar},dispatch]= useStateValue();

    return (
        <div className='menu'>
          
          <Sidebar page='Store' />
         <div className='storeMobile'>
           {sidebar ? <SidebarMobile /> : (
 <div className='menu__body'>
 <img src='https://img.freepik.com/free-psd/top-view-fast-food-black-background-mock-up_23-2148321326.jpg?size=626&ext=jpg' />
 
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
              <img src='https://img.freepik.com/free-psd/top-view-fast-food-black-background-mock-up_23-2148321326.jpg?size=626&ext=jpg' />
              
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
