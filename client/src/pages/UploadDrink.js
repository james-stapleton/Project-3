import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom'
import Form from '../components/Form';
import "./UploadDrink.css";

const UploadDrink = () => {

    const localName = localStorage.getItem("name")
    if (!localName) {
        return <h4>Please sign in to upload a drink</h4>
    }

    return (
        <div class="container">
            <div id="upload-drink-form">
                <div id="upload-layout">
                    <div id="upload-card">
                        <h1>Upload a Drink</h1>
                        <h5>Would you like to share your perfect concoction, {localName}?</h5>
                        <br></br>
                        <div class="upload-form">
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadDrink;
