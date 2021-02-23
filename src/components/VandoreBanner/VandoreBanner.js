import React from 'react'
import { useStateValue } from '../../StateProvider';
import './VandoreBanner.scss'



function VandoreBanner() {
  const [{brand},dispatch]= useStateValue();
    const handleRedirect= () => {
        window.open('https://vandore.in', '_blank');
    }
    return (
        <div className='vandoreBanner' style={{display : `${brand.plan === 'gold' ? 'none' : 'flex'}`}}>
            <div className='vandoreBanner__left'>
             <p>Website made with</p>
            <img src='https://i.ibb.co/kKdmBDd/Vandore-Logo-3-4-removebg-preview.png' style={{width: '20px',height: '20px'}}/>
            <h3>ANDORE</h3>
            </div>

            <div className='vandoreBanner__right'>
                <div className='vandoreBanner__right--button' onClick={handleRedirect}>
                Visit Vandore
                    </div>  
            </div>
        </div>
    )
}

export default VandoreBanner
