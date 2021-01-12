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


function HandleCategory(props) {
  const [image,setImage]= useState('');
  const [name,setName]= useState('');
  const [openAlert,setOpenAlert]= useState(false);
  const [openImage,setOpenImage]= useState(false);
  const [price,setPrice]= useState('');
  const [rating,setRating]= useState('');
  const [description,setDescription]= useState('');
  const [categoryTitle,setCategoryTitle]= useState('');
  const [items,setItems]= useState([]);
  const [show,setShow]= useState(false);
  const [{sidebarVandore},dispatch]= useStateValue();
  const pageId= props.match.params.id;


 
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

     const handleSubmit= (e) => {
         e.preventDefault();

         db.collection(pageId.toUpperCase()).doc('store').collection("store").doc(props.match.params.category).update({
          items: firebase.firestore.FieldValue.arrayUnion({
              id: getRandomText(20),
              name: name,
              price: price,
              description: description,
              rating: rating,
              image: image,
              available: true
          })
       }).then(() => setShow(!show)).then(() => setOpenAlert(true));
     }
     function getRandomText(length) {
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/./g);
        var text = "";
        for (var i = 0; i < length; i++) text += charset[Math.floor(Math.random() * charset.length)];
        return text;
      }
   

    return (

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
         <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setRating(e.target.value)} value={rating}  placeholder='Product Rating'/>
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
    )
}

export default HandleCategory
