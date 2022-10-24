import React from 'react';


const Navbar = () => {
    return (
    <nav className="navbar">
    <form className="form-inline">
      <a href="/viewed"><button className="btn btn-outline-success" type="button">Most Viewed Cocktails</button></a>
      <a href="/ratings"><button className="btn btn-outline-success" type="button">Cocktail Rankings</button></a>
      <a href="/saved"><button className="btn btn-outline-success" type="button">Saved Drinks</button></a>
      <a href="/"><h1 className="text-white">Cocktail Curator</h1></a>
      <a href="/upload-drink.html"><button className="btn btn-outline-success" type="button">Upload Drink</button></a>
      <a href="./login.html"><button className="btn btn-outline-success" type="button">Login</button></a>
      <a href="./logout.html"><button className="btn btn-outline-success" type="button">Logout</button></a>
    </form>
  </nav> 
  )
}

export default Navbar;
