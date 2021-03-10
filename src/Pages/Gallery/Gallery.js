import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import './Gallery.scss'
import Sidebar from '../../components/Sidebar/Sidebar';
import Social from '../../components/Social/Social';
import { useStateValue } from '../../StateProvider';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import { Fastfood, Home, PeopleAltOutlined, PhotoAlbum, Store } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function Gallery({pageId}) {
    const [images,setImages]= useState([]);
    const [{sidebar,site_settings,site_colors,user,user_details,brand},dispatch]= useStateValue();
    const history= useHistory();

    useEffect(() => {
        db.collection(pageId).doc('gallery').collection('gallery')
        .onSnapshot(snapshot => (
            setImages(snapshot.docs.map(doc => ({
                id: doc.id,
                image: doc.data().image
            })))
        ))
       
        },[])

        if(!site_settings.photoGallery){
            history.push(`/${pageId}`);
          }
        
    return (
        <div className='gallery'>
            <Sidebar page='Photo Gallery' pageId={pageId} />
           <div className='galleryMobile'>
            {sidebar ? <SidebarMobile pageId={pageId} /> : (
 <div className='gallery__page'>
    {/*         <div className='shortNav' >
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
 <h1 style={{marginTop: '10px',textTransform: 'uppercase',marginBottom: '10px'}}>Gallery</h1>
 <div className='gallery__container'>
   {images.map(image => (
       
         <Zoom><img src={image.image} className='images__holder__imageGallery'/></Zoom>   
          
        
    ))}
 </div>
 </div>
            )}
           </div>
           <div className='galleryPc'>
           <div className='gallery__page'>
            <h1 style={{marginTop: '10px',textTransform: 'uppercase',marginBottom: '10px'}}>Gallery</h1>
            <div className='gallery__container'>
              {images.map(image => (
                   
                    <Zoom><img src={image.image} className='images__holder__imageGallery'/></Zoom>   
                     
                 
               ))}
            </div>
            </div>
           </div>
             <Social />  
        </div>
    )
}

export default Gallery
