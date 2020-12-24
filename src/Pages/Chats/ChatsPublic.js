import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatInput from '../../components/ChatInput/ChatInput';
import Header from '../../components/Header/Header';
import Message from '../../components/Message/Message';
import Sidebar from '../../components/Sidebar/Sidebar';
import SidebarMobile from '../../components/Sidebar/SidebarMobile';
import SidebarRestro from '../../components/SidebarRestro/SidebarRestro';
import Social from '../../components/Social/Social';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './ChatsPublic.scss'

function ChatsPublic() {
    const { roomId }= useParams();
    const [roomDetails,setRoomDetails]= useState(null);
     const [roomMessages,setRoomMessages]= useState([]);
     const [{sidebar},dispatch]= useStateValue();

   useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId)
            .onSnapshot(snapshot => (
               setRoomDetails(snapshot.data())
            ))

        }
        db.collection('rooms').doc(roomId)
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
        <div className='chats'>
            <Header />
             <div className='chats__body'>
             <Sidebar page='Chat With Us'/>
           <div className='chatMobile'>
               {sidebar ? <SidebarMobile /> : (
 <div className='chats__main'>
          
 <div className='chats__main--chats'>
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

     <ChatInput channelName={roomDetails?.name} channelId={roomId} />

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
 
              <ChatInput channelName={roomDetails?.name} channelId={roomId} />
 
             </div>
           </div>
            <Social />
             </div>
            
        </div>
    )
}

export default ChatsPublic
