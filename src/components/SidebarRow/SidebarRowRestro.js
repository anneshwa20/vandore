import React from 'react'
import './SidebarRowRestro.css'
import { Avatar, Modal } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase';
import { Delete } from '@material-ui/icons';
import { useState } from 'react';

function SidebarRowRestro({src,Icon,title,addChannelOption,id,deleteChannel,page,admin,active,pageId}) {
    const history= useHistory();

    const [openAlertDelete,setOpenAlertDelete]= useState(false);
    const [deleteMessage,setDeleteMessage]= useState('');
    const [deleteId,setDeleteId]= useState('');
    const openDeleteModal= (message,id) => {
        setDeleteMessage(message);
        setDeleteId(id);
        setOpenAlertDelete(true);
    }


    const addChannel= () => {
       const channelName= prompt('Please enter the channel name');
       const channelDescription= prompt('Please enter the Channel Descrition')
       if(channelName && channelDescription){
           db.collection(pageId.toUpperCase()).doc('rooms').collection('rooms').add({
               name: channelName,
               description: channelDescription
           })
       }
    }

    const deleteChannelHandler= () => {
       
         db.collection(pageId.toUpperCase()).doc('rooms').collection('rooms').doc(id).delete();
         setOpenAlertDelete(false);
        }
  

    return (
        <div className="sidebarRowRestro" onClick={addChannelOption ? addChannel : () => {}} style={{backgroundColor: `${page===title ? 'lightgray' : ''}`,borderRadius: `${page===title ? '12px' : '0px'}`,backgroundColor: `${active ? 'rgba(66, 135, 245, 1)' : ''}`}}>
            {src && <Avatar src={src} />}
            {Icon && <Icon />}
            {deleteChannel ? <Delete onClick={() => openDeleteModal('this channel','demo')} /> : ''}
            <h4 style={{fontWeight: `${admin ? '700' : ''}`,fontSize: `${admin ? '22px' : ''}`}}>{title}</h4>
        



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
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={deleteChannelHandler}>
   yes
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={()=> {setOpenAlertDelete(false); setDeleteMessage(''); setDeleteId('')}}>
   no
 </div>
 </div>
</div>
</Modal>
        </div>
    )
}

export default SidebarRowRestro
