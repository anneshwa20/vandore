import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SidebarRestro.scss';
import SidebarRowRestro from './../SidebarRow/SidebarRowRestro';
import { LocalHospital,EmojiFlags,People,Chat,Storefront,VideoLibrary,ExpandMoreOutlined, Add, AccountBox, Dashboard, Feedback, PostAdd, Fastfood, PhotoLibrary, BurstMode, Info, PeopleAlt, Payment, Settings, LibraryBooks, DashboardOutlined, LibraryBooksOutlined, PostAddOutlined, PhotoLibraryOutlined, BurstModeOutlined, InfoOutlined, StorefrontOutlined, FastfoodOutlined, PaymentOutlined, PeopleAltOutlined, FeedbackOutlined, SettingsOutlined, AddOutlined, Close} from '@material-ui/icons'
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { Avatar, Menu } from '@material-ui/core';


function SidebarRestro({active}) {
  const history= useHistory();
  const [channels,setChannels]= useState([]);
  const [showChannel,setShowChannel]= useState(true);
  const [showStore,setShowStore]= useState(true);
  const [showCreative,setShowCreative]= useState(true);
  const [showCustomers,setShowCustomers]= useState(true);
  const [showManagement,setShowManagement]= useState(true);
  const [showSettings,setShowSettings]= useState(true);
  const[{user_details,sidebarVandore},dispatch]= useStateValue();

  
  useEffect(() => {
     db.collection('rooms').onSnapshot(snapshot => (
         setChannels(
             snapshot.docs.map(doc => ({
                 id: doc.id,
                 name: doc.data().name
             }))
         )
     ))
  },[]);

  const handleSidebarVandore= () => {

    dispatch({
        type: 'UPDATE_SIDEBAR_VANDORE',
        sidebarVandore: !sidebarVandore
    });
  }

    return (
        <div className="sidebarRestro">
          <div className='sidebarRestro__header'>
              <div className='sidebarRestroMobileTop' onClick={handleSidebarVandore}>
              <SidebarRowRestro Icon={Close} />
              </div>
          
           <div className='sidebarRestro__header--top'>
               <div style={{display: 'flex'}} className='header__logo--text'>
               <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '40px',height: '30px'}}/>
               <h2 style={{letterSpacing: '0.5px',fontWeight: 'bold',marginLeft: '-5px'}}>ANDORE</h2>
               </div>
             
               <div onClick={() => history.push('/user')}>
               <Avatar src={user_details.image} />
               </div>
              </div>
             
         </div>    
     <div className='sidebarRestro__options__container'>
        <div className='sidebarRestro__option'>
    
             <div onClick={() => setShowManagement(!showManagement)} className='option_management'>
            <SidebarRowRestro Icon={ExpandMoreOutlined}  title='Management'  admin/>
            </div>
              
       {showManagement ? (
           <div onClick={() => history.push('/restro/dashboard')}>
           <SidebarRowRestro Icon={DashboardOutlined} title="Dashboard" active={active==='dashboard' ? true : false}/>
           </div>
       ) : ''}
       {showManagement ? (
            <div onClick={() => history.push('/restro/guides')}>
            <SidebarRowRestro Icon={LibraryBooksOutlined} title="Guides" active={active==='guides' ? true : false}/>
            </div> 
       ) : ''}
        
       


        
             <div onClick={() => setShowCreative(!showCreative)} className='option_creative'>
            <SidebarRowRestro Icon={ExpandMoreOutlined}  title='Creative'  admin/>
            </div>
         
   
       {showCreative ? (
        <div onClick={() => history.push('/restro/post')}>
        <SidebarRowRestro Icon={PostAddOutlined} title="Posts" active={active==='post' ? true : false}/>
        </div>
       ) : ''}

        {showCreative ? (
           <div onClick={() => history.push('/restro/gallery')}>
           <SidebarRowRestro Icon={PhotoLibraryOutlined} title="Photo Gallery" active={active==='gallery' ? true : false}/>
           </div>      
         ) : ''}



        {showCreative ? (
                <div onClick={() => history.push('/restro/slider')}>
                <SidebarRowRestro Icon={BurstModeOutlined} title="Slider" active={active==='slider' ? true : false}/>
            </div>
         ) : ''}


        {showCreative ? (
           <div onClick={() => history.push('/restro/about')}>
           <SidebarRowRestro Icon={InfoOutlined} title="About Section" active={active==='about' ? true : false}/>
           </div>     
         ) : ''}

        
      
             <div onClick={() => setShowStore(!showStore)} className='option_store'>
            <SidebarRowRestro Icon={ExpandMoreOutlined}  title='My Store' admin />
            </div>
         


    {showStore ? (
        <div onClick={() => history.push('/restro/store')}>
           <SidebarRowRestro Icon={StorefrontOutlined} title="Store" active={active==='store' ? true : false}/>
               </div>
    ) : ''}

    {showStore ? (
        <div onClick={() => history.push('/restro/orders')}>
        <SidebarRowRestro Icon={FastfoodOutlined} title="Orders" active={active==='orders' ? true : false}/>
        </div>
        ) : ''}


    {showStore ? (
        <div onClick={() => history.push('/restro/payments')}>
        <SidebarRowRestro Icon={PaymentOutlined} title="Payments" active={active==='payments' ? true : false}/>
            </div>
        ) : ''}

        
             <div onClick={() => setShowCustomers(!showCustomers)} className='option_customers'>
            <SidebarRowRestro Icon={ExpandMoreOutlined}  title='Customers'  admin/>
            </div>
         


     {showCustomers ? (
        <div onClick={() => history.push('/restro/users')}>
            <SidebarRowRestro Icon={PeopleAltOutlined} title="Users" active={active==='users' ? true : false}/>
            </div>
     ) : ''}

     {showCustomers ? (
          <div onClick={() => history.push('/restro/feedback')}>
          <SidebarRowRestro Icon={FeedbackOutlined} title="Feedbacks" active={active==='feedback' ? true : false}/>
          </div> 
         ) : ''}


        
         
         
             <div onClick={() => setShowSettings(!showSettings)} className='option_settings'>
            <SidebarRowRestro Icon={ExpandMoreOutlined}  title='Settings' admin />
            </div>
        


        {showSettings ? (
            <div onClick={() => history.push('/restro/settings')}>
            <SidebarRowRestro Icon={SettingsOutlined} title="Settings" active={active==='settings' ? true : false}/>
                </div>
        ) : ''}

              
          
             <div onClick={() => setShowChannel(!showChannel)} className='option_channel'>
            <SidebarRowRestro Icon={ExpandMoreOutlined}  title='Channels' admin/>
            </div>
              

            {showChannel ? (
            <SidebarRowRestro Icon={AddOutlined} addChannelOption title='Add Channel' />
            ) : ''}

             
           {showChannel ? channels.map(channel => (
                <div onClick={() => history.push(`/chats/${channel.id}`)}>
               <SidebarRowRestro  title={channel.name}  id={channel.id}  deleteChannel/>
               </div>
           ))  : ''}
         
         
         </div>
      </div>
          
           
        </div>
    )
}

export default SidebarRestro
