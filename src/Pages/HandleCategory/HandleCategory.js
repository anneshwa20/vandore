import React, { useEffect, useState } from 'react'
import SidebarRestro from '../../components/SidebarRestro/SidebarRestro'
import './HandleCategory.scss'
import FileUploader from 'react-firebase-file-uploader'
import { db, firebaseApp } from '../../firebase'
import firebase from 'firebase';
import HandleItem from '../../components/HandleItem/HandleItem'
import { Add, CloudUpload, Menu } from '@material-ui/icons'
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro'
import { Modal } from '@material-ui/core'
import { useStateValue } from '../../StateProvider'
import axios from '../../axios';
import { useHistory } from 'react-router-dom'

function HandleCategory(props) {
  const [image,setImage]= useState('');
  const [name,setName]= useState('');
  const [openAlert,setOpenAlert]= useState(false);
  const [openImage,setOpenImage]= useState(false);
  const [price,setPrice]= useState('');
  const [rating,setRating]= useState('5');
  const [description,setDescription]= useState('');
  const [categoryTitle,setCategoryTitle]= useState('');
  const [items,setItems]= useState([]);
  const [show,setShow]= useState(false);
  const [{sidebarVandore,user,user_details,site_info},dispatch]= useStateValue();
  const pageId= props.match.params.id;
  

  const history= useHistory();
 
     useEffect(() => {
      db.collection(pageId.toUpperCase()).doc('store').collection("store").doc(props.match.params.category)
      .onSnapshot(function(doc) {
        setCategoryTitle(doc.data().title);
        setItems(doc.data().items);
      });
  },[]); 







    const handleUploadStart= () => {
        setOpenImage(true);
    }

    const handleUploadSuccess= (filename) =>{
      
    
       firebaseApp.storage().ref('products').child(filename).getDownloadURL()
       .then(url => setImage(url)).then(() => setOpenImage(false));
                     
        
       
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
       console.log('sending not',alltokens.split(','))
  const NOTIFY = await axios({
      method: 'post',
      url: `/sendNotification`,
      data: {
          title: `Vandore. ${site_info.siteName}`,
          desc: name,
          tokens: alltokens.split(','),
          image: image
      }
  });
}

     const handleSubmit= (e) => {
       
         e.preventDefault();
     const productId= getRandomText(20);
         db.collection(pageId.toUpperCase()).doc('store').collection("store").doc(props.match.params.category).update({
          items: firebase.firestore.FieldValue.arrayUnion({
              id: productId,
              name: name,
              price: price,
              description: description,
              rating: rating,
              image: image ? image : 'https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/templates%2Findex.jpg?alt=media&token=394d1920-1150-4f65-b9e2-6737bf55cd8f',
              available: true
          })
       });

       db.collection(pageId.toUpperCase()).doc('products').collection('products').doc(productId).set({
        id: productId,
        name: name,
        price: price,
        description: description,
        rating: rating,
        image: image ? image : 'https://firebasestorage.googleapis.com/v0/b/vandore-ac2b8.appspot.com/o/templates%2Findex.jpg?alt=media&token=394d1920-1150-4f65-b9e2-6737bf55cd8f',
        available: true
       }).then(() => setShow(!show)).then(() => setOpenAlert(true));

       sendNotification();
     }
     function getRandomText(length) {
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/./g);
        var text = "";
        for (var i = 0; i < length; i++) text += charset[Math.floor(Math.random() * charset.length)];
        return text;
      }

      if(user_details){
        if(user_details.business){
            if(user_details.business.toUpperCase() !== pageId.toUpperCase()){
                    history.push('/signout');
                 }
        }
     
      }
    
   

    return (
     <>
      {user_details ? user_details.business ? user_details.business.toUpperCase() === pageId.toUpperCase() ? (
 <div className='handleCategory'>

 <div className='categoryMobile'>
   {sidebarVandore ? <SidebarRestro id={pageId} active='store' /> : (
<div className='handleCategory__body'>
<div className='vandoreLogoHeader'>
   <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
   <h4>ANDORE</h4>
   </div>
<div className='vandoreHeaderMobile' onClick={() => {
      dispatch({
          type: 'UPDATE_SIDEBAR_VANDORE',
          sidebarVandore: !sidebarVandore
      })
  }}>
       {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
      <h1>{categoryTitle}</h1>
  </div>
  <div className='vandoreHeaderPc'>
      <h1>{categoryTitle}</h1>
  </div>

{show ? '' : (
<div  onClick={() => setShow(!show)} className='category__add--button'>
<Add /> Add New Product
</div>
)}

<div className='handleCategory__items'>
{items.map(item => (
  <HandleItem pageId={pageId} item={item} id={props.match.params.category}/>
))}
</div>

</div>
   )}
 </div>

 <div className='categoryPc'>
<div className='category__body'>
<SidebarRestro active='store' id={pageId} />
 <div className='handleCategory__body'>
 <div className='vandoreHeaderMobile' onClick={() => {
      dispatch({
          type: 'UPDATE_SIDEBAR_VANDORE',
          sidebarVandore: !sidebarVandore
      })
  }}>
       {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
      <h1>{categoryTitle}</h1>
  </div>
  <div className='vandoreHeaderPc'>
      <h1>{categoryTitle}</h1>
  </div>
       
      {show ? '' : (
   <div  onClick={() => setShow(!show)} className='category__add--button'>
        <Add /> Add New Product
  </div>
      )}

      <div className='handleCategory__items'>
      {items.map(item => (
            <HandleItem pageId={pageId} item={item} id={props.match.params.category}/>
         ))}
      </div>
        
     </div>
</div>
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
open={show}
onClose={() => setShow(false)}
aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>

<div className='handleCategory__form'>
    
    <h2>Add New Product</h2>
    {image != '' ? <img src={image} style={{width: '50%',height: '250px'}} /> : ''}
    <div className='handleCategory__form--input'>
   <input type='text' onChange={e => setName(e.target.value)} value={name} placeholder='Product Name' />
    </div>
    <div className='handleCategory__form--input'>
   <input type='text' onChange={e => setPrice(e.target.value)} value={price}  placeholder='Product Price'/>
   </div>
   <div className='handleCategory__form--input'>
   <input type='text' onChange={e => setDescription(e.target.value)} value={description}  placeholder='Product Description'/>
   </div>
  
    <label style={{backgroundColor: 'steelblue',marginTop: '20px' ,color: 'white', padding: 20, borderRadius: 4, cursor: 'pointer',width: 'max-content',display: 'flex',alignItems: 'center',textAlign: 'center'}}>
Select Product Image  <CloudUpload  style={{marginLeft: '10px'}}/>
   <FileUploader
     hidden
     accept="image/*"
     randomizeFilename
     name="image"
     storageRef={firebaseApp.storage().ref("products")}
     onUploadStart={handleUploadStart}
     onUploadSuccess={handleUploadSuccess}
    />
    </label>
   <button onClick={handleSubmit}>Submit</button>

</div>


</Modal>
  </div>
      ) : '' : '' : ''}
       

        </>
    )
}

export default HandleCategory
