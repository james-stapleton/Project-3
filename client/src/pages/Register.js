import React from 'react';
import { Link } from 'react-router-dom'
import { createUser } from '../utils/mutations';
import {gql, useMutation} from '@apollo/client'

const CREATE_USER_MUTATION = gql`mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
      user {
        name
        email  
      }
    }
  }`

const Register = () => {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
      });
    
      function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            [name]: value,
          };
        });
      }
    
      const [upload] = useMutation(CREATE_USER_MUTATION)
        
      async function handleSubmit(event) {
        event.preventDefault();
        let newUser = formData;
        console.log(newUser);
        await upload({variables: formData})
      }
      return (
        <pre>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              onChange={handleChange}
              name="name"
            />
            <input
              type="text"
              placeholder="Email"
              onChange={handleChange}
              name="email"
            />
            <input
              type="text"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
            <button>Submit</button>
          </form>
        </pre>
      );
}

export default Register;