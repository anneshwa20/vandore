import React from 'react'
import './VandoreBanner.scss'



function VandoreBanner() {
    return (
        <div className='vandoreBanner'>
            <div className='vandoreBanner__left'>
             <p>Store made with</p>
            <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
            <h3>ANDORE</h3>
            </div>

            <div className='vandoreBanner__right'>
                <div className='vandoreBanner__right--button'>
                Visit Vandore
                    </div>  
            </div>
        </div>
    )
}

export default VandoreBanner
