import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
 return (
   <>
   <nav className="navbar">
    <ul>
      <li>
        <Link to="/">drugTrace</Link>
        <Link to="/manufacturer">manufacturer</Link>
      </li>
    </ul>
  </nav>
</>
);
};

export default Navbar;