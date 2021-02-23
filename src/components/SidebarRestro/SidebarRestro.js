import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SidebarRestro.scss';
import SidebarRowRestro from './../SidebarRow/SidebarRowRestro';
import { LocalHospital,EmojiFlags,People,Chat,Storefront,VideoLibrary,ExpandMoreOutlined, Add, AccountBox, Dashboard, Feedback, PostAdd, Fastfood, PhotoLibrary, BurstMode, Info, PeopleAlt, Payment, Settings, LibraryBooks, DashboardOutlined, LibraryBooksOutlined, PostAddOutlined, PhotoLibraryOutlined, BurstModeOutlined, InfoOutlined, StorefrontOutlined, FastfoodOutlined, PaymentOutlined, PeopleAltOutlined, FeedbackOutlined, SettingsOutlined, AddOutlined, Close, ExitToApp, ExpandLessOutlined, Money, PhoneIphone, Book, LocalOffer} from '@material-ui/icons'
import { authMain, db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { Avatar, Menu } from '@material-ui/core';


function SidebarRestro({active,id}) {
  const history= useHistory();
  const [channels,setChannels]= useState([]);
  const [showChannel,setShowChannel]= useState(true);
  const [showStore,setShowStore]= useState(true);
  const [showCreative,setShowCreative]= useState(true);
  const [showCustomers,setShowCustomers]= useState(true);
  const [showManagement,setShowManagement]= useState(true);
  const [showSettings,setShowSettings]= useState(true);
  const[{user_details,sidebarVandore,user},dispatch]= useStateValue();
  const pageId= id;
  
  useEffect(() => {
     db.collection(pageId.toUpperCase()).doc('rooms').collection('rooms').onSnapshot(snapshot => (
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

  const handleAuthentication= () => {
    if(user){
        authMain.signOut();
        history.push('/');
    }
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
             
               <div onClick={handleAuthentication}>
               <ExitToApp style={{width: '30px',height: '30px'}}/>
               </div>
              </div>
             
         </div>    
     <div className='sidebarRestro__options__container'>
        <div className='sidebarRestro__option'>
    
             <div onClick={() => setShowManagement(!showManagement)} className='option_management'>
            {showManagement ? <SidebarRowRestro Icon={ExpandLessOutlined}  title='Management'  admin/> : <SidebarRowRestro Icon={ExpandMoreOutlined}  title='Management'  admin/>}
          
            </div>
              
       {showManagement ? (
           <div onClick={() => history.push(`/restro/dashboard/${pageId}`)}>
           <SidebarRowRestro Icon={DashboardOutlined} title="Dashboard" active={active==='dashboard' ? true : false}/>
           </div>
       ) : ''}
       {showManagement ? (
            <div onClick={() => history.push(`/restro/guides/${pageId}`)}>
            <SidebarRowRestro Icon={LibraryBooksOutlined} title="Guides" active={active==='guides' ? true : false}/>
            </div> 
       ) : ''}
        
       


        
             <div onClick={() => setShowCreative(!showCreative)} className='option_creative'>
          {showCreative ?   <SidebarRowRestro Icon={ExpandLessOutlined}  title='Creative'  admin/> :   <SidebarRowRestro Icon={ExpandMoreOutlined}  title='Creative'  admin/>}
          
            </div>
         
   
       {showCreative ? (
        <div onClick={() => history.push(`/restro/post/${pageId}`)}>
        <SidebarRowRestro Icon={PostAddOutlined} title="Posts" active={active==='post' ? true : false}/>
        </div>
       ) : ''}

        {showCreative ? (
           <div onClick={() => history.push(`/restro/gallery/${pageId}`)}>
           <SidebarRowRestro Icon={PhotoLibraryOutlined} title="Photo Gallery" active={active==='gallery' ? true : false}/>
           </div>      
         ) : ''}

         



        {showCreative ? (
                <div onClick={() => history.push(`/restro/slider/${pageId}`)}>
                <SidebarRowRestro Icon={BurstModeOutlined} title="Slider" active={active==='slider' ? true : false}/>
            </div>
         ) : ''}


        {showCreative ? (
           <div onClick={() => history.push(`/restro/about/${pageId}`)}>
           <SidebarRowRestro Icon={InfoOutlined} title="About Section" active={active==='about' ? true : false}/>
           </div>     
         ) : ''}
         {showCreative ? (
           <div className='mobileHide' onClick={() => history.push(`/restro/componentsTemplate/${pageId}`)}>
           <SidebarRowRestro Icon={Book} title="Templates" active={active==='componentsTemplate' ? true : false}/>
           </div>      
         ) : ''}

        
      
             <div onClick={() => setShowStore(!showStore)} className='option_store'>
       {showStore ? <SidebarRowRestro Icon={ExpandLessOutlined}  title='My Store' admin /> : <SidebarRowRestro Icon={ExpandMoreOutlined}  title='My Store' admin />}     
            </div>
         


    {showStore ? (
        <div onClick={() => history.push(`/restro/store/${pageId}`)}>
           <SidebarRowRestro Icon={StorefrontOutlined} title="Store" active={active==='store' ? true : false}/>
               </div>
    ) : ''}

    {showStore ? (
        <div onClick={() => history.push(`/restro/orders/${pageId}`)}>
        <SidebarRowRestro Icon={FastfoodOutlined} title="Orders" active={active==='orders' ? true : false}/>
        </div>
        ) : ''}


    {showStore ? (
        <div onClick={() => history.push(`/restro/payments/${pageId}`)}>
        <SidebarRowRestro Icon={PaymentOutlined} title="Payments" active={active==='payments' ? true : false}/>
            </div>
        ) : ''}

{showStore ? (
        <div onClick={() => history.push(`/restro/coupons/${pageId}`)}>
        <SidebarRowRestro Icon={LocalOffer} title="Coupons" active={active==='coupons' ? true : false}/>
            </div>
        ) : ''}

        
             <div onClick={() => setShowCustomers(!showCustomers)} className='option_customers'>
    {showCustomers ? <SidebarRowRestro Icon={ExpandLessOutlined}  title='Customers'  admin/> : <SidebarRowRestro Icon={ExpandMoreOutlined}  title='Customers'  admin/>}        
            </div>
         


     {showCustomers ? (
        <div onClick={() => history.push(`/restro/users/${pageId}`)}>
            <SidebarRowRestro Icon={PeopleAltOutlined} title="Users" active={active==='users' ? true : false}/>
            </div>
     ) : ''}

     {showCustomers ? (
          <div onClick={() => history.push(`/restro/feedback/${pageId}`)}>
          <SidebarRowRestro Icon={FeedbackOutlined} title="Feedbacks" active={active==='feedback' ? true : false}/>
          </div> 
         ) : ''}


        
         
         
             <div onClick={() => setShowSettings(!showSettings)} className='option_settings'>
    {showSettings ?  <SidebarRowRestro Icon={ExpandLessOutlined}  title='Settings' admin /> :  <SidebarRowRestro Icon={ExpandMoreOutlined}  title='Settings' admin />}       
            </div>
        


        {showSettings ? (
            <div onClick={() => history.push(`/restro/settings/${pageId}`)}>
            <SidebarRowRestro Icon={SettingsOutlined} title="Settings" active={active==='settings' ? true : false}/>
                </div>
        ) : ''}

{showSettings ? (
            <div onClick={() => history.push(`/restro/pricing/${pageId}`)}>
            <SidebarRowRestro Icon={Money} title="Pricing" active={active==='pricing' ? true : false}/>
                </div>
        ) : ''}

{showSettings ? (
            <div onClick={() => history.push(`/restro/qrapp/${pageId}`)}>
            <SidebarRowRestro Icon={PhoneIphone} title="QR code & App" active={active==='qrapp' ? true : false}/>
                </div>
        ) : ''}


              
          
             <div onClick={() => setShowChannel(!showChannel)} className='option_channel'>
    {showChannel ? <SidebarRowRestro Icon={ExpandLessOutlined}  title='Channels' admin/> : <SidebarRowRestro Icon={ExpandMoreOutlined}  title='Channels' admin/>}        
            </div>
              

            {showChannel ? (
            <SidebarRowRestro Icon={AddOutlined} addChannelOption pageId={pageId} title='Add Channel' />
            ) : ''}

             
           {showChannel ? channels.map(channel => (
                <div onClick={() => history.push(`/chats/${pageId}/${channel.id}`)}>
               <SidebarRowRestro  title={channel.name}  id={channel.id}  deleteChannel pageId={pageId} />
               </div>
           ))  : ''}
         
         
         </div>
      </div>
          
           
        </div>
    )
}

export default SidebarRestro
