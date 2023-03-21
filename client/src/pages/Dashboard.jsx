import React from 'react';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecordForm from '../components/RecordForm';

function Dashboard() {

  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  })

  return (
    <>
      <section className="heading">
        <h1>Bienvenue {user && user.name}</h1>
        <p>Gestionnaire de mots de passe</p>
      </section>

      <RecordForm />
    </>
  );
}

// export default withAuth(Dashboard);
export default Dashboard;