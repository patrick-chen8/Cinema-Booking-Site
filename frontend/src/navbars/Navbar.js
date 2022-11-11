import React from 'react';
import ReactDOM from "react-dom";
import App from "../App";
import { BrowserRouter, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
    <header>
        <img class="logo" src={require("../images/logo.png")} alt="logo"></img>
        <NavLink class="siteName" href="./home">C7 Cinemas</NavLink>
        <div class="searchLineHome">
           <input class="searchBar" type="search" placeholder="Enter a Movie Title"></input>
            <button class="searchButton">Search</button>
            </div>
        <nav>
            <ul class="nav_links">
                <li><NavLink to="./browse">Browse</NavLink></li>
                <li><NavLink to="./search">Search</NavLink></li>
                <li><NavLink to="./login">Login</NavLink></li>
            </ul>
        </nav>
      </header>
    )
}