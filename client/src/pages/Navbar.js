import React from 'react';
import { Link } from 'react-router-dom'
import "./Navbar.css";


const Navbar = () => {

  const refreshPage = () => window.location.reload();


  return (
    <nav className="navbar">
      <form className="container-fluid justify-content-md-center form-inline">
        <div class="row bg-banner">
          <div class="col image-container">
            <a href="/"><img src="../Images/Logo_Finished.png" width="398" alt="Logo" class="logo" /></a>
          </div>
          <div class="col page-buttons">
            <Link reloadDocument to="/MostViewedDrinks" ><button class="button" type="button">Most Viewed Cocktails</button></Link>
            <Link reloadDocument to="/CocktailRankings"><button className="button" type="button">Cocktail Rankings</button></Link>
            <Link reloadDocument to="/SavedDrinks"><button className="button" type="button">Saved Drinks</button></Link>
            <Link to="/UploadDrink"><button className="button" type="button">Upload Drink</button></Link>
          </div>
          <div class="col login-buttons">
            <Link to="Login"><button type="button">Login</button></Link>
            <Link to="Login"><button type="button">Logout</button></Link>
            <Link to="/Register"><button>Register</button></Link>
          </div>
        </div>
      </form>
    </nav>
  )
}

export default Navbar;
