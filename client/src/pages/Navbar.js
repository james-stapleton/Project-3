import React from 'react';
import { Link } from 'react-router-dom'
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
    <form className="form-inline">
      <Link to = "/MostViewedDrinks" ><button className="btn btn-outline-success" type="button">Most Viewed Cocktails</button></Link>
      <Link to ="/CocktailRankings"><button className="btn btn-outline-success" type="button">Cocktail Rankings</button></Link>
      <Link to = "/SavedDrinks"><button className="btn btn-outline-success" type="button">Saved Drinks</button></Link>
      <Link to="/"><h1 className="text-white">Cocktail Curator</h1></Link>
      <Link to="/UploadDrink"><button className="btn btn-outline-success" type="button">Upload Drink</button></Link>
      <Link to="Login"><button className="btn btn-outline-success" type="button">Login</button></Link>
      <button className="btn btn-lg btn-light m-2" onClick={logout}> Logout </button>
      <Link to ="/Register"><button>Register</button></Link>
    </form>

    <h1>signed in as {localName}</h1>

  </nav> 
  )
}

export default Navbar;
