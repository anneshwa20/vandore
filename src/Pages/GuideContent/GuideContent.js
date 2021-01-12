import React, { useState } from 'react'
import { db } from '../../firebase';
import './GuideContent.css'
import firebase from 'firebase';

function GuideContent(props) {
    const guideId= props.match.params.category;
    const [title,setTitle]= useState('');
    const [youtube,setYoutube]= useState('');
    const [image,setImage]= useState('');
    const [description,setDescription]= useState('');
    const [image2,setImage2]= useState('');



    const handleSubmit= () => {
        db.collection("guides").doc(props.match.params.category).update({
            items: firebase.firestore.FieldValue.arrayUnion({
                id: getRandomText(20),
                title: title,
                youtube: youtube,
                image: image,
                image2: image2,
                description: description
                
            })
         }).then(alert('UPDATED'));
    }

    function getRandomText(length) {
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".match(/./g);
        var text = "";
        for (var i = 0; i < length; i++) text += charset[Math.floor(Math.random() * charset.length)];
        return text;
      }


    return (
        <div className='guideContent'>
           
            <div className='handleCategory__form'>
          
          <h2>Add New Video</h2>
          <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setTitle(e.target.value)} value={title} placeholder='Video Title' />
          </div>
          <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setDescription(e.target.value)} value={description} placeholder='Description' />
          </div>
          <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setYoutube(e.target.value)} value={youtube}  placeholder='Video Link'/>
         </div>
         <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setImage(e.target.value)} value={image}  placeholder='Video Thumbnail'/>
         </div>
         <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setImage2(e.target.value)} value={image2}  placeholder='Video Thumbnail (without title)'/>
         </div>
        
         <button onClick={handleSubmit}>Submit</button>
     
      </div>
        </div>
    )
}

export default GuideContent
