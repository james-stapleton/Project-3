import React from 'react';
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';


const QUERY_NAME = gql`
query UserEmail($email: String!) {
  userEmail(email: $email) {
    name  
  }
}
`

const Navbar = () => {

    const refreshPage = () => window.location.reload(); 
    const { loading, data } = useQuery(QUERY_NAME);
    const name = data?.name || [];

    

    return (
    <nav className="navbar">
    <form className="form-inline">
      <Link to = "/MostViewedDrinks" ><button className="btn btn-outline-success" type="button">Most Viewed Cocktails</button></Link>
      <Link to ="/CocktailRankings"><button className="btn btn-outline-success" type="button">Cocktail Rankings</button></Link>
      <Link to = "/SavedDrinks"><button className="btn btn-outline-success" type="button">Saved Drinks</button></Link>
      <Link to="/"><h1 className="text-white">Cocktail Curator</h1></Link>
      <Link to="/UploadDrink"><button className="btn btn-outline-success" type="button">Upload Drink</button></Link>
      <Link to="Login"><button className="btn btn-outline-success" type="button">Login</button></Link>
      <Link to="Login"><button className="btn btn-outline-success" type="button">Logout</button></Link>
      <Link to ="/Register"><button>Register</button></Link>
    </form>
    <p>Welcome {name}</p>
  </nav> 
  )
}

export default Navbar;
