import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="header">
      <NavLink exact activeClassName="active" to="/" className="header-element">
        Home
      </NavLink>
      <NavLink activeClassName="active" to="/appimg" className="header-element">
        Partitura
      </NavLink>
      <NavLink activeClassName="active" to="/appnames" className="header-element">
        Nomes
      </NavLink>
      <NavLink activeClassName="active" to="/appsymbols" className="header-element">
        Letras
      </NavLink>
    </nav>
  );
}
export default Header;