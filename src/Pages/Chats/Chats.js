import { InfoOutlined, Menu, MenuBook, StarBorderOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatInput from '../../components/ChatInput/ChatInput';
import Message from '../../components/Message/Message';
import SidebarRestro from '../../components/SidebarRestro/SidebarRestro';
import { db } from '../../firebase';
import './Chats.scss';
import ChatSvg from '../../icons/undraw_add_file_4gfw.svg';
import { useStateValue } from '../../StateProvider';
import StateFill from '../StateFill';

function Chats() {
    const { roomId,id }= useParams();
    const [roomDetails,setRoomDetails]= useState(null);
     const [roomMessages,setRoomMessages]= useState([]);
  const[{single_guides,site_preview,sidebarVandore},dispatch]= useStateValue();
     const pageId= id;

     const handleGetStarted= () => {
        db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
            chatChannel: true
        }).then(refreshPage);
    }
       const refreshPage = ()=>{
        window.location.reload();  }


   useEffect(()=>{
        if(roomId){
            db.collection(pageId.toUpperCase()).doc('rooms').collection('rooms').doc(roomId)
            .onSnapshot(snapshot => (
               setRoomDetails(snapshot.data())
            ))

        }
        db.collection(pageId.toUpperCase()).doc('rooms').collection('rooms').doc(roomId)
        .collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot((snapshot) => 
           setRoomMessages(
               snapshot.docs.map(doc => doc.data())
           )
        )
   },[roomId]);

  
   const handleDetails= () => {
       alert(roomDetails.description);
   }


    return (
        <>
        <StateFill id={pageId} />
        <div className='chats'>
           
        <div className='chatVandoreMobile'>
        <div className='chats__body'>

   
   {sidebarVandore ? <SidebarRestro id={pageId} /> : ''}
{site_preview.chatChannel ? (
<>
<div className='chats__main--restro'>

<div className='chats__main--chats--restro'>
   <div className="chat__header">
        <div className='chat__headerLeft'>
             <h4 className='chat__channelName'>
                  <strong># {roomDetails?.name}</strong>
                  <StarBorderOutlined />
             </h4>
        </div>

        <div className='chat__headerRight' onClick={handleDetails}>
             <p>
                 <InfoOutlined /> Details
             </p>
        </div>
   </div>
   <div className='chat__messages'>
       {roomMessages?.map(message => (
           <Message
           message={message.message}
           timestamp={message.timestamp}
           user={message.user}
           userImage={message.userImage}
           image={message.image}
           />
       ))}
   </div>
</div>

  <ChatInput pageId={pageId} channelName={roomDetails?.name} channelId={roomId} />

 </div>
</>
) : (
    <div className='site_preview'>
    <div className='site_preview--top'>
       <div className='site_preview--topContainer'>
              <div className='site_preview--topContainer--left'>
                 <h1 style={{color: 'rgb(73, 157, 222)'}}>Introducing Chat Channels</h1>
                 <h3 style={{color: 'rgb(70, 84, 94)'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
           
                  <div className='site_preview--getStarted' onClick={handleGetStarted}>
                     Get Started
                  </div>
              </div>

              <div className='site_preview--topContainer--right'>
                   <img src={ChatSvg} style={{fill:"#FFFFFF"}} />
              </div>
      </div>
   </div>
   <div className='guide__learn--more' style={{color: 'rgb(73, 157, 222)'}}>
       Learn More
  </div>
   <div className='site_preview--guide'>
      <div className='site_preview--guide--left'>
      <img src={ChatSvg} style={{fill:"#FFFFFF"}} />
      <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
      </div>
      <div className='site_preview--guide--right'>
        <iframe src={single_guides.chatChannels} />
      </div>
  </div>
  </div>
)}

 </div>
        </div>

         <div className='chatVandorePc'>
         <div className='chats__body'>

   
<SidebarRestro id={pageId} />
{site_preview.chatChannel ? (
<>
<div className='chats__main--restro'>

<div className='chats__main--chats--restro'>
   <div className="chat__header">
        <div className='chat__headerLeft'>
       
             <h4 className='chat__channelName'>
                 
                  <strong># {roomDetails?.name}</strong>
                  <StarBorderOutlined />
             </h4>
        </div>

        <div className='chat__headerRight' onClick={handleDetails}>
             <p>
                 <InfoOutlined /> Details
             </p>
        </div>
   </div>
   <div className='chat__messages'>
       {roomMessages?.map(message => (
           <Message
           message={message.message}
           timestamp={message.timestamp}
           user={message.user}
           userImage={message.userImage}
           image={message.image}
           />
       ))}
   </div>
</div>

  <ChatInput pageId={pageId} channelName={roomDetails?.name} channelId={roomId} />

 </div>
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
                 <h1 style={{color: 'rgb(73, 157, 222)'}}>Introducing Chat Channels</h1>
                 <h3 style={{color: 'rgb(70, 84, 94)'}}>Creating chat Channels helps in interacting with customers and promotes high customer engagement.</h3>
           
                  <div className='site_preview--getStarted' onClick={handleGetStarted}>
                     Get Started
                  </div>
              </div>

              <div className='site_preview--topContainer--right'>
                   <img src={ChatSvg} style={{fill:"#FFFFFF"}} />
              </div>
      </div>
   </div>
   <div className='guide__learn--more' style={{color: 'rgb(73, 157, 222)'}}>
       Learn More
  </div>
   <div className='site_preview--guide'>
      <div className='site_preview--guide--left'>
      <img src={ChatSvg} style={{fill:"#FFFFFF"}} />
      <h4>Creating chat Channels helps in interacting with customers and promotes high customer engagement.</h4>
      </div>
      <div className='site_preview--guide--right'>
        <iframe src={single_guides.chatChannels} />
      </div>
  </div>
  </div>
)}

 </div>
         </div>

     
            
            
        </div>
        </>
    )
}

export default Chats
