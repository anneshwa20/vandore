import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import Menu from './Pages/Menu/Menu';
import { BrowserRouter as Router,Switch,Route, Link } from 'react-router-dom';
import Checkout from './Pages/Checkout/Checkout';
import Login from './Pages/Login/Login';
import { auth, authMain, db, dbMain,firebaseApp } from './firebase';
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
import HandleSliderTemplate from './Pages/HandleSliderTemplate/HandleSliderTemplate';
import LandingPage from './Pages';
import SigninPage from './Pages/signin';
import SignupPage from './Pages/signup';
import MobileAppHome from './Pages/MobileAppHome/MobileAppHome';
import HandleSignout from './Pages/HandleSignout/HandleSignout';
import Products from './Pages/Products/Products';
import Terms from './Pages/Terms/Terms';
import Register from './Pages/Register/Register';
import Vlogin from './Pages/Vlogin/Vlogin';
import withClearCache from "./ClearCache";

const ClearCacheComponent = withClearCache(MainApp);


function App() {
  return <ClearCacheComponent />;
}


function MainApp() {
  const [{user,store},dispatch]= useStateValue();
  const [visits,setVisits]= useState('');



  

  useEffect(() => {
    authMain.onAuthStateChanged(authUser => {
      

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
  .orderBy("timestamp")
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


   useEffect(() => {
     if(user) {
      dbMain.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`)
      .onSnapshot(function(doc) {
        dispatch({
          type: 'UPDATE_USER',
          user_details: doc.data()
        })
      });
     }
   
},[user]); 

useEffect(() => {
  
   dbMain.collection("general").doc('version')
   .onSnapshot(function(doc) {
      if(doc.data().version !== '1.3.0'){
        if('caches' in window){
          caches.keys().then((names) => {
                  // Delete all the cache files
                  names.forEach(name => {
                      caches.delete(name);
                  })
              });
      
              // Makes sure the page reloads. Changes are only visible after you refresh.
              
          }
          window.location.reload(true);
      }
   });
 

},[]); 






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

        <Route path='/signout'>
 
          <HandleSignout />
        </Route>

   
          <Route exact  path="/restro/:page/:id" component={Restro}></Route>
          <Route exact  path="/posts/:pageId/:id" component={Posts}></Route>
          <Route exact  path="/products/:pageId/:id" component={Products}></Route>
          <Route exact  path="/handleCategory/:id/:category" component={HandleCategory}></Route>
          <Route exact  path="/componentTemplate/:id/:component" component={HandleSliderTemplate}></Route>
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
        
          <Route exact path="/signin" component={Vlogin}>
          
          </Route>
              
         
          <Route exact path="/signup" component={Register}>
          
          </Route>

          <Route exact path="/terms" component={Terms}>
          
          </Route>

          <Route exact path="/mobile" component={MobileAppHome}>
          
          </Route>
         
          <Route exact path="/:id" component={Landing}>
       
              </Route>
         
           <Route exact path="/" component={LandingPage}>
          
              </Route>

             
  
          

     </Switch>
            
    </div>
    </Router>

  );
}

export default App;
