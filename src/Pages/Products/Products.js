import { Avatar } from '@material-ui/core';
import { Add, Fastfood, Home, PeopleAltOutlined, PhotoAlbum, Search, Star, Store } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Product from '../../components/Product/Product';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import Social from '../../components/Social/Social';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import StateFill from '../StateFill';
import './Products.scss'

function Products(props) {
    const [product,setProduct]= useState(null);
    const [show,setShow]= useState(false);
    const[{user_details,store,sidebar,user,site_settings,site_colors},dispatch]= useStateValue();
   const history= useHistory();
  
   const [search,setSearch]= useState('');
   const [products,setProducts]= useState([]);
   const pageId= props.match.params.pageId;


    useEffect(() => {
      
            db.collection(pageId.toUpperCase()).doc('products').collection("products").doc(props.match.params.id)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                   setProduct(doc.data());
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });
        
         },[props])

         useEffect(() => {
  
            db.collection(pageId).doc('products').collection('products')
            .onSnapshot(snapshot => (
                setProducts(snapshot.docs.map(doc => doc.data()))
            ))
           
            },[])
    

  let filteredProducts= [];

  if(search){
     filteredProducts= products?.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase())); 
  }


  const addToBasket= () => {

    setShow(true);





      dispatch({
          type: 'ADD_TO_BASKET',
          item: {
              id: product.id,
              title: product.name,
              image: product.image,
              price: product.price,
              rating: product.rating
          },
      });

      setTimeout(() => setShow(false),3000);
   };
     
        


    return (
      <>
      <StateFill id={pageId.toUpperCase()} />
        <div className='posts'>
            
              
<Header pageId={pageId.toUpperCase()} />
<div className='posts__body'>
   <Sidebar pageId={pageId.toUpperCase()} />
   <div className='postMobile'>
     {sidebar ? <SidebarMobile pageId={pageId} /> : (
      <div className='posts__content'>
        {/*  <div className='shortNav' >
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
           

        </div> */}
        <div className='product__component'>
       <div className='product__component--left'>
          <img src={product?.image} />
       </div>
       <div className='product__component--right'>
            <div className='product__component--name'>
              {product?.name}
            </div>
            <div className='product__component--rating'>
              <Star style={{color: '#ffcc00'}}/> <Star style={{color: '#ffcc00'}}/> <Star style={{color: '#ffcc00'}}/> <Star style={{color: '#ffcc00'}}/> <Star style={{color: '#ffcc00'}}/>
            </div>
            <div className='product__component--desc'>
              {product?.description}
            </div>
            <div className='product__component--bottom'>
                <div className='product__component--price'>
              RS.{product?.price}/-
                </div>
                <div className='product__component--cart' onClick={addToBasket}>
                Add to Cart <Add />
                </div>
            </div>
       </div>
      
   </div>
   {show ? (
                 <div className='addedCart' style={{width: '100%',alignSelf: 'center',backgroundColor: `${site_colors.primary}`}}>
                  Added To Cart
                 </div>
             ) : ''} 

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

   <div className='postPc'>
   <div className='posts__content'>
   <div className='product__component'>
       <div className='product__component--left'>
          <img src={product?.image} />
       </div>
       <div className='product__component--right'>
            <div className='product__component--name'>
              {product?.name}
            </div>
            <div className='product__component--rating'>
              <Star style={{color: '#ffcc00'}}/> <Star style={{color: '#ffcc00'}}/> <Star style={{color: '#ffcc00'}}/> <Star style={{color: '#ffcc00'}}/> <Star style={{color: '#ffcc00'}}/>
            </div>
            <div className='product__component--desc'>
              {product?.description}
            </div>
            <div className='product__component--bottom'>
                <div className='product__component--price'>
              RS.{product?.price}/-
                </div>
                <div className='product__component--cart' onClick={addToBasket}>
                Add to Cart <Add />
                </div>
            </div>
       </div>
      
   </div>
   {show ? (
                 <div className='addedCart' style={{width: '100%',alignSelf: 'center',backgroundColor: `${site_colors.primary}`}}>
                  Added To Cart
                 </div>
             ) : ''} 
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
        </div>

        </>
    )
}

export default Products
