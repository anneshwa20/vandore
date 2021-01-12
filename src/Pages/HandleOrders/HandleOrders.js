import { Avatar, Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import HeaderRestro from '../../components/HeaderRestro/HeaderRestro';
import Order from '../../components/Order/Order';
import { db, dbMain } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './HandleOrders.scss';
import OrderSvg from '../../icons/undraw_online_payments_luau.svg';
import moment from 'moment';
import { Menu, ReceiptOutlined } from '@material-ui/icons';
import axios from '../../axios';


function HandleOrders({id}) {
    const [searchOrders,setSearchOrders]= useState('');
    const [message,setMessage]= useState('');

    const [orders,setOrders]= useState([]);
    const [openOrder,setOpenOrder]= useState(false);
    const [currentOrder,setCurrentOrder]= useState({});
    const [{site_settings,single_guides,site_preview,sidebarVandore,user,user_details},dispatch]= useStateValue();
    const history= useHistory();
    const pageId= id;
    const [open,setOpen]= useState(false);
    const [currentVideo,setCurrentVideo]= useState('');
    const manageVideo= (link) => {
     setOpen(true);
     setCurrentVideo(link);
   }

   const handleGetStarted= () => {
    db.collection(pageId.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
        order: true
    }).then(refreshPage);
}
   const refreshPage = ()=>{
    window.location.reload();  }
    

    useEffect(() => {
  
    db.collection(pageId.toUpperCase()).doc('orders').collection('orders')
    .orderBy('created','desc')
    .onSnapshot(snapshot => (
        setOrders(snapshot.docs.map(doc => ({
            id:doc.id,
            data: doc.data()
        })))
    ))
   
    },[])



    const seen = new Set();

    let allUsers= orders.filter(order => {
        const duplicate = seen.has(order.data?.phone);
        seen.add(order.data?.phone);
        return !duplicate;
      });


    const sendSMS= async () => {
    const SMS = await axios({
         method: 'post',
         // Stripe expects the total in a currencies subunits
         url: `/orderSMS?phone=${allUsers.map(user => user.data?.phone)}&message=${message}`
     });
      }

    const handleMessage= () => {
      sendSMS();
      dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`).update({
       sms: user_details.sms - allUsers.length
      });
      setMessage('');
    }

   const filteredOrders= orders.filter(order => 
    order.data?.name.toLowerCase().includes(searchOrders.toLowerCase()) || order.data?.phone.toLowerCase().includes(searchOrders.toLowerCase()) || order.data?.email.toLowerCase().includes(searchOrders.toLowerCase()));

    const handleOrderBill= (order) => {
        setCurrentOrder(order);
        setOpenOrder(true);
      }
   

    return (
        <div className='handleOrders'>
            <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
          {site_preview.order ? (
          <>
                     <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>Orders</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>Orders</h1>
        </div>
            <div className='guide_toast'>
            <p>{site_settings.store ? 
            'To turn off store orders, go to settings and disable store' : 
            'Store orders is disabled, go to settings and enable store'}</p> 
            <div  style={{cursor: 'pointer'}} onClick={() => history.push(`/restro/settings/${pageId}`)}>Settings</div>
           </div>
           <div className='guide_tutorial_toast'>
            <p>
            If you face any difficulties regarding store orders, then see our store order guides
            </p> 
            <div onClick={() => manageVideo(single_guides.order)}>Guides</div>
           </div>

     <div className='userHolder'>
        <table className='handleUser__user'>
                     <tr>
                         <th>Customer</th>
                         <th>Amount</th>
                        
                         <th>Phone</th>
                         <th>Transaction Date</th>
                       
                         <th>Status</th>
                         <th>Bill</th>
                     </tr>

            {filteredOrders.map(order => (
            
            <tr>
                    <td style={{display: 'flex', alignItems: 'center'}}>  <Avatar src={order.data?.image} style={{marginRight: '5px'}}/> {order.data?.name}</td>
                    <td>Rs.{order.data.amount / 100}</td>
                    <td>{order.data?.phone}</td>
                    
                    <td>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</td>
                   
                    <td>
                        {
                            order.data.cancelled ? (
                                <div className='order__delivered' style={{display: 'flex',alignItems: 'center'}}>
                                <div style={{width: '10px',height: '10px',backgroundColor: 'red',borderRadius: '99px',marginRight: '10px'}}>
    
                                </div>
                                Cancelled
                            </div>
                            ) :
                            (
                                <>
                {order.data.delivery ? (
                        <div className='order__delivered' style={{display: 'flex',alignItems: 'center'}}>
                            <div style={{width: '10px',height: '10px',backgroundColor: 'green',borderRadius: '99px',marginRight: '10px'}}>

                            </div>
                            Delivered
                        </div>
                    ) : (
                        <div className='order__delivered'style={{display: 'flex',alignItems: 'center'}}>
                        <div style={{width: '10px',height: '10px',backgroundColor: 'orange',borderRadius: '99px',marginRight: '10px'}}>

                        </div>
                       Not Delivered
                    </div>
                    )}
                                </>
                            )
                        }
                   
                   </td>
                   <td>
                       <div onClick={() => handleOrderBill(order)} style={{display: 'flex',alignItems: 'center'}}>
                           View Bill <ReceiptOutlined style={{marginLeft: '10px'}}/>
                       </div>
                   </td>
           </tr> 
       
            ))}
                     
                 </table>
                 </div>

                 <div className='dashboard__headerTitle'  style={{margin: '10px auto',width: '93%'}}>
       Search Users Based On Names,Phone,Email
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',margin: '0 auto',width: '90%'}} >
       Search Your Users,Start By Typing Name Or Phone Or Email.
       
     </div>
    

                 <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter User Name' value={searchOrders} onChange={e => setSearchOrders(e.target.value)} />
            </div>
                
           </div>



      
    <div className='dashboard__headerTitle'  style={{margin: '0 auto',width: '93%'}}>
       Send Promotional Message To Your Regular Customers
        <hr></hr>
     </div>
     <div className='deleteAccount' style={{color: 'white',margin: '0 auto',width: '90%'}} >
      Now You Can Send Promotional Messages To Your Existing Customers
       
     </div>
     {user_details.sms < allUsers.length ? (
          <div className='deleteAccount' style={{margin: '0 auto',width: '90%',color: 'green'}} >
         You Don't Have Enough SMS Credits To Send Promotional Messages To All Users, Go To Pricing Tab To Buy Some SMS Credits
          
        </div>
     ) : (
        <div className='deleteAccount' style={{color: 'green',margin: '0 auto',width: '90%'}} >
       By Sending Promotional Messages To All Users You Will Spend {allUsers.length} SMS Credits in Total
        
      </div>
     )}



                 <div className='handleStore__add'>
           <div className='handleStore__add--input'>
               <input type='text' placeholder='Enter Your Message' value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            {user_details.sms < allUsers.length ? (
                 <button style={{backgroundColor: 'gray'}} onClick={()=>{}}>Buy Credits</button>
            ) : (
                <button disabled={user_details.sms < allUsers.length} onClick={handleMessage}>Submit</button>
            )}
               
           </div>
           {/*  {orders?.map(order => (
                <Order 
                delivery
                handleDelete
                order={order} />
            ))} */}
      

        <Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={open}
  onClose={() => setOpen(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column', backgroundColor: 'white',padding: '20px'}}>
    <iframe width="560" height="315" src={currentVideo} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   <button onClick={() => history.push('/restro/guides')}>Show All Guides</button>
    </div>
 
</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={openOrder}
  onClose={() => setOpenOrder(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
    <Order pageId={pageId} delivery handleDelete cancel order={currentOrder}  handleModal={setOpenOrder} />
 
</Modal>
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
                         <h1>Manage Your Orders</h1>
                         <h3>Management of orders placed on your website simplifies online selling.</h3>
                   
                          <div className='site_preview--getStarted' onClick={handleGetStarted}>
                             Get Started
                          </div>
                      </div>

                      <div className='site_preview--topContainer--right'>
                           <img src={OrderSvg} style={{fill:"#FFFFFF"}} />
                      </div>
              </div>
           </div>
           <div className='guide__learn--more'>
               Learn More
          </div>
           <div className='site_preview--guide'>
              <div className='site_preview--guide--left'>
              <img src={OrderSvg} style={{fill:"#FFFFFF"}} />
              <h4>Management of orders placed on your website simplifies online selling.</h4>
              </div>
              <div className='site_preview--guide--right'>
                <iframe src={single_guides.order} />
              </div>
          </div>
          </div>
          )}
        </div>
    )
}

export default HandleOrders
