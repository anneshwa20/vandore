import { ExitToApp } from '@material-ui/icons'
import React from 'react'
import './HeaderRestro.css'

function HeaderRestro({title}) {
    return (
        <div className='headerRestro'>
            <h1>{title}</h1>
            <div className='headerRestro__right'>
               
                 <ExitToApp />
            </div>
        </div>
    )
}

export default HeaderRestro
