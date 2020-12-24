import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import './Gallery.scss'
import Sidebar from '../../components/Sidebar/Sidebar';
import Social from '../../components/Social/Social';
import { useStateValue } from '../../StateProvider';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';

function Gallery() {
    const [images,setImages]= useState([]);
    const [{sidebar},dispatch]= useStateValue();
    useEffect(() => {
  
        db.collection('gallery')
        .onSnapshot(snapshot => (
            setImages(snapshot.docs.map(doc => ({
                id: doc.id,
                image: doc.data().image
            })))
        ))
       
        },[])
    return (
        <div className='gallery'>
            <Sidebar page='Photo Gallery'/>
           <div className='galleryMobile'>
            {sidebar ? <SidebarMobile /> : (
 <div className='gallery__page'>
 <h1 style={{marginTop: '10px',textTransform: 'uppercase'}}>Gallery</h1>
 <div className='gallery__container'>
   {images.map(image => (
        <div className='images__holder' style={{height: '230px'}}>
         <Zoom><img src={image.image} className='images__holder__image'/></Zoom>   
          
         </div>
    ))}
 </div>
 </div>
            )}
           </div>
           <div className='galleryPc'>
           <div className='gallery__page'>
            <h1 style={{marginTop: '10px',textTransform: 'uppercase'}}>Gallery</h1>
            <div className='gallery__container'>
              {images.map(image => (
                   <div className='images__holder' style={{height: '230px'}}>
                    <Zoom><img src={image.image} className='images__holder__image'/></Zoom>   
                     
                    </div>
               ))}
            </div>
            </div>
           </div>
             <Social />  
        </div>
    )
}

export default Gallery
