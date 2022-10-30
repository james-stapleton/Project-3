import React from "react";
import { useQuery, gql } from "@apollo/client";
import {Link} from 'react-router-dom'
import DrinkCard from "../components/DrinkCard";

const RATING_QUERY = gql`
  {
    cocktails {
        name
        avgRating
    }
  }
`;

const CocktailRankings = (props) => {

    const {data, loading, error} = useQuery(RATING_QUERY, {fetchPolicy: "network-only"});

    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>

    // console.log(data.cocktails.sort(({avgRating}) =>  ));

    // dataArray = data.cocktails.sort();

    return (
        <pre>
        <h1>Top Rated Drinks</h1>
        <ul>
            {data.cocktails.sort((a, b) => a.avgRating > b.avgRating ? -1 : 1).map((cocktail) =>
            <Link to = {`/Recipe/${cocktail.name}`}>
            <DrinkCard cocktail={cocktail} />
            </Link>
            )}
        </ul>
        </pre>
    )
}

export default CocktailRankings;
