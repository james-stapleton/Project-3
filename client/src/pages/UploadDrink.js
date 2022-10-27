import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom'
import Form from '../components/Form';

const UploadDrink = () => {
    return (
        <pre>
        <h1>Upload a Drink</h1>

        <Form />

        </pre>
    )
}

export default UploadDrink;
