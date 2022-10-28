import React from 'react';
import { Link } from 'react-router-dom'
import "./Navbar.css";


const Navbar = () => {

    const refreshPage = () => window.location.reload(); 
    const localName = localStorage.getItem("name")
  

    return (
      
    <nav className="navbar">
      <form className="container form-inline">
        <div class="row bg-banner" width="100%">
          <div class="col image-container">
            <a href="/"><img src="../images/Logo_Finished.png" width="398" alt="Logo" class="logo" /></a>
          </div>
          <div class="col login-buttons">
            <Link to="Login"><button type="button">Login</button></Link>
            <Link to="Login"><button type="button">Logout</button></Link>
            <Link to="/Register"><button>Register</button></Link>
          </div>
          <div class="col">
            <Link to="/MostViewedDrinks" ><button className="btn btn-outline-success" type="button">Most Viewed Cocktails</button></Link>
            <Link to="/CocktailRankings"><button className="btn btn-outline-success" type="button">Cocktail Rankings</button></Link>
            <Link to="/SavedDrinks"><button className="btn btn-outline-success" type="button">Saved Drinks</button></Link>
            <Link to="/UploadDrink"><button className="btn btn-outline-success" type="button">Upload Drink</button></Link>
          </div>
        </div>
      </form>
    </nav>
  )
}

export default Navbar;
