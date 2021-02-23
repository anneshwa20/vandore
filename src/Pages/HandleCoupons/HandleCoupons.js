import React, { useState,useEffect } from 'react'
import { db, firebaseApp } from '../../firebase';
import './HandleCoupons.scss'
import firebase from 'firebase';

import { Add, Menu} from '@material-ui/icons';

import { useStateValue } from '../../StateProvider';
import { FormControl, InputLabel, makeStyles, MenuItem, Modal, Select } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import CouponSvg from '../../icons/undraw_empty_cart_co35.svg';
import { exportComponentAsJPEG } from 'react-component-export-image';
import CouponCard from '../../components/CouponCard/CouponCard';

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '60%',
    },
  }));


function HandleCoupons({id}) {
    const componentRef= React.createRef();
    const classes= useStyles();
   const [coupon,setCoupon]= useState('');
   const [type,setType]= useState('Flat Discount');
   const [discount,setDiscount]= useState('');
   const [minOrder,setMinOrder]= useState('');
   const [minUser,setMinUser]= useState('');
   const [openType,setOpenType]= useState(false);
   const [coupons,setCoupons] = useState([]);

  const [tax,setTax]= useState('');
  const [delivery,setDelivery]= useState('');
  const [deliveryAbove,setDeliveryAbove]= useState('');

   const handleChange = (event) => {
    setType(event.target.value);
   };

  const handleClose = () => {
    setOpenType(false);
  };

  const handleOpen = () => {
    setOpenType(true);
  };





   const [openAlert,setOpenAlert]= useState(false);
   const [openImage,setOpenImage]= useState(false);
   const [show,setShow]= useState(false);
   const [showExtra,setShowExtra]= useState(false);

  const pageId= id;
   const history= useHistory();
    const[{single_guides,site_preview,sidebarVandore,user,user_details,site_info},dispatch]= useStateValue();
   const [open,setOpen]= useState(false);
   const [currentVideo,setCurrentVideo]= useState('');


   const manageVideo= (link) => {
    setOpen(true);
    setCurrentVideo(link);
  }

  const handleGetStarted= () => {
    db.collection(id.toUpperCase()).doc('site').collection('site').doc('site_preview').update({
        coupon: true
    }).then(refreshPage);
}
const refreshPage = ()=>{
    window.location.reload();  }

    useEffect(() => {
        db.collection(id.toUpperCase()).doc('coupons').collection('coupons')
        .orderBy("timestamp","desc")
        .onSnapshot(snapshot => {
            setCoupons(snapshot.docs.map(doc => ({ id: doc.id,data:doc.data()})))
        });
    },[]);


    const handleSubmitCoupon =() => {
        db.collection(id.toUpperCase()).doc('coupons').collection('coupons').doc(coupon).set({
          coupon: coupon,
          type: type,
          discount: discount,
          minOrder: minOrder,
          minUser: minUser,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        setCoupon('');
        setType('');
        setDiscount('');
        setMinUser('');
        setMinOrder('');


        setShow(false);
    }

    const handleExtra=() => {
      db.collection(id.toUpperCase()).doc('site').collection('site').doc('site_info').update({
          tax: tax,
          delivery: delivery,
          deliveryAbove: deliveryAbove
      });
      setShowExtra(false);
    }

    useEffect(() => {
      setTax(site_info.tax);
      setDelivery(site_info.delivery);
      setDeliveryAbove(site_info.deliveryAbove);
    }, [site_info])

  


    return (
        <div className='handleCoupons'>
          <div className='vandoreLogoHeader'>
         <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
         <h4>ANDORE</h4>
         </div>
     {site_preview.coupon ? (
       <>
           <div className='vandoreHeaderMobile' onClick={() => {
            dispatch({
                type: 'UPDATE_SIDEBAR_VANDORE',
                sidebarVandore: !sidebarVandore
            })
        }}>
             {sidebarVandore ? '' :  <Menu  style={{width: '40px',height: '40px',color: 'white',marginRight: '10px'}}/> }
            <h1>COUPONS</h1>
        </div>
        <div className='vandoreHeaderPc'>
            <h1>COUPONS</h1>
        </div>
    <div className='guide_tutorial_toast'>
     <p>
     If you face any difficulties regarding Posts, then see our Posts guides
     </p> 
     <div onClick={() => manageVideo(single_guides.coupon)}>Guides</div>
    </div>




        {show ? '' : (
         <div  onClick={() => setShow(!show)} className='category__add--button'>
              <Add /> Add New Coupon
        </div>
            )}
              {showExtra ? '' : (
         <div  onClick={() => setShowExtra(!showExtra)} className='category__add--button'>
              <Add /> Set/Update Your Tax Rate And Delivery Charges
        </div>
            )}
   
  
<div className='handleCoupons__coupons'>
        {coupons.map(coupon => (
            
           <CouponCard coupon={coupon} id={id}/>
        )) }
 
</div>

<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={open}
onClose={() => setOpen(false)}
aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column', backgroundColor: 'white',padding: '20px'}}>
<iframe width="560" height="315" src={currentVideo} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<button onClick={() => history.push(`/restro/guides/${id.toUpperCase()}`)}>Show All Guides</button>
</div>

</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={user_details.plan === 'lite' ? true : false}

aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
   Update Your Vandore Plan To Use This Feature
 </div>
 
 <div style={{display: 'flex',justifyContent: 'space-around'}}>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={() => history.push(`/restro/dashboard/${pageId}`)}>
  Dashboard
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}} onClick={()=>  history.push(`/restro/pricing/${pageId}`)}>
   Upgrade
 </div>
 </div>
</div>
</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={openAlert}
onClose={() => setOpenAlert(false)}
aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
   Your data was upated
 </div>
 <div className='modal__button' style={{margin: '10px auto', backgroundColor: 'black',color: 'white',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer',borderRadius: '12px'}} onClick={()=> setOpenAlert(false)}>
   Ok
 </div>
</div>

</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={show}
  onClose={() => setShow(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
   
    <div className='handleCategory__form'>
          
          <h2>Add New Coupon</h2>
         
          <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setCoupon(e.target.value)} value={coupon} placeholder='Enter Your Coupon Code' />
          </div>
          
 <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Discount Type</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openType}
          onClose={handleClose}
          onOpen={handleOpen}
          value={type}
          onChange={handleChange}
        >
         
          <MenuItem value='Flat Discount'>Flat Discount</MenuItem>
          <MenuItem value='Discount Percentage'>Discount Percentage</MenuItem>
        
        </Select>
</FormControl>
        
         <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setDiscount(e.target.value)} value={discount}  placeholder={type === 'Flat Discount' ? 'Set Discount Amount' : 'Set Discount Percentage'}/>
         </div>
         <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setMinOrder(e.target.value)} value={minOrder}  placeholder='Set Minimum Order Value'/>
          </div>
          <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setMinUser(e.target.value)} value={minUser}  placeholder='Maximum Users For This Coupon'/>
          </div>
          
         <button onClick={handleSubmitCoupon}>Submit</button>
     
      </div>

 
</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
  open={showExtra}
  onClose={() => setShowExtra(false)}
  aria-labelledby="Guide Video"
  aria-describedby="Guide Video description"
>
   
    <div className='handleCategory__form'>
          
          <h2>Set/Update Tax Rate And Delivery Charges</h2>
         
         <p>Tax Rate (in %)</p>
          <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setTax(e.target.value)} value={tax} placeholder='Enter Your Tax Rate in Percentage' />
          </div>
          

          <p>Delivery Charge (in Rs)</p>
         <div className='handleCategory__form--input'>
          
         <input type='text' onChange={e => setDelivery(e.target.value)} value={delivery}  placeholder='Enter Your Delivery Charge'/>
         </div>
         <p> Delivery Free Above (in Rs)</p>
         <div className='handleCategory__form--input'>
         <input type='text' onChange={e => setDeliveryAbove(e.target.value)} value={deliveryAbove}  placeholder='Delivery Free Above (in Rs.)'/>
          </div>
        
         <button onClick={handleExtra}>Update</button>
     
      </div>

 
</Modal>
<Modal style={{display: "flex",alignItems: 'center',justifyContent: 'center'}}
open={openImage}

aria-labelledby="Guide Video"
aria-describedby="Guide Video description"
>
<div style={{display: 'flex',flexDirection: 'column', backgroundColor: 'white',width: '400px',height: 'max-content'}}>
 <div className='modal__header' style={{padding: '20px',color: 'white',backgroundColor: 'green'}}>
  Please wait your photo is uploading
 </div>
 
 <div className='modal__button' style={{margin: '10px auto',padding: '10px', display: 'flex',justifyContent: 'center',cursor: 'pointer'}}>
   <img src='https://i.ibb.co/HqghKW6/2.gif' />
 </div>
</div>

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
                   <h1>Coupons</h1>
                   <h3>Creation & Customisation of coupons, helps in raising the sales conversion rate.</h3>
             
                    <div className='site_preview--getStarted' onClick={handleGetStarted}>
                       Get Started
                    </div>
                </div>

                <div className='site_preview--topContainer--right'>
                     <img src={CouponSvg} style={{fill:"#FFFFFF"}} />
                </div>
        </div>
     </div>
     <div className='guide__learn--more'>
         Learn More
    </div>
     <div className='site_preview--guide'>
        <div className='site_preview--guide--left'>
        <img src={CouponSvg} style={{fill:"#FFFFFF"}} />
        <h4>Creation & Customisation of coupons, helps in raising the sales conversion rate.</h4>
        </div>
        <div className='site_preview--guide--right'>
          <iframe src={single_guides.coupon} />
        </div>
    </div>
    </div>
     )}

        </div>
    )
}

export default HandleCoupons
