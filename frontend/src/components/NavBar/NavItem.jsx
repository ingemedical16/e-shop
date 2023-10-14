import React, { Children } from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css'

const NavItem = ({to,onClick,Children}) => {
  return (
    <li className="nav-item">
                <NavLink
                  exact="true"
                  to={to}
                  className={({ isActive, isPending }) =>
    isPending ? "pending nav-links" : isActive ? "active nav-links" : "nav-links"
  }
                  onClick={onClick}
                >
                  {Children}
                </NavLink>
              </li>
  )
}

export default NavItem