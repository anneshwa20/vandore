import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { authMain, db, dbMain } from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';
import moment from 'moment'
import { useHistory } from 'react-router-dom';

function StateFill({id,authorization}) {
    const [{user,store,user_details},dispatch]= useStateValue();
    const [visits,setVisits]= useState('');
    const history= useHistory();

    console.log('this is working',id);

               
   
  
 
  
       useEffect(() => {
       
            db.collection(id).doc('analytics').collection("analytics").doc(`${moment(new Date()).format('DD-MM-YYYY')}`)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                 setVisits(doc.data().visits);
              } else {
                // doc.data() will be undefined in this case
                db.collection(id).doc('analytics').collection('analytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).set({
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
        
            db.collection(id).doc('site').collection("site").doc('site_info')
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
        
          db.collection(id).doc('site').collection("site").doc('site_preview')
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
        
        db.collection(id).doc('site').collection("site").doc('site_colors')
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
        
      db.collection(id).doc('social').collection("social").doc('social_links')
      .get()
      .then(function(doc) {
        if (doc.exists) {
            dispatch({
              type: 'ADD_SOCIAL_LINKS',
              social_links: doc.data()
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
        
          db.collection(id).doc('site').collection("site").doc('site_settings')
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
       db.collection(id).doc('store').collection('store')
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

  
  if(visits != ''){
    db.collection(id).doc('analytics').collection('analytics').doc(`${moment(new Date()).format('DD-MM-YYYY')}`).update({
      visits: `${visits*1 + 1}`
    })
  }
       
    return (
        <div style={{display: 'none'}}>
            
        </div>
    )
}

export default StateFill
