import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ChatInput from '../../components/ChatInput/ChatInput';
import Header from '../../components/Header/Header';
import Message from '../../components/Message/Message';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import SidebarRestro from '../../components/SidebarRestro/SidebarRestro';
import Social from '../../components/Social/Social';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import StateFill from '../StateFill';
import './ChatsPublic.scss'

function ChatsPublic() {
    const { roomId,id }= useParams();
    const [roomDetails,setRoomDetails]= useState(null);
     const [roomMessages,setRoomMessages]= useState([]);
     const [{sidebar,brand,site_settings},dispatch]= useStateValue();

     const pageId= id;
     const history= useHistory();

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

   if(brand.plan !== 'gold' || !site_settings.chatChannels){
    history.push(`/${pageId}`);
  }



    return (
        <>
        <StateFill id={pageId.toUpperCase()} />
        <div className='chats'>
            <Header pageId={pageId.toUpperCase()} />
             <div className='chats__body'>
             <Sidebar page='Chat With Us' pageId={pageId.toUpperCase()} />
           <div className='chatMobile'>
               {sidebar ? <SidebarMobile pageId={pageId.toUpperCase()}/> : (
 <div className='chats__main'>
          
 <div className='chats__main--chats'>
      <div className="chat__header">
           <div className='chat__headerLeft'>
                <h4 className='chat__channelName'>
                     <strong># {roomDetails?.name}</strong>
                   
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

     <ChatInput pageId={pageId.toUpperCase()} channelName={roomDetails?.name} channelId={roomId} />

    </div>
               )}
           </div>
           <div className='chatPc'>
           <div className='chats__main'>
          
          <div className='chats__main--chats'>
               <div className="chat__header">
                    <div className='chat__headerLeft'>
                         <h4 className='chat__channelName'>
                              <strong># {roomDetails?.name}</strong>
                        
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
 
              <ChatInput pageId={pageId.toUpperCase()} channelName={roomDetails?.name} channelId={roomId} />
 
             </div>
           </div>
            <Social />
             </div>
            
        </div>

        </>
    )
}

export default ChatsPublic
