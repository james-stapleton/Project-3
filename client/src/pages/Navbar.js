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
    const [localName, setLocalName] = React.useState(localStorage.getItem("name"));
    React.useEffect(() => {
    setLocalName(localStorage.getItem("name"))
    },[])
  
    return (
      
    <nav className="navbar">
      <form className="container-fluid justify-content-md-center form-inline">
        <div className="row bg-banner">
          <div className="col image-container">
            <a href="/"><img src="../Images/Logo_Finished.png" width="398" alt="Logo" className="logo"/></a>
          </div>
          <div className="col page-buttons">
            <Link reloadDocument to="/MostViewedDrinks" ><button className="blue-button" type="button">Most Viewed Cocktails</button></Link>
            <Link reloadDocument to="/CocktailRankings"><button className="blue-button" type="button">Cocktail Rankings</button></Link>
            <Link reloadDocument to="/SavedDrinks"><button className="blue-button" type="button">Saved Drinks</button></Link>
            <Link to="/UploadDrink"><button className="blue-button" type="button">Upload Drink</button></Link>
          </div>
          <div className="col login-buttons">
            {localName === null && <button type="button" id="login" className="log-buttons"><Link to="Login">Login</Link></button>}
            {localName != null && <button type="button" className="log-buttons" onClick={logout}><Link to="Login">Logout</Link></button>}
            {localName === null && <button className="log-buttons"><Link to="/Register">Register</Link></button>}
          </div>
        </div>
      </form>
    </nav>
  )
}

export default Navbar;
