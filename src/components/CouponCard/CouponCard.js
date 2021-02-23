import { CloudDownload, Delete } from '@material-ui/icons';
import React from 'react'
import { useState } from 'react';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { QRCode } from 'react-qrcode-logo';
import { db } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import './CouponCard.scss'




function CouponCard({coupon,id}) {
    const componentRef= React.createRef();
    const [{user,user_details},dispatch]= useStateValue();

    const handleDeleteCoupon=(coupon) => {
        db.collection(id.toUpperCase()).doc('coupons').collection('coupons').doc(coupon).delete();
      }
    
    return (
        <div style={{display: 'flex',flexDirection: 'column'}}>
             <div className='coupon__card' ref={componentRef}>
             <div className='coupon__card--left'>
                  <div className='coupon__save'>
                       <h3>SAVE</h3>
                        <h2>{coupon.data.type === 'Flat Discount' ? `${coupon.data.discount}Rs` : `${coupon.data.discount}%`}</h2>
                  </div>
             </div>
             <div className='coupon__card--right'>
                <div className='coupon__card--logo'>
                        <img src='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png'/>
                        <h4>ANDORE</h4>
                </div>
                <div className='coupon__qr'>
                 <p>Scan QR to check our Website</p>
                 <QRCode enableCORS={true} size={100} logoWidth={30} logoHeight={30} logoImage='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png' value={`${user_details.business  ? `https://vandore.in/${user_details?.business.toUpperCase()}` : 'https://vandore.in'}`} />
                 <p>Get Instant Discount of {coupon.data.type === 'Flat Discount' ? `${coupon.data.discount}Rs` : `${coupon.data.discount}%`} On A Minimum Order Of {coupon.data.minOrder} Rs</p>
                 </div>

                <div className='coupon__card--coupon'>
                    {coupon.data.coupon}
                </div>

             </div>
            </div>
            <div className='coupon__button'>
            <button onClick={() => handleDeleteCoupon(coupon.id)}><Delete /></button>
            <button onClick={() => exportComponentAsJPEG(componentRef)}><CloudDownload /></button>
            </div>
           
        </div>
    )
}

export default CouponCard
