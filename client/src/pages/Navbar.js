import React from 'react';
import { Link } from 'react-router-dom'
import "./Navbar.css";
import Auth from '../utils/auth';
import {gql, useQuery} from '@apollo/client'

const logout = (event) => {
  event.preventDefault();
  Auth.logout();
};

const QUERY_NAME = gql`
query UserEmail($email: String!) {
  userEmail(email: $email) {
    name  
  }
}
`

const Navbar = () => {

  let userEmail = localStorage.getItem("email")

  const {loading, data, error} = useQuery(QUERY_NAME, {
    variables : {email: userEmail}
  });
  if (loading) return 'loading...';
  if (error) console.log(error)

   if (data) {
    let username = data.userEmail.name;
       localStorage.setItem("name", username)
   }

   const localName = localStorage.getItem("name")

  
    return (
      
    <nav className="navbar">
      <form id="navbar-form" className="container-fluid justify-content-md-center form-inline">
        <div className="row bg-banner">
          <div className="col image-container">
            <a href="/"><img src="../Images/Logo_Finished.png" alt="Logo" class="logo"/></a>
          </div>
          <div className="col page-buttons">
            <Link reloadDocument to="/MostViewedDrinks" ><button className="blue-button" type="button">Most Viewed Cocktails</button></Link>
            <Link reloadDocument to="/CocktailRankings"><button className="blue-button" type="button">Cocktail Rankings</button></Link>
            <Link reloadDocument to="/SavedDrinks"><button className="blue-button" type="button">Saved Drinks</button></Link>
            <Link to="/UploadDrink"><button className="blue-button" type="button">Upload Drink</button></Link>
          </div>
          <div class="col login-buttons">
          <h5>{localName ? `Welcome ${localName}\u00A0` : ""}</h5>
            {localName === null && <button type="button" class="log-buttons"><Link to="Login">Login</Link></button>}
            {localName != null && <button type="button" class="log-buttons" onClick={logout}><Link to="Login">Logout</Link></button>}
            {localName === null && <button class="log-buttons"><Link to="/Register">Register</Link></button>}
          </div>
        </div>
      </form>
    </nav>
  )
}

export default Navbar;
