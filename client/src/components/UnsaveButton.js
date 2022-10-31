import React from "react";
import { useMutation, gql } from "@apollo/client";

export default function SaveButton(props) {

    const UNSAVE_MUTATION = gql`mutation UnSaveCocktailName($email: String!, $name: String!) {
        unSaveCocktailName(email: $email, name: $name) {
          name  
        }
      }`

      const [unsave, {data, loading, error}] = useMutation(UNSAVE_MUTATION);

      function handleUnsave() {
        let email = localStorage.getItem("email");
        console.log(email);
        let cocktail = props.name;
        console.log(cocktail);
        unsave({variables: {email: email,name: cocktail}})
      }

    return (
        <pre>
            <button class="blue-button" onClick={handleUnsave}> Unsave this Drink </button>
        </pre>
    )
}