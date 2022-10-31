import React from 'react';
import { Link } from 'react-router-dom'
import "./Navbar.css";
import Auth from '../utils/auth';

const logout = (event) => {
  event.preventDefault();
  Auth.logout();
};

const Navbar = () => {

    const refreshPage = () => window.location.reload(); 
    const localName = localStorage.getItem("name")
  

    return (
      
    <nav className="navbar">
      <form className="container-fluid justify-content-md-center form-inline">
        <div class="row bg-banner">
          <div class="col image-container">
            <a href="/"><img src="../Images/Logo_Finished.png" width="398" alt="Logo" class="logo"/></a>
          </div>
          <div class="col page-buttons">
            <Link reloadDocument to="/MostViewedDrinks" ><button class="blue-button" type="button">Most Viewed Cocktails</button></Link>
            <Link reloadDocument to="/CocktailRankings"><button class="blue-button" type="button">Cocktail Rankings</button></Link>
            <Link reloadDocument to="/SavedDrinks"><button class="blue-button" type="button">Saved Drinks</button></Link>
            <Link to="/UploadDrink"><button class="blue-button" type="button">Upload Drink</button></Link>
          </div>
          <div class="col login-buttons">
            <button type="button" class="log-buttons"><Link to="Login">Login</Link></button>
            <button type="button" class="log-buttons" onClick={logout}><Link to="Login">Logout</Link></button>
            <button class="log-buttons"><Link to="/Register">Register</Link></button>
          </div>
        </div>
      </form>
    </nav>
  )
}

export default Navbar;
