import React from 'react'
import { QRCode } from 'react-qrcode-logo'
import { useStateValue } from '../../StateProvider'
import './QRComponent.scss'

function QRComponent() {
    const [{user_details,user,site_info,ref}] = useStateValue();

    return (
        <div className='QRComponent' ref={ref}>
         <div className='QRComponentTop'>
            <h3>Checkout Our Website</h3>
          
         </div>
        <div className='QRComponentQR'>
        <p>Scan QR to check our Website</p>
          <QRCode  ref={ref} logoWidth={70} logoHeight={70} logoImage='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png' value={`${user_details.business  ? `https://vandore.in/${user_details?.business.toUpperCase()}` : 'https://vandore.in'}`} />
        </div>
        <div className='QRComponentBottom'>
            <h3>{user_details?.business}</h3>
            <h4>vandore.in/{user_details?.business}</h4>
            <div className='QRComponentBottom--logo'>
                <img src='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png'/>
                <h2>ANDORE</h2>
            </div>
        </div>
        
        </div>
    )
}

export default QRComponent
