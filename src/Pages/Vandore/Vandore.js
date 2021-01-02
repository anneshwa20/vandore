import React from 'react'
import Header from '../../components/Header/Header';
import VandoreBanner from '../../components/VandoreBanner/VandoreBanner';
import About from '../About/About';
import Checkout from '../Checkout/Checkout';
import Gallery from '../Gallery/Gallery';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Menu from '../Menu/Menu';
import Orders from '../Orders/Orders';
import Payment from '../Payment/Payment';
import StateFill from '../StateFill';
import User from '../User/User';

function Vandore(props) {
    const pageId= props.match.params.id;
    const page= props.match.params.page;

    return (
    <>
       <StateFill id={pageId.toUpperCase()} />
       {page === 'store' ? (
           <>
           <VandoreBanner />
           <Header pageId={pageId.toUpperCase()}  store={true} />
           <Menu  pageId={pageId.toUpperCase()}/>
        </>
       ) : ''}
 
      {page === 'login' ? (
           <>
           <VandoreBanner />
           <Header pageId={pageId.toUpperCase()}  login={true}/>
           <Login  pageId={pageId.toUpperCase()}/>
        </>
       ) : ''}

     {page === 'checkout' ? (
           <>
           <VandoreBanner />
           <Header pageId={pageId.toUpperCase()}  cart={true}/>
          <Checkout  pageId={pageId.toUpperCase()}/>
        </>
       ) : ''}

     {page === 'orders' ? (
           <>
           <VandoreBanner />
           <Header pageId={pageId.toUpperCase()}  orders={true}/>
           <Orders  pageId={pageId.toUpperCase()}/>
        </>
       ) : ''}

    {page === 'user' ? (
           <>
           <VandoreBanner />
           <Header pageId={pageId.toUpperCase()}  account={true}/>
           <User  pageId={pageId.toUpperCase()}/>
        </>
       ) : ''}


    {page === 'about' ? (
           <>
           <VandoreBanner />
           <Header pageId={pageId.toUpperCase()}  />
            <About  pageId={pageId.toUpperCase()}/>
        </>
       ) : ''}

    {page === 'gallery' ? (
           <>
           <VandoreBanner />
           <Header pageId={pageId.toUpperCase()}  />
           <Gallery  pageId={pageId.toUpperCase()}/>
        </>
       ) : ''}

   {page === 'payment' ? (
           <>
           <VandoreBanner />
           <Header pageId={pageId.toUpperCase()}  />
           <Payment  pageId={pageId.toUpperCase()}/>
        </>
       ) : ''}

{page === 'home' ? (
           <>
           <VandoreBanner />
           <Header pageId={pageId.toUpperCase()}  home={true}/>
             <Home  pageId={pageId.toUpperCase()}/>
        </>
       ) : ''}
    

            
        </>
    )
}

export default Vandore
