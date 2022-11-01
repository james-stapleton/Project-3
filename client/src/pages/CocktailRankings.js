import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from 'react-router-dom'
import DrinkCard from "../components/DrinkCard";
import "./CocktailRankings.css";

const RATING_QUERY = gql`
  {
    cocktails {
        name
        avgRating
        image
    }
  }
`;

const CocktailRankings = (props) => {

  const { data, loading, error } = useQuery(RATING_QUERY, { fetchPolicy: "network-only" });

  if (loading) return 'Loading...';
  if (error) return <pre>{error.message}</pre>

  console.log(data);


  return (
    <div>
      <h1>Top Rated Drinks</h1>
      <div id="rankings-layout">
        <div id="rankings-card">
          {data.cocktails.sort((a, b) => a.avgRating > b.avgRating ? -1 : 1).map((cocktail) =>
            <Link to={`/Recipe/${cocktail.name}`}>
              <p id="rankings">Rating: {cocktail.avgRating}</p>
              <DrinkCard cocktail={cocktail} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default CocktailRankings;
