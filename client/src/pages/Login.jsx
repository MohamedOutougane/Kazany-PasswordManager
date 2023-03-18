import React from 'react';
import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {

    // Initialize form data object with useState hook
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Extract properties from formData object using object destructuring
    const { email, password, } = formData;

    // it changes the state of the form when the user types in the input fields
    const onChange = (e) => {
        setFormData((prevState) =>({
            ...prevState,   // Spread operator to copy all properties from previous state
            [e.target.name]: e.target.value // Set value of property to value of input field
        }));
    };

    // Create onSubmit function
    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default behavior of form submission (page refresh)
    };

  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt />&nbsp; Connexion
            </h1>
            <p>Connectez-vous pour gerer vos mots de passe</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="email" name="email" value={email} placeholder="Tapez votre email" onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Tapez votre mot de passe" onChange={onChange} />
                </div>
                <div className='form-group'>
                    <input type="submit" className="btn btn-block" value="Connexion"/>
                </div>
            </form>
        </section>
    </>
  );
};

export default Login;