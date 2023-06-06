import React from "react";
import logo from "../../image/logo1.png";
import "../../css/header/nav.css";

const nav = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} id="logo" alt="Logo" width="75" height="75" className="d-inline-block align-text-top" />
        </a>
        <h1>The Rick and Morty</h1>
      </div>
    </nav>
  )
}

export default nav;