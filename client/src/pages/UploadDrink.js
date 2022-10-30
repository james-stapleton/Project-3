import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom'
import Form from '../components/Form';

const UploadDrink = () => {

    const localName = localStorage.getItem("name")

    return (
        <pre>
        <h1>Upload a Drink</h1>
        <h2>Would you like to share your perfect concoction {localName}?</h2>

        <Form />

        </pre>
    )
}

export default UploadDrink;
