import { Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import StoreCategory from '../../components/StoreCategory/StoreCategory';
import { db, firebaseApp } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { useStateValue } from '../../StateProvider';
import './HandleStore.scss'
import StoreSvg from '../../icons/undraw_street_food_hm5i.svg';
import { AddAPhoto, Menu } from '@material-ui/icons';
import firebase from 'firebase';


function HandleStore({id}) {
    const [category,setCategory]= useState('');
    const [categories,setCategories]= useState([]);
    const [openAlert,setOpenAlert]= useState(false);
    const [openImage,setOpenImage]= useState(false);


    const [editCategory,setEditCategory]= useState('');
    const [save,setSave]= useState(false);
    const [cover,setCover]= useState('https://i.ibb.co/wWPx0KM/Handle-Your-Store.png');
    const colors= ['#FFA07A', '#FF0000','#FFDAB9','#F0E68C','#7CFC00','#8FBC8F','#808000','#E0FFFF','#00FFFF','#ADD8E6','#000080','#DDA0DD','#FF00FF','#FF1493','#FFC0CB','#8B4513','#FFD700','#E6E6FA','#FF6347','#40E0D0','#FFDAB9','#333300' ,'#C71585','#4B0082','#800000'];
     const [{site_settings,single_guides,site_preview,sidebarVandore},dispatch]= useStateValue();
     const history= useHistory();
    const pageId= id;
     
 
 
     const [open,setOpen]= useState(false);
     const [currentVideo,setCurrentVideo]= useState('');

     const [openAlertDelete,setOpenAlertDelete]= useState(false);
     const [deleteMessage,setDeleteMessage]= useState('');
     const [deleteId,setDeleteId]= useState('');
     const openDeleteModal= (message,id) => {
         setDeleteMessage(message);
         setDeleteId(id);
         setOpenAlertDelete(true);
     }

     const handleGetStarted= () => {
        db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
            store: true
        }).then(refreshPage);
    }
    
     const manageVideo= (link) => {
      setOpen(true);
      setCurrentVideo(link);
    }


    useEffect(() => {
  
        db.collection(pageId.toUpperCase()).doc('store').collection('store')
        .onSnapshot(snapshot => (
            setCategories(snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                items: doc.data().items,
                color: colors[Math.floor(Math.random() * 26)]
            })))
        ))
       
        },[])

    const updateCategory= (id,category) =>{
      db.collection(pageId.toUpperCase()).doc('store').collection('store').doc(id).update({
          title: category
      }).then(() => setOpenAlert(true));
    }

    const refreshPage = ()=>{
        window.location.reload();  }


    const deleteCategory= (id) => {
      db.collection(pageId.toUpperCase()).doc('store').collection('store').doc(id).delete().then(refreshPage);
      setOpenAlertDelete(false);
    }

    const handleCategory= (e) => {
         e.preventDefault();

         db.collection(pageId.toUpperCase()).doc('store').collection('store').add({
             title: category,
             items: [],
             timestamp: firebase.firestore.FieldValue.serverTimestamp()
         }).then(() => setOpenAlert(true)).then(refreshPage);
    }

    useEffect(() => {
        db.collection(pageId.toUpperCase()).doc('site').collection("site").doc("site_store_cover")
        .onSnapshot(function(doc) {
            setCover(doc.data().cover);
        });
    },[]);

    const handleUploadStart= () => {
        setOpenImage(true);
    }

    const handleUploadSuccess= (filename) =>{
      
    
       firebaseApp.storage().ref('storeCover').child(filename).getDownloadURL()
       .then(url => setCover(url)).then(() => setOpenImage(false)).then(() => setSave(true));
                     
        
       
     };

     const handleCoverUpload= () => {
         db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_store_cover').update({
             cover: cover
         }).then(() => setSave(false)).then(() => setOpenAlert(true));
     }

    return (
        <div className='handleStore'>
            <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
         {site_preview.store ? (
         <>
         <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>STORE</h1>
        </div>
       
            
      <div className='handleStore__categories' style={{backgroundImage: `url(https://i.ibb.co/wS48xmr/i-Phone-X-XS-11-Pro-36-1.png)`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
          <h1>STORE CATEGORIES</h1>
          <hr></hr>
          <div className='handleStore__categories--categories'>
                {categories.map(category => (
                        <StoreCategory pageId={pageId} category={category} deleteCategory={openDeleteModal} updateCategory={updateCategory} />
                    ))}
          </div>
           
      </div>
      <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter Category Name' value={category} onChange={e => setCategory(e.target.value)} />
            </div>
                <button onClick={handleCategory}>Submit</button>
           </div>

      <div className='store__cover'>
         <div className='store__cover--left'>
             <img src={cover} />
             <h3>Change Your Store Cover Photo</h3>
         </div>
    {save ? (
     <div className='store__cover--right' onClick={handleCoverUpload}>
       Save Photo
     </div>
    ) : (
        <label className='store__cover--right'>
        Select Your Photo <AddAPhoto style={{paddingLeft: '10px'}} />
        <FileUploader
          hidden
          accept="image/*"
          randomizeFilename
          name="image"
          storageRef={firebaseApp.storage().ref("storeCover")}
          onUploadStart={handleUploadStart}
          onUploadSuccess={handleUploadSuccess}
         />
         </label>
    )}
       
      </div>
      <div className='guide_toast'>
            <p>{site_settings.store ? 
            'To turn off store , go to settings and disable store' : 
            'Store  is disabled, go to settings and enable store'}</p> 
            <div  style={{cursor: 'pointer'}} onClick={() => history.push(`/restro/settings/${pageId}`)}>Settings</div>
           </div>
           <div className='guide_tutorial_toast'>
            <p>
            If you face any difficulties regarding store , then see our store guides
            </p> 
            <div onClick={() => manageVideo(single_guides.store)}>Guides</div>
           </div>


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
        <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '10px'}} onClick={()=> setOpenAlert(false)}>
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
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={() => deleteCategory(deleteId)}>
   yes
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={()=> {setOpenAlertDelete(false); setDeleteMessage(''); setDeleteId('')}}>
   no
 </div>
 </div>
</div>
</Modal>
           
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
                         <h1>Manage Your Store</h1>
                         <h3>Creating a store helps in managing your products digitally for sale.</h3>
                   
                          <div className='site_preview--getStarted' onClick={handleGetStarted}>
                             Get Started
                          </div>
                      </div>

                      <div className='site_preview--topContainer--right'>
                           <img src={StoreSvg} style={{fill:"#FFFFFF"}} />
                      </div>
              </div>
           </div>
           <div className='guide__learn--more'>
               Learn More
          </div>
           <div className='site_preview--guide'>
              <div className='site_preview--guide--left'>
              <img src={StoreSvg} style={{fill:"#FFFFFF"}} />
              <h4>Creating a store helps in managing your products digitally for sale.</h4>
              </div>
              <div className='site_preview--guide--right'>
                <iframe src={single_guides.store} />
              </div>
          </div>
          </div>
         )}
        </div>
    )
}

export default HandleStore
