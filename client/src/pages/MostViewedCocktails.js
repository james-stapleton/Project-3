import React from "react";
import { useQuery, gql } from "@apollo/client";
import {Link, useLocation} from 'react-router-dom'
import DrinkCard from "../components/DrinkCard";
import "./MostViewedCocktails.css";

const VIEW_QUERY = gql`
  {
    cocktails {
        name
        image
    }
  }
`;



const MostViewedCocktails = (props) => {


  console.log("componenet mostviewedCocktails rendered");

    const {data, loading, error} = useQuery(VIEW_QUERY);
    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>

    return (
      <div id="most-viewed-layout">
        <div id="most-viewed-card">
        <h1>Most Viewed Drinks</h1>
        <ul>
            {data.cocktails.map((cocktail) =>
            <Link to = {`/Recipe/${cocktail.name}`}>
              <DrinkCard cocktail={cocktail}/>
            </Link>
            )}
        </ul>
        <ul><button></button></ul>
        </div>
        </div>
    )
}

export default MostViewedCocktails;
