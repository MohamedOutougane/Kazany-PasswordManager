import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

    // this hook allows me to redirect the user to another page
    const { user } = useSelector((state) => state.auth);

    // i trigger the logout action and reset the auth state
    const onLogout = () => {

        // i want to redirect the user to the login page
        window.location.replace('/login');

        // i want to delete the token from the local storage
        localStorage.removeItem('user');
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