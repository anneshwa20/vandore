import React from 'react'
import './MobileAppHome.scss'
import QrReader from 'react-qr-scanner';
function MobileAppHome() {

    const handleScan = data => {
        if (data) {
     
        
        window.location.href= data;
        
        }
      }
     const  handleError = err => {
        console.error(err)
      }
    
    
      const previewStyle = {
        height: 200,
        width: 220,
        alignSelf: 'center',
        borderRadius: '10px',
        border: '1px solid green',
       marginTop: '50px',
       marginBottom: '50px',
       justifySelf: 'center'
      }
    return (
        <div className='mobileAppHome'>
            <div className='QRComponentBottom--logo'>
                <img src='https://i.ibb.co/TbGQWXh/Vandore-Logo-3-4-removebg-preview.png'/>
                <h2>ANDORE</h2>
            </div>
            <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={previewStyle}
        />

        <h4>Create Your Own Brand </h4>
        <h4>Log On To Your Brand Dashboard</h4>
        <h4>Become A Vandore Agent And Earn Money</h4>
        </div>
    )
}

export default MobileAppHome
