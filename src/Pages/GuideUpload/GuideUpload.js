import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import './GuideUpload.css'
function GuideUpload() {
    const [post,setPost]= useState('');
    const[photoGallery,setPhotoGallery]= useState('');
    const[slider,setSlider]=useState('');
    const[about,setAbout]= useState('');
    const[store,setStore]= useState('');
    const[orders,setOrders]= useState('');
    const[payments,setPayments]= useState('');
    const[user,setUser]= useState('');
    const[feedbacks,setFeedbacks]= useState('');
    const[chatChannels,setChatChannels]= useState('');


    
    useEffect(() => {
      
        db.collection("single_guides").doc('guides')
        .get()
        .then(function(doc) {
          if (doc.exists) {
               setPost(doc.data().posts);
               setPhotoGallery(doc.data().photoGallery);
               setSlider(doc.data().slider);
               setAbout(doc.data().about);
               setStore(doc.data().store);
               setOrders(doc.data().order);
               setPayments(doc.data().payments);
               setUser(doc.data().user);
               setFeedbacks(doc.data().feedbacks);
               setChatChannels(doc.data().chatChannels);

          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
    
     },[])



    const handleGuide= () => {
      db.collection('single_guides').doc('guides').update({
          posts: post,
          photoGallery: photoGallery,
          slider: slider,
          about: about,
          store: store,
          order: orders,
          payments: payments,
          user: user,
          feedbacks: feedbacks,
          chatChannels: chatChannels
      }).then(alert('Updated'));
    }


    return (
        <div className='guideUpload'>
            <input type='text' placeholder='Enter Post Guide' value={post} onChange={e => setPost(e.target.value)} />
            <input type='text' placeholder='Enter Photo Gallery Guide' value={photoGallery} onChange={e => setPhotoGallery(e.target.value)} />
            <input type='text' placeholder='Enter Slider Guide' value={slider} onChange={e => setSlider(e.target.value)} />
            <input type='text' placeholder='Enter About us Guide' value={about} onChange={e => setAbout(e.target.value)} />
            <input type='text' placeholder='Enter Store Guide' value={store} onChange={e => setStore(e.target.value)} />
            <input type='text' placeholder='Enter Orders Guide' value={orders} onChange={e => setOrders(e.target.value)} />
            <input type='text' placeholder='Enter Payments Guide' value={payments} onChange={e => setPayments(e.target.value)} />
            <input type='text' placeholder='Enter User Guide' value={user} onChange={e => setUser(e.target.value)} />
            <input type='text' placeholder='Enter Feedbacks  Guide' value={feedbacks} onChange={e => setFeedbacks(e.target.value)} />
            <input type='text' placeholder='Enter Chat Channels Guide' value={chatChannels} onChange={e => setChatChannels(e.target.value)} />

                <button onClick={handleGuide}>Submit</button>
        </div>
    )
}

export default GuideUpload
