import React from 'react'
import './SidebarRow.css'
import { Avatar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase';
import { Delete } from '@material-ui/icons';
import { useStateValue } from '../../StateProvider';

function SidebarRow({src,Icon,title,addChannelOption,id,deleteChannel,page,admin}) {
    const history= useHistory();
    const [{site_colors},dispatch]= useStateValue();
    

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
        <div className="sidebarRow" style={{backgroundColor: `${page===title ? 'lightgray' : ''}`,borderRadius: `${page===title ? '12px' : '0px'}`}}>
            {src && <Avatar src={src} style={{width: '30px', height: '30px' }} />}
            {Icon && <Icon  style={{color: `${site_colors.icons}`}}/>}
            {deleteChannel ? <Delete onClick={deleteChannelHandler} /> : ''}
            <h4 style={{fontWeight: `${admin ? '700' : ''}`,fontSize: `${admin ? '22px' : ''}`}}>{title}</h4>
        </div>
    )
}

export default SidebarRow
