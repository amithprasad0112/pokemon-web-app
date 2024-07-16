import React from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-logo" to="/">
          <img
            src="./media/nav-logo.svg"
            alt="Pokemon-Logo"
            className="img-logo"
          />
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-items">
            <Link to="/" className="navbar-links">
              <img
                src="./media/compass.png"
                alt="Explore"
                className="img-items"
              />
              <p className="navbar-text">EXPLORE</p>
            </Link>
          </li>
          <li className="navbar-items">
            <Link to="/captured-pokemons-list" className="navbar-links">
              <img
                src="./media/backpack.png"
                alt="BackPack"
                className="img-items"
              />
              <p className="navbar-text">MY POKEMON LIST</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
