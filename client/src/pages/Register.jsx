import React from 'react';
import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';

function Register() {

    // Initialize form data object with useState hook
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // Extract properties from formData object using object destructuring
    const { name, email, password, password2 } = formData;

    // Initialize password criteria message with useState hook
    const [passwordCriteria, setPasswordCriteria] = useState({
        hasLength: false,
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false
    });

    // disable password2 input field by default
    let disablePassword2 = true;

    // it changes the state of the form when the user types in the input fields
    const onChange = (e) => {

        // Extract name and value properties from event object using object destructuring
        const { name, value } = e.target;

        // Set state of form data object
        setFormData((prevState) =>({
            ...prevState,   // Spread operator to copy all properties from previous state
            [name]: value // Set value of property to value of input field
        }));

        if (name === 'password') {
            // All regexes needed for password
            const regexLength = /^.{11,99}$/;
            const regexLowerCase = /^(?=.*[a-z])/;
            const regexUpperCase = /^(?=.*[A-Z])/;
            const regexNumber = /^(?=.*\d)/;
            const regexSpecialChar = /^(?=.*[!@#$%^&*])/;

            // Check if password matches all regexes
            const isLengthValid = regexLength.test(value);
            const isLowerCaseValid = regexLowerCase.test(value);
            const isUpperCaseValid = regexUpperCase.test(value);
            const isNumberValid = regexNumber.test(value);
            const isSpecialCharValid = regexSpecialChar.test(value);

            // Update password criteria state
            setPasswordCriteria({
                hasLength: isLengthValid,
                hasLowerCase: isLowerCaseValid,
                hasUpperCase: isUpperCaseValid,
                hasNumber: isNumberValid,
                hasSpecialChar: isSpecialCharValid
            });
        };
    };

    // Check if all password criteria are met and enable password2 input field
    if (passwordCriteria.hasLength && passwordCriteria.hasLowerCase && passwordCriteria.hasUpperCase && passwordCriteria.hasNumber && passwordCriteria.hasSpecialChar) {
        disablePassword2 = false;
    };

    // Create onSubmit function
    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default behavior of form submission (page refresh)
    };

  return (
    <>
        <section className="heading">
            <h1>
                <FaUser />&nbsp; Inscription
            </h1>
            <p>Veuillez créer un compte</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Tapez votre nom" onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="email" name="email" value={email} placeholder="Tapez votre email" onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Tapez votre mot de passe" onChange={onChange} />
                    <div className="password-criteria">
                        <ul>
                            <li className={passwordCriteria.hasLength ? 'valid password-criter' : 'notvalid password-criter'}> {passwordCriteria.hasLength ? <RiCheckboxCircleFill /> : <RiCloseCircleFill/>}&nbsp;  Au moins 11 caractères, maximum 99 caractères</li>
                            <li className={passwordCriteria.hasLowerCase ? 'valid password-criter' : 'notvalid password-criter'}> {passwordCriteria.hasLowerCase ? <RiCheckboxCircleFill /> : <RiCloseCircleFill/>}&nbsp; Au moins une lettre minuscule</li>
                            <li className={passwordCriteria.hasUpperCase ? 'valid password-criter' : 'notvalid password-criter'}> {passwordCriteria.hasUpperCase ? <RiCheckboxCircleFill /> : <RiCloseCircleFill/>}&nbsp; Au moins une lettre majuscule</li>
                            <li className={passwordCriteria.hasNumber ? 'valid password-criter' : 'notvalid password-criter'}> {passwordCriteria.hasNumber ? <RiCheckboxCircleFill /> : <RiCloseCircleFill/>}&nbsp; Au moins un chiffre</li>
                            <li className={passwordCriteria.hasSpecialChar ? 'valid password-criter' : 'notvalid password-criter'}> {passwordCriteria.hasSpecialChar ? <RiCheckboxCircleFill /> : <RiCloseCircleFill/>}&nbsp; Au moins un caractère spécial</li>
                        </ul>
                    </div>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirmez votre mot de passe" onChange={onChange} disabled={disablePassword2} />
                </div>
                <div className='form-group'>
                    <input type="submit" className="btn btn-block" value="Inscription"/>
                </div>
            </form>
        </section>
    </>
  );
};

export default Register;