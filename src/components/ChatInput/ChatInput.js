import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { db, firebaseApp } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './ChatInput.scss'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader';
import { CloudUpload, Photo, Send } from '@material-ui/icons';


function ChatInput({channelName,channelId}) {
  const [input,setInput]= useState('');
  const [{user,user_details},dispatch]= useStateValue();
  const [image,setImage]= useState('');

   const sendMessage= (e) => {
       e.preventDefault();

       if(channelId){
          db.collection('rooms').doc(channelId).collection('messages').add({
              message: input,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              user: user_details.name,
              userImage: user_details.image,
              image: image

          })

          setInput('');
          setImage('');
       }
   }

   const handleUploadStart= () => {
    alert('UPLOAD STARTED')
    }

   const handleUploadSuccess= (filename) =>{
      firebaseApp.storage().ref('messages').child(filename).getDownloadURL()
      .then(url => setImage(url)).then(alert('UPLOAD FINISH'));
     };



    return (
        <div className='chatInput'>

              
              
                  <input placeholder={`Message #${channelName}`}  value={input} onChange={e => setInput(e.target.value)} />
                
            <label style={{alignSelf: 'center',marginLeft: '5px',backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer',width: 'max-content',height: 'max-content',display: 'flex',justifyContent: 'center'}}>
            <Photo />
              <FileUploader
                hidden
                accept="image/*"
                randomizeFilename
                name="image"
                storageRef={firebaseApp.storage().ref("messages")}
                onUploadStart={handleUploadStart}
                onUploadSuccess={handleUploadSuccess}
               />
               </label>
               <button type="submit" onClick={sendMessage} ><Send /> </button>
        </div>
    )
}

export default ChatInput
