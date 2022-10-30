import React from "react";
import "./DrinkCard.css";

export default function DrinkCard({ cocktail, rating }) {

    const { name, ingredients, instructions, views, avgRating, image } = cocktail;
    const style = {
        transition: "0.3s",
        backgroundColor: "#D7B877",
        color: "#FFFFFF",
        margins: "10px",
        border: "0px",
    }

    return (
        <div id="recipe-card-data" className="card">
            <div class="container">
                <h1>{name}</h1>
                <div class="row">
                    <div id="drink-info-container" class="col">
                        {/* <text>Ingredints:</text> */}
                        {ingredients && <p>{ingredients}</p>}
                        {/* Instructions: */}
                        {instructions && <p>{instructions}</p>}
                        {views && <p>Views: {views}</p>}
                        {avgRating && <p>Rating: {avgRating}</p>}
                        {rating && <p>You rated this drink {rating}</p>}
                    </div>
                    <div id="drink-image-container" class="col">
                        <img id="drink-image" src={`../Images/${image}`} />
                    </div>
                </div>
            </div>
        </div>
    )
}