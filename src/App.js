import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import Menu from './Pages/Menu/Menu';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Checkout from './Pages/Checkout/Checkout';
import Login from './Pages/Login/Login';
import { auth, authMain, db } from './firebase';
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
    if(user){
        db.collection("users").doc(user.uid).collection('details').doc(`details_${user.uid}`)
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
     
          db.collection("analytics").doc(`${moment(new Date()).format('DD-MM-YYYY')}`)
          .get()
          .then(function(doc) {
            if (doc.exists) {
               setVisits(doc.data().visits);
            } else {
              // doc.data() will be undefined in this case
              db.collection('analytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).set({
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                visits: '1'
              })
              console.log("No such document!");
            }
          }).catch(function(error) {
            console.log("Error getting document:", error);
          });
     
       },[])

     useEffect(() => {
      
          db.collection("site").doc('site_info')
          .get()
          .then(function(doc) {
            if (doc.exists) {
                dispatch({
                  type: 'ADD_SITE_INFO',
                  site_info: doc.data()
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
      
        db.collection("site").doc('site_preview')
        .get()
        .then(function(doc) {
          if (doc.exists) {
              dispatch({
                type: 'ADD_SITE_PREVIEW',
                site_preview: doc.data()
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
      
      db.collection("site").doc('site_colors')
      .get()
      .then(function(doc) {
        if (doc.exists) {
            dispatch({
              type: 'ADD_SITE_COLORS',
              site_colors: doc.data()
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
      
        db.collection("site").doc('site_settings')
        .get()
        .then(function(doc) {
          if (doc.exists) {
              dispatch({
                type: 'ADD_SITE_SETTINGS',
                site_settings: doc.data()
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
     db.collection('store')
     .onSnapshot(snapshot => (
  
      dispatch({
        type: 'ADD_TO_STORE',
        store: snapshot.docs.map(doc => ({
          id: doc.id,
         title: doc.data().title,
         items: doc.data().items
      }))
  })
));
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

if(visits != ''){
  db.collection('analytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).update({
    visits: `${visits*1 + 1}`
  })
}
     

  return (
    <Router >
    <div className="app">
    
      <Switch>
      <Route path="/store">
      <VandoreBanner />
      <Header store={true} />
           <Menu />
          </Route>
        <Route path='/login'>
        <VandoreBanner />
        <Header login={true}/>
           <Login />
        </Route>
          <Route path="/checkout">
          <VandoreBanner />
          <Header cart={true}/>
             <Checkout />
          </Route>
          <Route path="/orders">
          <VandoreBanner />
          <Header orders={true}/>
           <Orders />
          </Route>
          <Route path="/user">
          <VandoreBanner />
          <Header account={true}/>
           <User />
          </Route>
          <Route exact  path="/restro/:page" component={Restro}>
          
          </Route>
          <Route exact  path="/posts/:id" component={Posts}></Route>
          <Route exact  path="/handleCategory/:category" component={HandleCategory}></Route>
          <Route exact  path="/chats/:roomId" component={Chats}></Route>
          <Route exact  path="/chatsPublic/:roomId" component={ChatsPublic}></Route>
          <Route path="/about">
          <VandoreBanner />
          <Header />
          <About />
          </Route>
          <Route path="/manageGuides">
            <ManageGuides />
          </Route>
        
          <Route path="/singleGuides">
            <GuideUpload />
          </Route>
          <Route exact  path="/handleGuideContent/:category" component={GuideContent}></Route>
          <Route path="/gallery">
          <VandoreBanner />
          <Header />
          <Gallery />
          </Route>
          <Route path="/payment">
          <VandoreBanner />
          <Header />
            <Elements stripe={promise}>
               <Payment />
            </Elements>
           </Route>
         
          <Route path="/">
            <VandoreBanner />
          <Header home={true}/>
            <Home />
          </Route>
     </Switch>
            
    </div>
    </Router>

  );
}

export default App;
