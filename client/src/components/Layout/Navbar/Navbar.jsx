import React from 'react'
import Topbar from './Topbar'
import NavMenu from './NavMenu'
import { NavLink } from 'react-router'
import logo from '/logo1.png'

const Navbar = () => {
  return (
    <>
      <div className="navbar-container sticky-top">
        <div className="row">
            <div className="col-md-3">
                <NavLink to="/">
                    <img src={logo} alt="logo" className='brand-logo ' style={{marginLeft: "40px", marginTop: "5px", height:"70px", width: "260px"}} />
                </NavLink>
            </div>
            <div className="col-md-9">
                {/* topbar menu  */}
                <div>
                    <Topbar/> 
                </div>
                {/* main Menus */}
                <div>
                    <NavMenu/>   
                </div>
            </div>

        </div>
      </div>
    </>
  )
}

export default Navbar
