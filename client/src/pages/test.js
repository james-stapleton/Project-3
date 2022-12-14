import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from 'react-router-dom'
import DrinkCard from "../components/DrinkCard";
import "./CocktailRankings.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
    <div id="rankings-layout">
      <div id="rankings-card">
        <h1>Top Rated Drinks</h1>
        <Row> 
          {data.cocktails.sort((a, b) => a.avgRating > b.avgRating ? -1 : 1).map((cocktail) =>
          <Col >
            <Link to={`/Recipe/${cocktail.name}`}>
              <DrinkCard cocktail={cocktail} />
              <p>Rating: {cocktail.avgRating}</p>
            </Link>
            </Col>
          )}
          </Row>
        <ul><button></button></ul>
      </div>
    </div>
  )
}

export default CocktailRankings;
