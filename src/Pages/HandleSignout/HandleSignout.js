import React from 'react'
import { useHistory } from 'react-router-dom';
import { authMain } from '../../firebase';
import { useStateValue } from '../../StateProvider'

function HandleSignout() {
    const [{user},dispatch]= useStateValue();
    const history= useHistory();
    if(user){
       authMain.signOut();
    }else{
       history.push('/signin');
    }
    return (
        <div>
            
        </div>
    )
}

export default HandleSignout
