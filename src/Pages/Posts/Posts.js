import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import Social from '../../components/Social/Social';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './Posts.scss'


function Posts(props) {
    const[profilePic,setProfilePic]= useState('');
    const[id,setId]= useState('');
    const[username,setUsername]= useState('');
    const[timestamp,setTimestamp]= useState('');
    const[message,setMessage]= useState('');
    const[visits,setVisits]= useState('');
    const[fclicks,setFclicks]= useState('');
    const[wclicks,setWclicks]= useState('');
    const[image,setImage]= useState('');

    const[{user_details,sidebar},dispatch]= useStateValue();


    useEffect(() => {
      
            db.collection("posts").doc(props.match.params.id)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                   setProfilePic(doc.data().profilePic);
                   setId(props.match.params.id);
                   setUsername(doc.data().username);
                   setTimestamp(doc.data().timestamp);
                   setMessage(doc.data().message);
                   setImage(doc.data().image);
                   setVisits(doc.data().visits);
                   setFclicks(doc.data().fclicks);
                   setWclicks(doc.data().wclicks);
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            }).catch(function(error) {
              console.log("Error getting document:", error);
            });
        
         },[])

         if(visits!=''){
          db.collection('posts').doc(id).update({
            visits: `${visits*1 + 1}`
          })
         }


    return (
        <div className='posts'>
            
              
<Header />
<div className='posts__body'>
   <Sidebar />
   <div className='postMobile'>
     {sidebar ? <SidebarMobile /> : (
      <div className='posts__content'>
   {timestamp ? (
                <Post
                 id={id} 
                 key={id}
                 profilePic={profilePic}
                 fclicks={fclicks}
                 wclicks={wclicks}
                 visits={visits}
                 message={message}
                 timestamp={timestamp}
                 username={username}
                 image={image}
                />
            ) : ''}
   </div>
     )}
   </div>

   <div className='postPc'>
   <div className='posts__content'>
   {timestamp ? (
                <Post
                 id={id} 
                 key={id}
                 profilePic={profilePic}
                 fclicks={fclicks}
                 wclicks={wclicks}
                 visits={visits}
                 message={message}
                 timestamp={timestamp}
                 username={username}
                 image={image}
                />
            ) : ''}
   </div>
   </div>
   <Social />
</div>
        </div>
    )
}


export default Posts
