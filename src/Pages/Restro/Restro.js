import React from 'react'
import './Restro.scss'
import SidebarRestro from '../../components/SidebarRestro/SidebarRestro'
import HandlePost from '../HandlePost/HandlePost'
import HandleStore from '../HandleStore/HandleStore'
import HandleOrders from '../HandleOrders/HandleOrders'
import HandleSlider from '../HandleSlider/HandleSlider'
import HandleAbout from '../HandleAbout/HandleAbout'
import HandleFeedback from '../HandleFeedback/HandleFeedback'
import HandleGallery from '../HandleGallery/HandleGallery'
import HandleCategory from '../HandleCategory/HandleCategory'
import HandleUser from '../HandleUser/HandleUser'
import HandlePayment from '../HandlePayments/HandlePayment'
import HandleDashboard from '../HandleDashboard/HandleDashboard'
import HandleSettings from '../HandleSettings/HandleSettings'
import HandleGuide from '../HandleGuide/HandleGuide'
import { useStateValue } from '../../StateProvider'

function Restro(props) {
    const [{sidebarVandore},dispatch]= useStateValue();

    return (
        <div className='restro'>
        <div className='vandoreMobile'>
            {sidebarVandore ? <SidebarRestro active={props.match.params.page} /> : ''}
            {props.match.params.page === 'post' ? <HandlePost /> : ''}
       {props.match.params.page === 'store' ? <HandleStore /> : ''}
       {props.match.params.page === 'orders' ? <HandleOrders /> : ''}
       {props.match.params.page === 'slider' ? <HandleSlider /> : ''}
       {props.match.params.page === 'about' ? <HandleAbout /> : ''}
       {props.match.params.page === 'feedback' ? <HandleFeedback /> : ''}
       {props.match.params.page === 'gallery' ? <HandleGallery /> : ''}
       {props.match.params.page === 'users' ? <HandleUser /> : ''}
       {props.match.params.page === 'payments' ? <HandlePayment /> : ''}
       {props.match.params.page === 'dashboard' ? <HandleDashboard /> : ''}
       {props.match.params.page === 'settings' ? <HandleSettings /> : ''}
       {props.match.params.page === 'guides' ? <HandleGuide /> : ''}
        </div>
        <div className='vandorePc'>
        <SidebarRestro active={props.match.params.page} />
        {props.match.params.page === 'post' ? <HandlePost /> : ''}
       {props.match.params.page === 'store' ? <HandleStore /> : ''}
       {props.match.params.page === 'orders' ? <HandleOrders /> : ''}
       {props.match.params.page === 'slider' ? <HandleSlider /> : ''}
       {props.match.params.page === 'about' ? <HandleAbout /> : ''}
       {props.match.params.page === 'feedback' ? <HandleFeedback /> : ''}
       {props.match.params.page === 'gallery' ? <HandleGallery /> : ''}
       {props.match.params.page === 'users' ? <HandleUser /> : ''}
       {props.match.params.page === 'payments' ? <HandlePayment /> : ''}
       {props.match.params.page === 'dashboard' ? <HandleDashboard /> : ''}
       {props.match.params.page === 'settings' ? <HandleSettings /> : ''}
       {props.match.params.page === 'guides' ? <HandleGuide /> : ''}
        </div>
     
        
     
        </div>
    )
}

export default Restro
