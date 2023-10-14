import React from 'react';
import { Link } from "react-router-dom";

import './Logo.css';


const Logo = ({text, url}) => {
let logo = url
?  <div>
<Link to="/">
  <img
    src={url}
    alt=""
  />
</Link>
</div> 
:  <h1 className="logo">{text || "Logo"}</h1>;
  return (
    <>{logo}</>
  )
}

export default Logo