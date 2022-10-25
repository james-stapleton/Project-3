import React from 'react';


const Navbar = () => {
    return (
    <nav className="navbar">
    <form className="form-inline">
      <a href="/MostViewedDrinks"><button className="btn btn-outline-success" type="button">Most Viewed Cocktails</button></a>
      <a href="/CocktailRankings"><button className="btn btn-outline-success" type="button">Cocktail Rankings</button></a>
      <a href="/SavedDrinks"><button className="btn btn-outline-success" type="button">Saved Drinks</button></a>
      <a href="/"><h1 className="text-white">Cocktail Curator</h1></a>
      <a href="/UploadDrink"><button className="btn btn-outline-success" type="button">Upload Drink</button></a>
      <a href="Login"><button className="btn btn-outline-success" type="button">Login</button></a>
      <a href="Login"><button className="btn btn-outline-success" type="button">Logout</button></a>
    </form>
  </nav> 
  )
}

export default Navbar;
