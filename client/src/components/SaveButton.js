import React from "react";
import { useMutation, gql } from "@apollo/client";

export default function SaveButton(props) {

    const SAVE_MUTATION = gql`mutation SaveCocktail ($email: String, $cocktails: CocktailInput) {
        saveCocktail (email: $email, cocktails: $cocktails){
          name
        }
      }`

      const [save, {data, loading, error}] = useMutation(SAVE_MUTATION);

      function handleSave() {
        let email = localStorage.getItem("email");
        console.log(email);
        let cocktail = props.name;
        console.log(cocktail);
        save({variables: {email: email, cocktails: {
            name: cocktail
        }}})
      }

    return (
        <pre>
            <button class="blue-button" onClick={handleSave}> Save this Drink </button>
        </pre>
    )
}