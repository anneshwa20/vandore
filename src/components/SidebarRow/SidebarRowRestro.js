import React from 'react'
import './SidebarRowRestro.css'
import { Avatar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase';
import { Delete } from '@material-ui/icons';

function SidebarRowRestro({src,Icon,title,addChannelOption,id,deleteChannel,page,admin,active}) {
    const history= useHistory();

    const addChannel= () => {
       const channelName= prompt('Please enter the channel name');
       const channelDescription= prompt('Please enter the Channel Descrition')
       if(channelName && channelDescription){
           db.collection('rooms').add({
               name: channelName,
               description: channelDescription
           })
       }
    }

    const deleteChannelHandler= () => {
       
         db.collection('rooms').doc(id).delete().then(alert('deleted'));
    }
   console.log(page,title);

    return (
        <div className="sidebarRowRestro" onClick={addChannelOption ? addChannel : () => {}} style={{backgroundColor: `${page===title ? 'lightgray' : ''}`,borderRadius: `${page===title ? '12px' : '0px'}`,backgroundColor: `${active ? 'rgba(66, 135, 245, 1)' : ''}`}}>
            {src && <Avatar src={src} />}
            {Icon && <Icon />}
            {deleteChannel ? <Delete onClick={deleteChannelHandler} /> : ''}
            <h4 style={{fontWeight: `${admin ? '700' : ''}`,fontSize: `${admin ? '22px' : ''}`}}>{title}</h4>
        </div>
    )
}

export default SidebarRowRestro
