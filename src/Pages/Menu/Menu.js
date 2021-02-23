import { Avatar } from '@material-ui/core';
import { ArrowRight, Fastfood, Home, PeopleAltOutlined, PhotoAlbum, Search, ShoppingBasket, Store } from '@material-ui/icons';
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
  const [{store,basket,sidebar,site_settings,site_colors,user,user_details,brand},dispatch]= useStateValue();
  const [cover,setCover]= useState('');
  const history= useHistory();
  const [search,setSearch]= useState('');
  const [products,setProducts]= useState([]);
 

  useEffect(() => {
    db.collection(pageId).doc('site').collection("site").doc("site_store_cover")
    .onSnapshot(function(doc) {
        setCover(doc.data().cover);
    });
   },[]);


useEffect(() => {
  
  db.collection(pageId).doc('products').collection('products')
  .onSnapshot(snapshot => (
      setProducts(snapshot.docs.map(doc => doc.data()))
  ))
 
  },[])


   if(brand.plan === 'lite' || !site_settings.store){
     history.push(`/${pageId}`);
   }

   let filteredProducts= [];

  if(search){
     filteredProducts= products?.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase())); 
  }
     

    console.log('filtered products', filteredProducts);
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
 <div className="menu__input">
                 <Search fontSize="large"/>
        
                  <input placeholder={`Search Products in ${pageId.toLowerCase()} Store`} value={search} onChange={e => setSearch(e.target.value)} type="text" />
              </div>
              {filteredProducts.length > 0 ? (
              <div className='search__results'>
                 {filteredProducts.map(fproduct => (
                   <div className='search__results--result' onClick={() => history.push(`/products/${pageId.toUpperCase()}/${fproduct.id}`)}>
                     <img src={fproduct.image} />
                     <p>{fproduct.name}</p>
                     
                   </div>
                 ))}
              </div>
            ) : (
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
            )}
 
</div>

           )}
         </div>

         <div className='storePc'>
         <div className='menu__body'>
              <img src={cover} />
              
              <div className="menu__input">
                 <Search fontSize="large"/>
        
                  <input placeholder={`Search Products in ${pageId.toLowerCase()} Store`} value={search} onChange={e => setSearch(e.target.value)} type="text" />
              </div>
              
            {filteredProducts.length > 0 ? (
              <div className='search__results'>
                 {filteredProducts.map(fproduct => (
                   <div className='search__results--result' onClick={() => history.push(`/products/${pageId.toUpperCase()}/${fproduct.id}`)}>
                     <img src={fproduct.image} />
                     <p>{fproduct.name}</p>
                     
                   </div>
                 ))}
              </div>
            ) : (
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
            )}
              
          </div>


         </div>
        

       <Social />
        </div>
   
    )
}

export default Menu
