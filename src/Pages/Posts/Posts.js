import { Avatar } from '@material-ui/core';
import { Fastfood, Home, PeopleAltOutlined, PhotoAlbum, Store } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import Social from '../../components/Social/Social';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import StateFill from '../StateFill';
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

    const[{user_details,sidebar,user,site_settings,site_colors},dispatch]= useStateValue();
   const history= useHistory();
   const pageId= props.match.params.pageId;


    useEffect(() => {
      
            db.collection(pageId.toUpperCase()).doc('posts').collection("posts").doc(props.match.params.id)
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
          db.collection(pageId.toUpperCase()).doc('posts').collection('posts').doc(id).update({
            visits: `${visits*1 + 1}`
          })
         }


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
   {timestamp ? (
                <Post
                pageId={pageId}
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
                pageId={pageId}
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

        </>
    )
}


export default Posts
