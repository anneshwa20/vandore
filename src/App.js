import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import Menu from './Pages/Menu/Menu';
import { BrowserRouter as Router,Switch,Route, Link } from 'react-router-dom';
import Checkout from './Pages/Checkout/Checkout';
import Login from './Pages/Login/Login';
import { auth, authMain, db, dbMain } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Pages/Payment/Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './Pages/Orders/Orders';
import User from './Pages/User/User';
import firebase from 'firebase';
import About from './Pages/About/About';
import Restro from './Pages/Restro/Restro';
import Gallery from './Pages/Gallery/Gallery';
import HandleCategory from './Pages/HandleCategory/HandleCategory';
import Posts from './Pages/Posts/Posts';
import Chats from './Pages/Chats/Chats';
import ChatsPublic from './Pages/Chats/ChatsPublic';
import ManageGuides from './Pages/ManageGuides/ManageGuides';
import GuideContent from './Pages/GuideContent/GuideContent';
import GuideUpload from './Pages/GuideUpload/GuideUpload';
import moment from 'moment';
import LineChart from './components/LineChart/LineChart';
import VandoreBanner from './components/VandoreBanner/VandoreBanner';
import LoginVandore from './Pages/LoginVandore/LoginVandore';
import Vandore from './Pages/Vandore/Vandore';
import LoginVandoreClient from './Pages/LoginVandoreClient/LoginVandoreClient';
import Landing from './Pages/Landing/Landing';


const promise= loadStripe("pk_test_51HhCb7Ks7edpRlOlanfeP933Rc1cT6evN35X3K0t9HCOmDHd5gtMo83sfnIchnEvPyqxnVDzCwQR31h2VyGzptLN00PyDR59DU");


function App() {
  const [{user,store},dispatch]= useStateValue();
  const [visits,setVisits]= useState('');



  

  useEffect(() => {
    authMain.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>', authUser);

      if(authUser){
       dispatch({
         type: 'SET_USER',
         user: authUser
       })
      }else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
        dispatch({
          type: 'DELETE_USER'
        })
     }
    })
  },[]);


     useEffect(() => {
      
      db.collection("single_guides").doc('guides')
      .get()
      .then(function(doc) {
        if (doc.exists) {
            dispatch({
              type: 'ADD_SINGLE_GUIDES',
              single_guides: doc.data()
            })
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
 
   },[])

useEffect(() => {
  db.collection('guides')
  .onSnapshot(snapshot => (

   dispatch({
     type: 'ADD_TO_GUIDES',
     guides: snapshot.docs.map(doc => ({
       id: doc.id,
      title: doc.data().title,
      items: doc.data().items
   }))
})
));
},[])

useEffect(() => {
  db.collection('hindi_guides')
  .onSnapshot(snapshot => (

   dispatch({
     type: 'ADD_TO_HINDI_GUIDES',
     hindi_guides: snapshot.docs.map(doc => ({
       id: doc.id,
      title: doc.data().title,
      items: doc.data().items
   }))
})
));
},[])


useEffect(() => {
  if(user){
      dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`)
      .get()
      .then(function(doc) {
        if (doc.exists) {
            dispatch({
              type: 'UPDATE_USER',
              user_details: doc.data()
            })
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
  }else{
     console.log('ERROR')
  }
   },[user])




  return (
    <Router >
    <div className="app">
    
      <Switch>

        <Route path='/vandoreLogin'>
 
           <LoginVandore />
        </Route>

        <Route path='/vandoreClient'>
 
           <LoginVandoreClient />
        </Route>

   
          <Route exact  path="/restro/:page/:id" component={Restro}></Route>
          <Route exact  path="/posts/:pageId/:id" component={Posts}></Route>
          <Route exact  path="/handleCategory/:id/:category" component={HandleCategory}></Route>
          <Route exact  path="/chats/:id/:roomId" component={Chats}></Route>
          <Route exact  path="/chatsPublic/:id/:roomId" component={ChatsPublic}></Route>
        
          <Route path="/manageGuides">
            <ManageGuides />
          </Route>
        
          <Route path="/singleGuides">
            <GuideUpload />
          </Route>
          <Route exact  path="/handleGuideContent/:category" component={GuideContent}></Route>
          <Route exact  path="/vandore/:id/:page" component={Vandore}></Route>
        
         
          <Route exact path="/:id" component={Landing}>
       
              </Route>
         
           <Route exact path="/" >
          VANDOOR LANDING PAGE
          <Link to='/vandoreLogin'>Register Your Brand</Link>
          <Link to='/vandoreClient'>Log In</Link>
              </Route>
  
          

     </Switch>
            
    </div>
    </Router>

  );
}

export default App;
