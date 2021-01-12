import React from 'react';
import './Header.scss';
import { Search,Home,Flag,SubscriptionsOutlined,StorefrontOutlined,SupervisedUserCircle,Add,Forum,NotificationsActive,ExpandMore, ShoppingBasket, Fastfood, ExitToApp, AccountCircle, ShoppingCartOutlined, MenuRounded, Close  } from '@material-ui/icons';
import { Avatar,IconButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { auth, authMain } from '../../firebase';

function Header({home,cart,orders,store,account,login,pageId}) {
    const [{user,basket,user_details,sidebar,site_settings,site_info,site_colors},dispatch]= useStateValue(); 
     const history= useHistory();
    const handleAuthentication= () => {
        if(user){
            authMain.signOut();
        }
    }
  console.log(site_settings);

    const handleSidebar=() => {
      dispatch({
          type: 'UPDATE_SIDEBAR',
          sidebar: !sidebar
      })
    }
    
    return (
        <div className='header'>
          <div className='sidebar__container' >
            <div onClick={handleSidebar}>
            {sidebar ?  <Close style={{fontSize: '25px'}}/> : <MenuRounded style={{fontSize: '25px'}}/>}
            </div>
          
         
                  </div>
                  <p  className='mobile__header--title' style={{color: `${site_colors.primary}`}}>{site_info.siteName}</p> 
    {site_settings.store ? (
 <Link to={`/vandore/${pageId}/checkout`} style={{textDecoration: 'none'}} className='headerCart'>
 <div className={`header__option  ${cart ? 'header__option--active' : ''}`} style={{borderBottom: `${cart ? `4px solid ${site_colors.icons}` : ''}`,position: 'relative'}}>
        <div className='cart__overview' style={{position: 'absolute', right: '20px',top: '-2px',borderRadius: '20px', backgroundColor: 'red',padding: '1px',color: 'white',fontWeight: 'bold',width: '15px',height:'15px',display: 'flex', justifyContent: 'center'}}>
          {basket.length}
        </div>
             <ShoppingCartOutlined  style={{color: `${site_colors.icons}`,fontSize: '20px'}}/>
             
        </div> 
 </Link>
       
    ) : ''}   

          <div className='header__left' onClick={() => history.push('/')}>
         {/*  <div>
                  <IconButton onClick={handleSidebar} >
                  <MenuRounded style={{fontSize: '40px'}}/>
                  </IconButton>
                  </div>  */}
            
              
         <p style={{color: `${site_colors.primary}`}}>{site_info.siteName}</p>   
            </div>

            <div className="header__center">
            <Link to={`/vandore/${pageId}/home`} style={{textDecoration: 'none'}}>
            <div className={`header__option  ${home ? 'header__option--active' : ''}`} style={{borderBottom: `${home ? `4px solid ${site_colors.icons}` : ''}`}}>
                  <Home fontSize="large" style={{color: `${site_colors.icons}`}}/>
                  <span>Home</span>
             </div> 
            </Link>
    {site_settings.store ? (
 <Link to={`/vandore/${pageId}/checkout`} style={{textDecoration: 'none'}}>
 <div className={`header__option  ${cart ? 'header__option--active' : ''}`} style={{borderBottom: `${cart ? `4px solid ${site_colors.icons}` : ''}`,position: 'relative'}}>
        <div className='cart__overview' style={{position: 'absolute', right: '20px',top: '-2px',borderRadius: '20px', backgroundColor: 'red',padding: '1px',color: 'white',fontWeight: 'bold',width: '20px',height:'20px',display: 'flex', justifyContent: 'center'}}>
          {basket.length}
        </div>
             <ShoppingCartOutlined fontSize="large" style={{color: `${site_colors.icons}`}}/>
             <span>Your Cart</span>
        </div> 
 </Link>
       
    ) : ''}     
     
     
      {!user ? '' : (
            <Link to={`/vandore/${pageId}/orders`} style={{textDecoration: 'none'}}>
              {site_settings.userAuth ? (
                 <div className={`header__option  ${orders ? 'header__option--active' : ''}`} style={{borderBottom: `${orders ? `4px solid ${site_colors.icons}` : ''}`}}>
                 <Fastfood fontSize="large" style={{color: `${site_colors.icons}`}}/>
                 <span>Your Orders</span>
                </div> 
              ) : ''}
             
            </Link>
      )}
           
        {site_settings.store ? (
            <Link to={`/vandore/${pageId}/store`} style={{textDecoration: 'none'}}>
            <div className={`header__option  ${store ? 'header__option--active' : ''}`} style={{borderBottom: `${store ? `4px solid ${site_colors.icons}` : ''}`}}>
                  <StorefrontOutlined fontSize="large" style={{color: `${site_colors.icons}`}}/>
                  <span>Store</span>
            </div>
                </Link>   
        ) : ''}  
            
               
             {!user ? '' : (
                    <Link to={`/vandore/${pageId}/user`} style={{textDecoration: 'none'}}>
                    {site_settings.userAuth ? (
                      <div className={`header__option  ${account ? 'header__option--active' : ''}`} style={{borderBottom: `${account ? `4px solid ${site_colors.icons}` : ''}`}}>
                      <Avatar src={user_details.image} />
                      <span>Your Profile</span>
                      </div> 
                    ) : ''}
                    </Link> 
             )}
          {site_settings.userAuth ? (
          <Link to={!user && `/vandore/${pageId}/login`} style={{textDecoration: 'none'}}>
          <div className={`header__option  ${login ? 'header__option--active' : ''}`} onClick={handleAuthentication} style={{borderBottom: `${login ? `4px solid ${site_colors.icons}` : ''}`}}>
                {!user ? (
                 <>
                    <AccountCircle fontSize="large" style={{color: `${site_colors.icons}`}}/>
                    <span>Login</span>
                  </>
                ) : (
                  <>
                 <ExitToApp fontSize="large" style={{color: `${site_colors.icons}`}}/>
                 <span>Logout</span>
                  </>
                  
                )}
                
          </div>
          </Link>
          ) : ''}
            
          </div>
           
            </div>
       
    )
}

export default Header
