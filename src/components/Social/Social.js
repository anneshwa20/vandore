import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './Social.scss'

function Social() {
    /* const [facebookLink,setFacebookLink]= useState('');
    const [zomatoLink,setZomatoLink]= useState('');
    const [swiggyLink,setSwiggyLink]= useState(''); */

    const [{social_links},dispatch]= useStateValue();
  
    /* useEffect(() => {
          
      db.collection("social").doc('social_links')
      .get()
      .then(function(doc) {
        if (doc.exists) {
             setFacebookLink(doc.data().facebookLink);
             setZomatoLink(doc.data().zomatoLink);
             setSwiggyLink(doc.data().swiggyLink);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
  
   },[]) */
  
    return (
        <div className='social'>
           <iframe 
           src={`https://www.facebook.com/plugins/page.php?href=${social_links?.facebookLink}&tabs=timeline&width=340&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
             width="340" 
             height="100%"
              style={{border: "none",overflow:"hidden"}} 
              scrolling="no" 
              frameborder="0" 
            allowTransparency="true" 
            allow="encrypted-media">

            </iframe>
        </div>
    )
}

export default Social
