import React from "react";
import "./DrinkCard.css";

export default function DrinkCard({ cocktail, rating }) {

    const { name, ingredients, instructions, views, avgRating, image } = cocktail;
    // const style = {
    //     transition: "0.3s",
    //     backgroundColor: "#D7B877",
    //     color: "#876827",
    //     margins: "10px",
    //     border: "0px",
    //     borderRadius: "10px",
    // }

    return (
        <div id="recipe-card-data" className="card">
            <div class="container">
                <h1>{name}</h1>
                <div class="row">
                    <div class="col">
                        {ingredients && <p>{ingredients}</p>}
                        {instructions && <p>{instructions}</p>}
                        {views && <p>Views: {views}</p>}
                        {avgRating && <p>Rating: {avgRating}</p>}
                        {rating && <p>You rated this drink {rating}</p>}
                    </div>
                    <div class="col">
                        <img src={image} width="33%"/>
                    </div>
                </div>
            </div>
        </div>
    )
}