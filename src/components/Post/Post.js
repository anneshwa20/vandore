import { Avatar } from '@material-ui/core'
import { AccountCircle, ChatBubbleOutline, Delete, ExpandMoreOutlined, NearMe, ThumbUpSharp } from '@material-ui/icons'
import React from 'react'
import { db } from '../../firebase'
import { useStateValue } from '../../StateProvider'
import firebase from 'firebase';
import './Post.scss'
import { useHistory } from 'react-router-dom'

function Post({id,profilePic,image,username,timestamp,message,handleDelete,fclicks,wclicks,visits}) {
    const [{user_details},dispatch]= useStateValue();
    const history= useHistory();

    const postDelete= () => {
      db.collection('posts').doc(id).delete().then(alert('Deleted'));
    }

    const updateFacebook= () => {
        
       db.collection('posts').doc(id).update({
         fclicks: `${fclicks*1 + 1}`
       })

            if(!user_details?.admin){
                db.collection("posts").doc(id).update({
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
    db.collection('posts').doc(id).update({
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
   
    const whatsappMessage=`https://restro-e4874.firebaseapp.com/posts/${id}`+`${message}`;
    return (
        <div className="post">
           <div className="post__top">
               <Avatar src={profilePic} className="post__avatar"/>
               <div className="post__topInfo">
                    <h3>{username}  </h3>
               <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
               </div>
               {handleDelete  ? <button onClick={postDelete} style={{width: 50,height:50,marginLeft: 20}}><Delete /></button> : ''}
           </div>
           <div className="post__bottom" onClick={() => history.push(`/posts/${id}`)}>
               <p>{message}</p>
           </div>
           <div className="post__image" onClick={() => history.push(`/posts/${id}`)}>
               <img src={image} alt="" style={{width: '100%',height: '400px'}} />
               
              
           </div>
           <div className="post__options">
              
              
               <div className="post__option" onClick={updateWhatsapp}>
               <a className='share__whatsapp' href={`whatsapp://send?text=${whatsappMessage}`} data-action="share/whatsapp/share"> <img src='https://pngimg.com/uploads/whatsapp/whatsapp_PNG21.png'/></a>
                  
                   
               </div>
               <div className="post__option" onClick={updateFacebook}>
               <a className='share__facebook' href={`https://www.facebook.com/sharer/sharer.php?u=restro-e4874.firebaseapp.com/posts/${id}`} target="_blank">
               <img src='https://toppng.com/uploads/preview/facebook-logo-11549681668z1ra1h6mmx.png' /></a>
                   
                 
               </div>
               
           </div>
        </div>
    )
}

export default Post
