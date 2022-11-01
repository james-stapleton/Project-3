import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom'
import Form from '../components/Form';
import "./UploadDrink.css";

const UploadDrink = () => {

    const localName = localStorage.getItem("name")
    if (!localName) {
        return `Please sign in to upload a drink`
    }

    return (
        <div class="container">
            <div id="upload-drink-form">
                <h1>Upload a Drink</h1>
                <br></br>
                <h4>Would you like to share your perfect concoction {localName}?</h4>
                <br></br>
                <div class="upload-form">
                    <Form />
                </div>
            </div>
        </div>
    )
}

export default UploadDrink;
