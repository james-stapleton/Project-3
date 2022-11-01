import React from "react";
import "./DrinkCard.css";

export default function DrinkCard({brand, state, cocktail, rated}) {

    if (!cocktail ) {
        return (
            <p>Please enter valid drink</p>
        )
    }
    const { name, ingredients, instructions, views, avgRating, image } = cocktail;
    const style = {
        transition: "0.3s",
        backgroundColor: "#D7B877",
        color: "#FFFFFF",
        margins: "10px",
        border: "0px",
    }

    console.log("rated", rated)

    return (
        <div key = {state} id="recipe-card-data" className="card">
            <div className="container">
            <p>{state}</p>
                <h1>{name}</h1>
                <div className="row">
                    <div id="drink-info-container" className="col">
                        {/* <text>Ingredints:</text> */}
                        {ingredients && <p>{ingredients}</p>}
                        {/* Instructions: */}
                        {instructions && <p>{instructions}</p>}
                        {views && <p>Views: {views}</p>}
                        {avgRating && <p>Rating: {avgRating}</p>}
                        {rated && <p>You rated this drink {rated}</p>}
                    </div>
                    <div id="drink-image-container" className="col">
                        <img id="drink-image" src={`../Images/${image}`} />
                    </div>
                </div>
            </div>
            {brand && <p>Brand: {brand} </p>}
        </div>
    )
}