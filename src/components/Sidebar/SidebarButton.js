import React from 'react'
import { IconContext } from 'react-icons'
import { Link, useLocation } from 'react-router-dom'
import './SidebarButton.css'


const SidebarButton = (props) => {
    const location = useLocation();

    const isActive = location.pathname === props.to; //if the "to" pathname = current pathname, then the isActive will be true

    const btnClass = isActive ? 'btn-body active' : 'btn-body';
  return (
    <Link to={props.to}>
        <div className={btnClass}>
            <IconContext.Provider value={{size: '24px', className:'btn-icon'}}>
                {props.icon}
                <p className='btn-title'>{props.title}</p>
            </IconContext.Provider>
        </div>
    </Link>
  )
}

export default SidebarButton