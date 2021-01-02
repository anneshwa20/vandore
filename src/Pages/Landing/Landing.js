import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../../firebase';

function Landing(props) {
    const pageId= props.match.params.id;
    const[show,setShow]= useState(true);
    const history= useHistory();

    useEffect(() => {
        
        db.collection(pageId.toUpperCase()).doc('site').collection("site").doc('site_info')
        .get()
        .then(function(doc) {
          if (doc.exists) {
             history.push(`/vandore/${pageId}/home`);
          } else {
            // doc.data() will be undefined in this case
            setShow(false);
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
   
     },[])

    return (
        <div>
         {show ? '' : 'NO VANDORE SITE FOUND IN THIS URL'}
        </div>
    )
}

export default Landing
