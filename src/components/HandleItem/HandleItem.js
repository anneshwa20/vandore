import React, { useState } from 'react'
import { db, firebaseApp } from '../../firebase';
import './HandleItem.css'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { CloudUpload, Delete, Edit, EventAvailable, EventBusy, Star, Update } from '@material-ui/icons';
import { IconButton, Modal } from '@material-ui/core';


function HandleItem({item,id,pageId}) {

    const [name,setName]= useState(item.name);
    const [price,setPrice]= useState(item.price);
    const [openAlert,setOpenAlert]= useState(false);
    const [openImage,setOpenImage]= useState(false);

    const [rating,setRating]= useState(item.rating);
    const [description,setDescription]= useState(item.description);
    const [available,setAvailable]= useState(item.available);
    const [image,setImage]= useState(item.image);
    const[edit,setEdit]= useState(false);

    const [openAlertDelete,setOpenAlertDelete]= useState(false);
    const [deleteMessage,setDeleteMessage]= useState('');
    const [deleteId,setDeleteId]= useState('');
    const openDeleteModal= (message,id) => {
        setDeleteMessage(message);
        setDeleteId(id);
        setOpenAlertDelete(true);
    }

    const updateItem= (e) => {
        e.preventDefault();
      const productId= getRandomText(20);
        db.collection(pageId.toUpperCase()).doc('store').collection("store").doc(id).update({
         items: firebase.firestore.FieldValue.arrayUnion({
             id: productId,
             name: name,
             price: price,
             description: description,
             rating: rating,
             image: image,
             available: true
         })
      });

      db.collection(pageId.toUpperCase()).doc('products').collection('products').doc(productId).set({
        id: productId,
        name: name,
        price: price,
        description: description,
        rating: rating,
        image: image,
        available: true
      })

      db.collection(pageId.toUpperCase()).doc('products').collection('products').doc(item.id).delete();
      db.collection(pageId.toUpperCase()).doc('store').collection("store").doc(id).update({
        items: firebase.firestore.FieldValue.arrayRemove({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            rating: item.rating,
            image: item.image,
            available: item.available
        })
     }).then(() => setOpenAlert(true)).then(refreshPage);

  
    }


     const updateAvailability= (e) => {
        e.preventDefault();
  const productId= getRandomText(20);
        db.collection(pageId.toUpperCase()).doc('store').collection("store").doc(id).update({
            items: firebase.firestore.FieldValue.arrayUnion({
                id: productId,
                name: name,
                price: price,
                description: description,
                rating: rating,
                image: item.image,
                available: !item.available
            })
         });
         db.collection(pageId.toUpperCase()).doc('products').collection('products').doc(productId).set({
          id: productId,
          name: name,
          price: price,
          description: description,
          rating: rating,
          image: item.image,
          available: !item.available
        })
  
        db.collection(pageId.toUpperCase()).doc('products').collection('products').doc(item.id).delete();
   
         db.collection(pageId.toUpperCase()).doc('store').collection("store").doc(id).update({
           items: firebase.firestore.FieldValue.arrayRemove({
               id: item.id,
               name: item.name,
               price: item.price,
               description: item.description,
               rating: item.rating,
               image: item.image,
               available: item.available
           })
        }).then(() => setOpenAlert(true)).then(refreshPage);

        setAvailable(!available);
   }

     const deleteItem= () => {
  

      db.collection(pageId.toUpperCase()).doc('products').collection('products').doc(item.id).delete();
        db.collection(pageId.toUpperCase()).doc('store').collection("store").doc(id).update({
            items: firebase.firestore.FieldValue.arrayRemove({
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description,
                rating: item.rating,
                image: item.image,
                available: item.available
            })
         }).then(refreshPage);
         setOpenAlertDelete(false);
     }

    function getRandomText(length) {
       var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/./g);
       var text = "";
       for (var i = 0; i < length; i++) text += charset[Math.floor(Math.random() * charset.length)];
       return text;
     }

     const refreshPage = ()=>{
        window.location.reload();  }


        const handleUploadStart= () => {
           setOpenImage(true);
        }
    
        const handleUploadSuccess= (filename) =>{
          
        
           firebaseApp.storage().ref('products').child(filename).getDownloadURL()
           .then(url => setImage(url)).then(() => setOpenImage(false));
                         
            
           
         };

    return (
        <div className='handleItem'>
            <img src={image} />
           {edit ? (
                <div className='handleItem__edit'>
                <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',width: 90,marginTop: -50,textAlign: 'center'}}>
                  <CloudUpload />
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
                <label for="name">Product name</label>
                <div className='handleItem__edit--input'>
                <input type='text' id='name' onChange={e => setName(e.target.value)} value={name} placeholder='Product Name' />
                </div>
               
                <label for="price">Product Price</label>
                <div className='handleItem__edit--input'>
                <input type='text' id='price' onChange={e => setPrice(e.target.value)} value={price}  placeholder='Product Price'/>
                </div>
             
                  <label for="description">Product description</label>
                  <div className='handleItem__edit--input'>
                  <input type='text' id='description' onChange={e => setDescription(e.target.value)} value={description}  placeholder='Product Description'/>
                </div>
               
                  {/* <label for="rating">Product rating</label>
                  <div className='handleItem__edit--input'>
                  <input type='text' id='rating' onChange={e => setRating(e.target.value)} value={rating}  placeholder='Product Rating'/>
                </div> */}
                
                  <div className='handleItem__buttons'>
                  <div style={{textAlign: 'center'}} onClick={() => setEdit(false)} className='handleItem__buttons--button'>
                    <IconButton> <Edit /></IconButton>
                      <span>Edit</span>
                  </div>
                  <div style={{textAlign: 'center'}} onClick={() => openDeleteModal('this item','demo')} className='handleItem__buttons--button'>
                    <IconButton> <Delete /></IconButton>
                    <span>Delete</span>
                  </div>
                  <div style={{textAlign: 'center'}} onClick={updateItem} className='handleItem__buttons--button'>
                    <IconButton> <Update /></IconButton>
                    <span>Update</span>
                  </div>
                  <div style={{textAlign: 'center'}} onClick={updateAvailability} className='handleItem__buttons--button'>
                    <IconButton> {available ? <EventBusy /> : <EventAvailable /> }</IconButton>
                    <span>Availability</span>
                  </div>
                  </div>
                {/*  {available ? <p style={{color: "green"}}>Currently Available</p> : <p style={{color: "red"}}>Currently Not Available</p>} */}
                 </div>
           ) : (
                <div className='handleItem__noedit'>
                    <div style={{textAlign: 'center'}}>
                    <h3>{name}</h3>
                     <h2>{rating} <Star style={{color: '#ffcc00'}} /></h2>
                     <h1>Rs.{price}</h1>
                    </div>
                   <div style={{marginBottom: 35,textAlign: 'center'}} onClick={() => setEdit(true)}>
                    <IconButton> <Edit /></IconButton>
                  </div>
                </div>
           )}
           <div className='handleItem__availability' style={{ backgroundColor: `${available ? 'green' : 'red'}`, color: 'white'}}>
                {available ? 'Currently Available' : 'Currently Not Available'}
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
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={deleteItem}>
   yes
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={()=> {setOpenAlertDelete(false); setDeleteMessage(''); setDeleteId('')}}>
   no
 </div>
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

        </div>
    )
}

export default HandleItem
