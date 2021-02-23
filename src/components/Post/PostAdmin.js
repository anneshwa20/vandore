import { Avatar, Modal } from '@material-ui/core'
import { AccountCircle, ChatBubbleOutline, Delete, ExpandMoreOutlined, NearMe, ThumbUpSharp } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { db } from '../../firebase'
import { useStateValue } from '../../StateProvider'
import firebase from 'firebase';
import './PostAdmin.scss'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { ReactTinyLink } from 'react-tiny-link';
import Linkify from 'react-linkify';


function PostAdmin({pageId,id,profilePic,username,timestamp,message,handleDelete,fclicks,wclicks,visits,link,type}) {
    const [{user_details,user,site_info},dispatch]= useStateValue();
    const history= useHistory();
    const [openAlertDelete,setOpenAlertDelete]= useState(false);
    const [deleteMessage,setDeleteMessage]= useState('');

    const openDeleteModal= (message) => {
        setDeleteMessage(message);
        setOpenAlertDelete(true);
    }

    const postDelete= () => {
      db.collection(pageId.toUpperCase()).doc('posts').collection('posts').doc(id).delete();
      setOpenAlertDelete(false);
    }

    const updateFacebook= () => {
        
       db.collection(pageId.toUpperCase()).doc('posts').collection('posts').doc(id).update({
         fclicks: `${fclicks*1 + 1}`
       })

            if(!user_details?.admin){
                db.collection(pageId.toUpperCase()).doc('posts').collection("posts").doc(id).update({
                    userSharing: firebase.firestore.FieldValue.arrayUnion({
                        id: getRandomText(20),
                        name: user_details.name,
                        phone: user_details.phone,
                        image: user_details.image,
                        address: user_details.address,
                        shared: 'facebook'
            }) 
                });
                }
 }

 const updateWhatsapp= () => {
    db.collection(pageId.toUpperCase()).doc('posts').collection('posts').doc(id).update({
      wclicks: `${wclicks*1 + 1}`
    })

         if(!user_details?.admin){
             db.collection("posts").doc(id).update({
                 userSharing: firebase.firestore.FieldValue.arrayUnion({
                     id: getRandomText(20),
                     name: user_details.name,
                     phone: user_details.phone,
                     image: user_details.image,
                     address: user_details.address,
                     shared: 'whatsapp'
         })
             });
             }
}



    function getRandomText(length) {
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/./g);
        var text = "";
        for (var i = 0; i < length; i++) text += charset[Math.floor(Math.random() * charset.length)];
        return text;
      }
   
    const whatsappMessage=`https://vandore.in/posts/${pageId}/${id}`+ ' ' + `${message}`;
    return (
   
        <div className="postAdmin" >
           <div className="post__top">
               <Avatar src={profilePic} className="post__avatar"/>
               <div className="post__topInfo">
                    <h3>{username}  </h3>
               <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
               </div>
               {handleDelete  ? <button onClick={() => openDeleteModal('this post')} style={{width: 50,height:50,marginLeft: 20}}><Delete /></button> : ''}
           </div>
           <div className="post__bottom" onClick={() => history.push(`/posts/${pageId}/${id}`)}>
               <p><Linkify>{message}</Linkify></p>
           </div>

          {type==='image' ? (
            <div className="post__admin__image" onClick={() => history.push(`/posts/${pageId}/${id}`)}>
               <img src={link} alt="" />    
           </div>
          ) : ''}

          {type==='youtube' ? (
         <div className='post__admin__youtube'>
       <iframe  src={link}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         </div> 
          ) : ''}

          {type==='external' ? (
            <div className='post__admin__link'>
            <ReactTinyLink
            style={{height: '100%'}}
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            proxyUrl

            defaultMedia='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png'
            minLine={1}
            url={link}
          />
          </div>
          ) : ''}

          {type==='pdf' ? (
            <div className='post__admin__pdf'>
            <iframe src={link} style={{width: '100%',height: '100%'}} />
            </div>
          ) : ''} 
           

           <div className="post__options">
              
              
               <div className="post__option" onClick={updateWhatsapp}>
               <a className='share__whatsapp' href={`whatsapp://send?text=${whatsappMessage}`} data-action="share/whatsapp/share"> <img src='https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/logo%2Fwhatsapp_PNG21.png?alt=media&token=45a1f61b-7f18-4637-9bf9-bcfb62b2ede7'/></a>
                  
                   
               </div>
               <div className="post__option" onClick={updateFacebook}>
               <a className='share__facebook' href={`https://www.facebook.com/sharer/sharer.php?u=vandore.in/posts/${pageId}/${id}`} target="_blank">
               <img src='https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/logo%2Ffacebook-logo-11549681668z1ra1h6mmx.png?alt=media&token=fbbf7b58-2943-4b57-af5b-ea57bf26e92e' /></a>
                   
                 
               </div>
               
           </div>
           <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={openAlertDelete}
onClose={() => setOpenAlertDelete(false)}
aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
   Do You Want to Delete {deleteMessage} ?
 </div>
 <div style={{display: 'flex',justifyContent: 'space-around'}}>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={postDelete}>
   yes
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={()=> {setOpenAlertDelete(false); setDeleteMessage('')}}>
   no
 </div>
 </div>
</div>
</Modal>
        </div>
   
    )
}

export default PostAdmin
