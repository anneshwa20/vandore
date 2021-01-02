import { IconButton } from '@material-ui/core';
import { ArrowBackIosSharp, ArrowForwardIosSharp, Delete, Edit, Update } from '@material-ui/icons';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './StoreCategory.scss'

function StoreCategory({pageId,category,updateCategory,deleteCategory}) {
    const [editCategory,setEditCategory]= useState(category.title);
    const [edit,setEdit]= useState(false);
    const history= useHistory();

    return (
        <div className='handleStore__category' style={{border: `6px solid rgba(66, 135, 245, 1)`}}>
          {edit ? (
      <div className='handleStore__category--edit'>
          <h2>{category.title}</h2>
          <div className='handleStore__category--edit--input'>
            <input type='text'  value={editCategory} onChange={e => setEditCategory(e.target.value)} />
        </div>
        <div className='handleStore__category--buttons'>
      
        <IconButton onClick={() => setEdit(false)}><Edit style={{color: 'black',backgroundColor: 'rgba(66, 135, 245, 0.2)',borderRadius: '99px',padding: '10px'}}/></IconButton>
       
           
              <IconButton onClick={() => updateCategory(category.id,editCategory)}><Update style={{color: 'black',backgroundColor: 'rgba(66, 135, 245, 0.2)',borderRadius: '99px',padding: '10px'}}/></IconButton>
          

           
              <IconButton onClick={() => deleteCategory(category.id)}><Delete style={{color: 'black',backgroundColor: 'rgba(66, 135, 245, 0.2)',borderRadius: '99px',padding: '10px'}}/></IconButton>
            
    </div>
            
       </div>
          )  : (
            <div className='handleStore__category--noedit'>
        
            <h2>{category.title}</h2>
            <h1>{category.items.length}</h1>
       
          
            <div className='handleStore__category--buttons'>
              
                <IconButton onClick={() => setEdit(true)}><Edit style={{color: 'black',backgroundColor: 'rgba(66, 135, 245, 0.2)',borderRadius: '99px',padding: '10px'}} /></IconButton>
              
                
                <IconButton onClick={() => history.push(`/handleCategory/${pageId}/${category.id}`)}><ArrowForwardIosSharp style={{color: 'black',backgroundColor: 'rgba(66, 135, 245, 0.2)',borderRadius: '99px',padding: '10px'}}/></IconButton>
                
            </div>
            </div>
          )}
        </div>
    )  
}

export default StoreCategory
