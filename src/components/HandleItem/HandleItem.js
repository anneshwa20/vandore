import React, { useState } from 'react'
import { db, firebaseApp } from '../../firebase';
import './HandleItem.css'
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import { CloudUpload, Delete, Edit, EventAvailable, EventBusy, Update } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';


function HandleItem({item,id}) {

    const [name,setName]= useState(item.name);
    const [price,setPrice]= useState(item.price);
    const [rating,setRating]= useState(item.rating);
    const [description,setDescription]= useState(item.description);
    const [available,setAvailable]= useState(item.available);
    const [image,setImage]= useState(item.image);
    const[edit,setEdit]= useState(false);

    const updateItem= (e) => {
        e.preventDefault();

        db.collection("store").doc(id).update({
         items: firebase.firestore.FieldValue.arrayUnion({
             id: getRandomText(20),
             name: name,
             price: price,
             description: description,
             rating: rating,
             image: image,
             available: true
         })
      });

      db.collection("store").doc(id).update({
        items: firebase.firestore.FieldValue.arrayRemove({
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description,
            rating: item.rating,
            image: item.image,
            available: item.available
        })
     }).then(alert('updated')).then(refreshPage);

  
    }


     const updateAvailability= (e) => {
        e.preventDefault();

        db.collection("store").doc(id).update({
            items: firebase.firestore.FieldValue.arrayUnion({
                id: getRandomText(20),
                name: name,
                price: price,
                description: description,
                rating: rating,
                image: item.image,
                available: !item.available
            })
         });
   
         db.collection("store").doc(id).update({
           items: firebase.firestore.FieldValue.arrayRemove({
               id: item.id,
               name: item.name,
               price: item.price,
               description: item.description,
               rating: item.rating,
               image: item.image,
               available: item.available
           })
        }).then(alert('updated')).then(refreshPage);

        setAvailable(!available);
   }

     const deleteItem= () => {
        db.collection("store").doc(id).update({
            items: firebase.firestore.FieldValue.arrayRemove({
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description,
                rating: item.rating,
                image: item.image,
                available: item.available
            })
         }).then(alert('deleted')).then(refreshPage);
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
            alert('UPLOAD STARTED')
        }
    
        const handleUploadSuccess= (filename) =>{
          
        
           firebaseApp.storage().ref('products').child(filename).getDownloadURL()
           .then(url => setImage(url)).then(alert('UPLOAD FINISH'));
                         
            
           
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
               
                  <label for="rating">Product rating</label>
                  <div className='handleItem__edit--input'>
                  <input type='text' id='rating' onChange={e => setRating(e.target.value)} value={rating}  placeholder='Product Rating'/>
                </div>
                
                  <div className='handleItem__buttons'>
                  <div style={{textAlign: 'center'}} onClick={() => setEdit(false)} className='handleItem__buttons--button'>
                    <IconButton> <Edit /></IconButton>
                      <span>Edit</span>
                  </div>
                  <div style={{textAlign: 'center'}} onClick={deleteItem} className='handleItem__buttons--button'>
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
                     <h2>{rating}</h2>
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
        </div>
    )
}

export default HandleItem
