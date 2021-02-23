import React, { useState,useEffect } from 'react'
import { db, firebaseApp } from '../../firebase';
import './HandlePost.scss'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import Post from '../../components/Post/Post';
import { AddAPhoto, Facebook, FolderShared, Menu, Save, Visibility, WhatsApp } from '@material-ui/icons';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import { useStateValue } from '../../StateProvider';
import { FormControl, InputLabel, makeStyles, MenuItem, Modal, Select } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PostSvg from '../../icons/undraw_share_online_r87b.svg';
import PostAdmin from '../../components/Post/PostAdmin';
import axios from '../../axios';
import { ReactTinyLink } from 'react-tiny-link';


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '90%',
  },
}));


function HandlePost({id}) {
  const classes = useStyles();
   const [message,setMessage]= useState('');
   const [image, setImage]= useState('');
   const [openAlert,setOpenAlert]= useState(false);
   const [openImage,setOpenImage]= useState(false);
   const [show,setShow]= useState(false);
   const [posts,setPosts]= useState([]);
  const pageId= id;
   const history= useHistory();
    const[{single_guides,site_preview,sidebarVandore,user,user_details,site_info},dispatch]= useStateValue();
   const [open,setOpen]= useState(false);
   const [openDropdown,setOpenDropdown]= useState(false);
   const [option,setOption]= useState(1);
   const [ylink,setYlink]= useState('');
   const [elink,setElink]= useState('');
   const [pdfFile,setPdfFile]= useState('');
   const [currentVideo,setCurrentVideo]= useState('');
   const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
   const manageVideo= (link) => {
    setOpen(true);
    setCurrentVideo(link);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  const handleGetStarted= () => {
    db.collection(id.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
        post: true
    }).then(refreshPage);
}
const refreshPage = ()=>{
    window.location.reload();  }

 
    const handleChange = (event) => {
       setImage('');
       setYlink('');
       setElink('');
       setPdfFile('');
       setOption(event.target.value);
    };
  
    const handleClose = () => {
      setOpenDropdown(false);
    };
  
    const handleOpen = () => {
      setOpenDropdown(true);
    };
  







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
       .then(url => setImage(url)).then(() => setOpenImage(false));
                     
        
       
     };

     const handleUploadStartPdf= () => {
      setOpenImage(true);
  }

  const handleUploadSuccessPdf= (filename) =>{
    
  
     firebaseApp.storage().ref('pdfs').child(filename).getDownloadURL()
     .then(url => setPdfFile(url)).then(() => setOpenImage(false));
                   
      
     
   };

     const [users,setUsers]= useState([]);
useEffect(() => {
  
  db.collection(pageId.toUpperCase()).doc('userList').collection('userList')
  .onSnapshot(snapshot => (
      setUsers(snapshot.docs.map(doc => ({
          id: doc.id,
          address: doc.data().address,
          name: doc.data().name,
          phone: doc.data().phone,
          image: doc.data().image,
          email: doc.data().email,
          active: doc.data().active,
          notification: doc.data().notification
      })))
  ))
 
  },[])

const alltokens= `${users.map(user => user.notification)}`;

const sendNotification= async () => {
      
  const NOTIFY = await axios({
      method: 'post',
      url: `/sendNotification`,
      data: {
          title: `Vandore. ${site_info.siteName}`,
          desc: message,
          tokens: alltokens.split(','),
          image: image
      }
  });
}




     const handleSubmit= (e) => {
         e.preventDefault();
        
         let link='';
         let type='';
         if(option===1){
           link= image;
           type= 'image';
         }
         else if(option ===2){
           link= ylink;
           type= 'youtube';
         }
         else if(option === 3){
           link= elink;
           type= 'external';
         }
         else if(option === 4){
           link= pdfFile;
           type= 'pdf';
         }
         db.collection(id.toUpperCase()).doc('posts').collection("posts").add({
           message: message,
           link: link,
           type: type,
           fclicks: '0',
           wclicks: '0',
           visits: '0',
           comments: [],
           userSharing: [],
           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
           profilePic: user_details.image,
           username: user_details.name,
       }).then(() => setOpenAlert(true)).then(() => setImage('')).then(() => setMessage('')).then(() => setShow(false));

       sendNotification();
     }


     function isValidURL(string) {
      var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      return (res !== null)
    };

    /* let docs= [{uri: pdfFile}]; */

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
           {image ? <img src={image} className='handPost__postUpload--image'  /> : ''}
           {ylink ? (
        <div  style={{width: '100%',height: '300px'}}>
        <iframe  src={ylink} style={{width: '100%',height: '100%'}} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div> 
          ) : ''}

          {elink && isValidURL(elink) ? (
            <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            proxyUrl

            defaultMedia='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png'
            minLine={1}
            url={elink}
          />
          ) : ''}

         {/*  {pdfFile ? (
           <DocViewer documents={docs} />
          ) : ''} */}

          {pdfFile ? (
            <iframe src={pdfFile} style={{width: '100%',height: '300px'}} />
          ) : ''}

         <div className='handlePost__input'>
         <textarea placeholder='Enter Your Post Description' rows={5} cols={3} value={message} onChange={e => setMessage(e.target.value)} />
          </div>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Post Customization</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openDropdown}
          onClose={handleClose}
          onOpen={handleOpen}
          value={option}
          onChange={handleChange}
        >
         
          <MenuItem value={1}>Post With Image</MenuItem>
          <MenuItem value={2}>Post with embed Youtube video</MenuItem>
          <MenuItem value={3}>Post with external link</MenuItem>
          <MenuItem value={4}>Post with Pdf Document</MenuItem>
        </Select>
      </FormControl>
      {option === 1 ? (
         <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',marginTop: 20,display: 'flex',alignItems: 'center',width: 'max-content',margin: '0 auto'}}>
         Select Your Photo <AddAPhoto style={{paddingLeft: '10px'}} />
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
      ) : ''}

      {option === 2 ? (
           <div className='handleCategory__form--input'>
           <input type='text' onChange={e => setYlink(e.target.value)} value={ylink}  placeholder='Paste Your Youtube Embed Link'/>
           </div>
      ) : ''}

       {option === 3 ? (
         <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setElink(e.target.value)} value={elink}  placeholder='Paste Your External Link'/>
         </div>
      ) : ''}
      
      {option === 4 ? (
         <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',marginTop: 20,display: 'flex',alignItems: 'center',width: 'max-content',margin: '0 auto'}}>
         Select Your PDF file <AddAPhoto style={{paddingLeft: '10px'}} />
         <FileUploader
           hidden
           accept="pdf/*"
           randomizeFilename
           name="image"
           storageRef={firebaseApp.storage().ref("pdfs")}
           onUploadStart={handleUploadStartPdf}
           onUploadSuccess={handleUploadSuccessPdf}
          />
          </label>
      ) : ''}
         
        <label onClick={handleSubmit}  style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',marginTop: '10px'}}>
          Save Post <Save />
         </label>
         </div>

     ): (
  <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer'}} onClick={() => setShow(true)}>
       Add New Post <AddAPhoto />
      
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
          link={post.data.link}
          type={post.data.type}
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
<button onClick={() => history.push(`/restro/guides/${id.toUpperCase()}`)}>Show All Guides</button>
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
