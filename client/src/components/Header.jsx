import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, reset } from '../features/auth/authSlice';

function Header() {

    // this hook allows me to redirect the user to another page
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    // declare variables 
    let idUser;

    // i trigger the logout action and reset the auth state
    const onLogout = () => {

        // i want to redirect the user to the login page
        window.location.replace('/login');

        // i want to take the token from the local storage
        const token = localStorage.getItem('user');

        // i want to parse the token to get the id of the user
        const tokenObject = JSON.parse(token);

        // i want to take the id of the user from the token
        idUser = tokenObject._id;

        // i want to remove the token from the local storage
        dispatch(logoutUser(idUser));
        dispatch(reset());
    };


  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Kazany - Password Manager</Link>
        </div>
        <ul>
            {user ? (
                <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt /> Déconnexion
                    </button>
                </li>
            ) : (
            <> <li>
                <Link to='/login'>
                    <FaSignInAlt /> Connexion
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser /> Inscription
                </Link>
            </li> </>
            )}
        </ul>
    </header>
  );
};

export default Header;