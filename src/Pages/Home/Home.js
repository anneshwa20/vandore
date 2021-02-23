import React, { useEffect, useState } from 'react'
import Body from '../../components/Body/Body'
import Sidebar from '../../components/Sidebar/Sidebar'
import Social from '../../components/Social/Social'
import { db, dbMain } from '../../firebase'
import { useStateValue } from '../../StateProvider'
import { isMobile } from 'react-device-detect';
import './Home.scss'
import SidebarMobile from '../../components/Sidebar/SidebarMobile'
import BodyPc from '../../components/Body/BodyPc'
import VandoreBanner from '../../components/VandoreBanner/VandoreBanner'
import Header from '../../components/Header/Header'
import StateFill from '../StateFill'


function Home({pageId}) {
    const [{sidebar,notification_token,user,user_details},dispatch]= useStateValue();
    const[facebookLink,setFacebookLink]= useState(false);

    
  useEffect(() => {
        
    db.collection(pageId).doc('social').collection("social").doc('social_links')
    .get()
    .then(function(doc) {
      if (doc.exists) {
           if(doc.data().facebookLink===''){
            setFacebookLink(false);
           }else{
           setFacebookLink(true);
           }
          
           
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

 },[])
    
if(notification_token && user){
  console.log('updating token');
  db.collection(pageId).doc('users').collection('users')
  .doc(user.uid)
  .collection('details')
  .doc(`details_${user.uid}`)
  .update({
      notification: notification_token
  })
 
  db.collection(pageId).doc('userList').collection('userList')
  .doc(user.uid)
  .update({
      notification: notification_token
  })
 
  dbMain.collection('users')
  .doc(user.uid)
  .collection('details')
  .doc(`details_${user.uid}`)
  .update({
      notification: notification_token
  })
 
  dbMain.collection('userList')
  .doc(user.uid)
  .update({
      notification: notification_token
  })
}

    return (
    
     
        <div className='home'>
            
           <Sidebar pageId={pageId}/>
         <div className='manageMobileHome'>
           {sidebar ? <SidebarMobile pageId={pageId} /> : <Body pageId={pageId} />}  
         </div>
        
         <BodyPc pageId={pageId} />
          
      {facebookLink ?  <Social /> : ''}
          
           
        </div>
    
    )
    
}

export default Home
