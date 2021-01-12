import React, { useState,useEffect } from 'react'
import { db, firebaseApp } from '../../firebase';
import './HandlePost.scss'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import Post from '../../components/Post/Post';
import { AddAPhoto, Facebook, FolderShared, Menu, Save, Visibility, WhatsApp } from '@material-ui/icons';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import { useStateValue } from '../../StateProvider';
import { Modal } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PostSvg from '../../icons/undraw_share_online_r87b.svg';
import PostAdmin from '../../components/Post/PostAdmin';


function HandlePost({id}) {
   
   const [message,setMessage]= useState('');
   const [image, setImage]= useState('');
   const [openAlert,setOpenAlert]= useState(false);
   const [openImage,setOpenImage]= useState(false);
   const [show,setShow]= useState(false);
   const [posts,setPosts]= useState([]);
  const pageId= id;
   const history= useHistory();
    const[{single_guides,site_preview,sidebarVandore,user,user_details},dispatch]= useStateValue();
   const [open,setOpen]= useState(false);
   const [currentVideo,setCurrentVideo]= useState('');
   const manageVideo= (link) => {
    setOpen(true);
    setCurrentVideo(link);
  }

  const handleGetStarted= () => {
    db.collection(id.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
        post: true
    }).then(refreshPage);
}
const refreshPage = ()=>{
    window.location.reload();  }


    useEffect(() => {
        db.collection(id.toUpperCase()).doc('posts').collection('posts')
        .orderBy("timestamp","desc")
        .onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id,data:doc.data()})))
        });
    },[]);



    const handleUploadStart= () => {
        setOpenImage(true);
    }

    const handleUploadSuccess= (filename) =>{
      
    
       firebaseApp.storage().ref('posts').child(filename).getDownloadURL()
       .then(url => setImage(url)).then(() => setShow(true)).then(() => setOpenImage(false));
                     
        
       
     };

     const handleSubmit= (e) => {
         e.preventDefault();
        
         
         db.collection(id.toUpperCase()).doc('posts').collection("posts").add({
           message: message,
           image: image,
           fclicks: '0',
           wclicks: '0',
           visits: '0',
           comments: [],
           userSharing: [],
           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
           profilePic: user_details.image,
           username: user_details.name,
       }).then(() => setOpenAlert(true)).then(() => setImage('')).then(() => setMessage('')).then(() => setShow(false));

      
     }

    return (
        <div className='handlePost'>
          <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
     {site_preview.post ? (
       <>
           <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>Posts</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>POSTS</h1>
        </div>
    <div className='guide_tutorial_toast'>
     <p>
     If you face any difficulties regarding Posts, then see our Posts guides
     </p> 
     <div onClick={() => manageVideo(single_guides.posts)}>Guides</div>
    </div>





     <div style={{textAlign: 'center',marginTop: 20,marginBottom: 20}}>
     {show ? (
         <div className='handlePost__postUpload' style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
         <img src={image} style={{width: 600,height: 300,marginBottom: 10,marginTop: 10}} />
         <div className='handlePost__input'>
         <textarea placeholder='Enter Your Post Description' rows={5} cols={3} value={message} onChange={e => setMessage(e.target.value)} />
          </div>
        <label onClick={handleSubmit}  style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',marginTop: '10px'}}>
          Save Post <Save />
         </label>
         </div>

     ): (
  <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}}>
       Add New Post <AddAPhoto />
       <FileUploader
         hidden
         accept="image/*"
         randomizeFilename
         name="image"
         storageRef={firebaseApp.storage().ref("posts")}
         onUploadStart={handleUploadStart}
         onUploadSuccess={handleUploadSuccess}
        />
        </label>
     )} 
</div> 
  
<div className='handlePost__posts'>

 {posts.map((post) => (
      <div className='handlePost__posts--row'>
         <PostAdmin  
         pageId={pageId}
          handleDelete
          id={post.id}
          key={post.id}
          fclicks={post.data.fclicks}
          wclicks={post.data.wclicks}
          visits={post.data.visits}
          profilePic={post.data.profilePic}
          message={post.data.message}
          timestamp={post.data.timestamp}
          username={post.data.username}
          image={post.data.image}
         />

     <div className='post__analytics'>
         <div className='post__analytics--block'>
             <WhatsApp style={{color: 'green'}} />

 <h2>{post.data.wclicks}</h2>
         </div>
         <div className='post__analytics--block'>
            <Facebook style={{color: 'blue'}}/>

 <h2>{post.data.fclicks}</h2>
         </div>
         <div className='post__analytics--block'>
            <Visibility />

 <h2>{post.data.visits}</h2>
         </div>
        
     </div>




      </div>
     ))
 }
</div>

<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={open}
onClose={() => setOpen(false)}
aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column', backgroundColor: 'white',padding: '20px'}}>
<iframe width="560" height="315" src={currentVideo} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<button onClick={() => history.push('/restro/guides')}>Show All Guides</button>
</div>

</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={openAlert}
onClose={() => setOpenAlert(false)}
aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
   Your data was upated
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '12px'}} onClick={()=> setOpenAlert(false)}>
   Ok
 </div>
</div>

</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={openImage}

aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
  Please wait your photo is uploading
 </div>
 
 <div className='modal__button' style={{margin: '10px auto',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}}>
   <img src='https://i.ibb.co/HqghKW6/2.gif' />
 </div>
</div>

</Modal>
       </>
     ) : (
      <div className='site_preview'>
      <div className='site_preview--top'>
      <div className='preview__menu' onClick={() => {
                    dispatch({
                        type: 'UPDATE_SIDEBAR_VANDORE',
                        sidebarVandore: !sidebarVandore
                    })
                }}>
                  {sidebarVandore ? '' : (
                    <Menu style={{color: 'white'}} fontSize='large'/>
                  )}
                  
                </div>
         <div className='site_preview--topContainer'>
                <div className='site_preview--topContainer--left'>
                   <h1>Posts</h1>
                   <h3>Posting content on your timeline helps driving high customer engagement.</h3>
             
                    <div className='site_preview--getStarted' onClick={handleGetStarted}>
                       Get Started
                    </div>
                </div>

                <div className='site_preview--topContainer--right'>
                     <img src={PostSvg} style={{fill:"#FFFFFF"}} />
                </div>
        </div>
     </div>
     <div className='guide__learn--more'>
         Learn More
    </div>
     <div className='site_preview--guide'>
        <div className='site_preview--guide--left'>
        <img src={PostSvg} style={{fill:"#FFFFFF"}} />
        <h4>Posting content on your timeline helps driving high customer engagement.</h4>
        </div>
        <div className='site_preview--guide--right'>
          <iframe src={single_guides.posts} />
        </div>
    </div>
    </div>
     )}

        </div>
    )
}

export default HandlePost
