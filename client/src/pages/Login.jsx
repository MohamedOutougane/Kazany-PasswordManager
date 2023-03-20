import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import { FaSignInAlt } from 'react-icons/fa';
import { loginUser, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {

    // Initialize form data object with useState hook
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Extract properties from formData object using object destructuring
    const { email, password } = formData;

    // Initialize navigate and dispatch functions
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Extract properties from auth state using useSelector hook
    const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    // password show/hide elements
    const Eye = <RiEyeFill/>;
    const EyeSlash = <RiEyeCloseFill/>;
    // this is the eye for the password input
    const [hidePassword, setHidePassword] = useState(true);
    const showHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    // it changes the state of the form when the user types in the input fields
    const onChange = (e) => {
        
        setFormData((prevState) =>({
            ...prevState,   // Spread operator to copy all properties from previous state
            [e.target.name]: e.target.value // Set value of property to value of input field
        }));
    };

    // Create onSubmit function
    const onSubmit = (e) => {

        // Prevent default behavior of form submission (page refresh)
        e.preventDefault(); 

         // Create user data object
        const userData = {
            email, 
            password 
        };

        // Dispatch loginUser action
        dispatch(loginUser(userData));
    };

    // i use useEffect hook to display of the messages and redirect to dashboard page
    useEffect(() => {
            
        // If there is an error, display error message
        if (isError) {
            toast.error(message);
        };

        // If user is successfully logged-in or he is already logged in, display success message and redirect to dashboard page
        if (isSuccess || user) {
            toast.success(message.message);
            navigate('/dashboard');
        };

        dispatch(reset());
    
    }, [user, isError, isSuccess, message, navigate, dispatch]);

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
                    <div className="password-input">
                        <input type={hidePassword ? "password" : "text" } className="form-control" id="password" name="password" value={password} placeholder="Tapez votre mot de passe" onChange={onChange} />
                        <a onClick={showHidePassword}><i  style={{display: hidePassword === true ? 'flex' : 'none' }}>{Eye}</i></a>
                        <a onClick={showHidePassword}><i  style={{display: hidePassword === false ? 'flex' : 'none' }}>{EyeSlash}</i></a>
                    </div>
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