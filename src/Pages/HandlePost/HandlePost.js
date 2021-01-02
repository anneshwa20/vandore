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
    const[{single_guides,site_preview,sidebarVandore},dispatch]= useStateValue();
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
           profilePic: 'data:image/jpeg;base64,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',
           username: 'WTF KOLKATA',
       }).then(() => setOpenAlert(true)).then(() => setImage('')).then(() => setShow(false));
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
             <WhatsApp />

 <h2>{post.data.wclicks}</h2>
         </div>
         <div className='post__analytics--block'>
            <Facebook />

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
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: '#f0c14b'}}>
   Your data was upated
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: '#3E67D0',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '12px'}} onClick={()=> setOpenAlert(false)}>
   Okay
 </div>
</div>

</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={openImage}

aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: '#f0c14b'}}>
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
                   <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
             
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
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
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
