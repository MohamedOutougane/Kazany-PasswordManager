import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Kazany - Password Manager</Link>
        </div>
        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt /> Connexion
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser /> Inscription
                </Link>
            </li>
        </ul>
    </header>
  );
};

export default Header;