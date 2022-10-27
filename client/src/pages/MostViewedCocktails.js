import React from "react";
import { useQuery, gql } from "@apollo/client";
import {Link} from 'react-router-dom'

const VIEW_QUERY = gql`
  {
    cocktails {
        name
        views
    }
  }
`;

const MostViewedCocktails = (props) => {

  console.log("componenet mostviewedCocktails rendered");

    const {data, loading, error} = useQuery(VIEW_QUERY);


    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>

    return (
        <pre>
        <h1>Most Viewed Drinks</h1>
        <ul>
            {data.cocktails.map((cocktail) =>
            <Link to = {`/Recipe/${cocktail.name}`}>
            <li  id={cocktail.name} key = {cocktail._id}>{cocktail.name} {cocktail.views}</li>
            </Link>
            )}
        </ul>
        </pre>
    )
}

export default MostViewedCocktails;
