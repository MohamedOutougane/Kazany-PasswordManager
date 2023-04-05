import React from 'react';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RecordForm from '../components/RecordForm';
import RecordList from '../components/RecordList';
import { getRecords } from '../features/records/recordSlice';

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {records} = useSelector((state) => state.records)

  // si l'utilisateur n'est pas connecté, rediriger vers la page de connexion sinono récupérer les enregistrements
  useEffect(() => {
    if(!user) {
      navigate('/login')
    } else {
      dispatch(getRecords());
    }
  }, [user, navigate, dispatch])

  return (
    <>
      <section className="heading">
        <h1>Bienvenue {user && user.name}</h1>
        <p>Gestionnaire de mots de passe</p>
      </section>

      <RecordForm />

      <RecordList records={records} />
    </>
  );
}

// export default withAuth(Dashboard);
export default Dashboard;