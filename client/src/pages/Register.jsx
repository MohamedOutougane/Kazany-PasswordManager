import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri';
import { registerUser, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

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

    // Initialize navigate and dispatch functions
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Extract properties from auth state using useSelector hook
    const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    // Initialize name criteria message with useState hook
    const [nameCriteria, setNameCriteria] = useState({
        hasMinLength: false
    });

    // Initialize email criteria message with useState hook
    const [emailCriteria, setEmailCriteria] = useState({
        hasLength: false,
        hasAt: false,
        hasDot: false
    });

    // Initialize password criteria message with useState hook
    const [passwordCriteria, setPasswordCriteria] = useState({
        hasLength: false,
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false
    });

    // Initialize password2 criteria message with useState hook
    const [password2Criteria, setPassword2Criteria] = useState({
        hasPasswordCorrespond: false,
        hasMinLength: false
    });

    // disable email input field by default
    let disableEmail = true;
    // disable password input field by default
    let disablePassword = true;
    // disable password2 input field by default
    let disablePassword2 = true;
    // disable submit button by default
    let disableSubmit = true;

    // it changes the state of the form when the user types in the input fields
    const onChange = (e) => {

        // Extract name and value properties from event object using object destructuring
        const { name, value } = e.target;

        // Set state of form data object
        setFormData((prevState) =>({
            ...prevState,   // Spread operator to copy all properties from previous state
            [name]: value // Set value of property to value of input field
        }));

        if (name === 'name') {
            // Check if name has minimum length
            const isMinLength = value.length >= 1;

            // Update name criteria state
            setNameCriteria({
                hasMinLength: isMinLength
            });
        };

        if (name === 'email') {
            // All regexes needed for email
            const regexLength = /^.{5,99}$/;
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Check if email matches all regexes
            const isLengthValid = regexLength.test(value);
            const isEmailValid = regexEmail.test(value);

            // Update password criteria state
            setEmailCriteria({
                hasLength: isLengthValid,
                hasEmail: isEmailValid
            });
        };

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

        if (name === 'password2') {

            // Check if password2 matches password and has minimum length
            const isCorrespond = password === value;
            const isMinLength = value.length >= 1;

            setPassword2Criteria({
                hasPasswordCorrespond: isCorrespond,
                hasMinLength: isMinLength
            });
        };
    };

    // Check if all name criteria are met and enable email input field
    if (nameCriteria.hasMinLength) {
        disableEmail = false;
    };
    // Check if all email criteria are met and enable password input field
    if (disableEmail === false && emailCriteria.hasLength && emailCriteria.hasEmail) {
        disablePassword = false;
    };
    // Check if all password criteria are met and enable password2 input field
    if (disablePassword === false && disableEmail === false && passwordCriteria.hasLength && passwordCriteria.hasLowerCase && passwordCriteria.hasUpperCase && passwordCriteria.hasNumber && passwordCriteria.hasSpecialChar) {
        disablePassword2 = false;
    };
    // Check if all password2 criteria are met and enable submit button
    if ( disablePassword2 === false && disablePassword === false && disableEmail === false && password2Criteria.hasPasswordCorrespond && password2Criteria.hasMinLength) {
        disableSubmit = false;
    };

    // Create onSubmit function
    const onSubmit = (e) => {

        // Prevent default behavior of form submission (page refresh)
        e.preventDefault(); 

        if (password !== password2) {
            toast.error('Les mots de passe ne correspondent pas');
        } else {

            // Create user data object
            const userData = { 
                name, 
                email, 
                password 
            };

            // Dispatch registerUser action
            dispatch(registerUser(userData));
        };
    };

    // i use useEffect hook to display of the messages and redirect to dashboard page
    useEffect(() => {
            
        // If there is an error, display error message
        if (isError) {
            toast.error(message);
        };

        // If user is successfully registered or he is already logged in, display success message and redirect to dashboard page
        if (isSuccess || user) {
            toast.success(message);
            navigate('/dashboard');
        };

        dispatch(reset());
    
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    // Display spinner while loading
    if (isLoading) {
        return <Spinner />
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
                        <input type="text" className="form-control" id="email" name="email" value={email} placeholder="Tapez votre email" onChange={onChange} disabled={disableEmail}/>
                        <div className="criteria" style={{display: disableEmail === false ? 'block' : 'none' }}>
                            <ul>
                                <li style={{display: disablePassword === true ? 'flex' : 'none' }} className='notvalid criter'> <RiCloseCircleFill/>&nbsp;  Veuillez entrez une adresse email valide !</li>
                                <li style={{display: disablePassword === false ? 'flex' : 'none' }} className='valid criter'> <RiCheckboxCircleFill />&nbsp;  Votre adresse email est valide !</li>
                            </ul>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Tapez votre mot de passe" onChange={onChange} disabled={disablePassword} />
                        <div className="criteria" style={{display: disablePassword === false ? 'block' : 'none' }}>
                            <ul>
                                <li className={passwordCriteria.hasLength ? 'valid criter' : 'notvalid criter'}> {passwordCriteria.hasLength ? <RiCheckboxCircleFill /> : <RiCloseCircleFill/>}&nbsp;  Au moins 11 caractères, maximum 99 caractères</li>
                                <li className={passwordCriteria.hasLowerCase ? 'valid criter' : 'notvalid criter'}> {passwordCriteria.hasLowerCase ? <RiCheckboxCircleFill /> : <RiCloseCircleFill/>}&nbsp; Au moins une lettre minuscule</li>
                                <li className={passwordCriteria.hasUpperCase ? 'valid criter' : 'notvalid criter'}> {passwordCriteria.hasUpperCase ? <RiCheckboxCircleFill /> : <RiCloseCircleFill/>}&nbsp; Au moins une lettre majuscule</li>
                                <li className={passwordCriteria.hasNumber ? 'valid criter' : 'notvalid criter'}> {passwordCriteria.hasNumber ? <RiCheckboxCircleFill /> : <RiCloseCircleFill/>}&nbsp; Au moins un chiffre</li>
                                <li className={passwordCriteria.hasSpecialChar ? 'valid criter' : 'notvalid criter'}> {passwordCriteria.hasSpecialChar ? <RiCheckboxCircleFill /> : <RiCloseCircleFill/>}&nbsp; Au moins un caractère spécial</li>
                            </ul>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirmez votre mot de passe" onChange={onChange} disabled={disablePassword2} />
                        <div className="criteria" style={{display: disablePassword2 === false ? 'block' : 'none' }}>
                            <ul>
                                <li style={{display: disableSubmit === true ? 'flex' : 'none' }} className='notvalid criter'> <RiCloseCircleFill/>&nbsp;  Votre mot de passe ne correspond pas !</li>
                                <li style={{display: disableSubmit === false ? 'flex' : 'none' }} className='valid criter'> <RiCheckboxCircleFill />&nbsp;  Votre mot de passe correspond !</li>
                            </ul>
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type="submit" className={disableSubmit ? 'disabled-btn' : 'btn btn-block'} value="Inscription" disabled={disableSubmit}/>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;