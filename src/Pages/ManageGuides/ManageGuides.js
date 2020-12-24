import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import './ManageGuides.css'

function ManageGuides() {
    const[category,setCategory]= useState('');
    const[categories,setCategories]= useState([]);

    useEffect(() => {
  
        db.collection('guides')
        .onSnapshot(snapshot => (
            setCategories(snapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                items: doc.data().items
            })))
        ))
       
        },[])

    const handleCategory= () => {
        db.collection('guides').add({
            title: category,
            items: []
        }).then(alert('category updated')).then(refreshPage);
    }

    const refreshPage = ()=>{
        window.location.reload();  }

    return (
        <div className='manageGuides'>
            <div className='manageGuides__category'>
                <input type='text' placeholder='Enter Category Name' value={category} onChange={e => setCategory(e.target.value)} />
                <button onClick={handleCategory}>Submit</button>
            </div>

            <div className='manageGuides__categories'>
             {categories?.map(cat => (
                 <Link to={`/handleGuideContent/${cat.id}`}>{cat.title}</Link>
             ))}
            </div>
        </div>
    )
}

export default ManageGuides
