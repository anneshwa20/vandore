import React from 'react'
import './Message.css'

function Message({message,timestamp,user,userImage,image}) {
    return (
        <div className='message'>
            <img src={userImage} alt="" />
            <div className="message__info">
                <h4>
                    {user} <span className='message__timestamp'>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                <p>{message}</p>
                {image !== '' ? <img src={image} /> : ''}
                
            </div>
        </div>
    )
}
 
export default Message
