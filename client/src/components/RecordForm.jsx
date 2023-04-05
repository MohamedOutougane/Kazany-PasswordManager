import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import { getRecords, createRecord, reset } from '../features/records/recordSlice';
import recordService from '../features/records/recordService';

// Composant RecordForm pour la gestion de la création d'un nouvel enregistrement
function RecordForm() {

    // Utilisation du hook useState pour gérer l'état du formulaire
    const [formData, setFormData] = useState({
        name: '',
        connexion: '',
        url: '',
        password: ''
    });

    const { name, connexion, url, password } = formData;

    const dispatch = useDispatch();

    // Sélection des états à partir du store Redux
    const { record, isError, isSuccess, message } = useSelector((state) => state.records);

    // Eléments pour afficher ou masquer le mot de passe
    const Eye = <RiEyeFill />;
    const EyeSlash = <RiEyeCloseFill />;
    // État pour masquer ou afficher le mot de passe
    const [hidePassword, setHidePassword] = useState(true);
    const showHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    // Gérer les changements de valeur dans les champs du formulaire
    const onChange = (e) => {

        // Extraire les propriétés name et value de l'objet event en utilisant la déstructuration d'objet
        const { name, value } = e.target;

        // Définir l'état de l'objet formData
        setFormData((prevState) => ({
            ...prevState,   // Opérateur de décomposition pour copier toutes les propriétés de l'état précédent
            [name]: value // Définir la valeur de la propriété à la valeur du champ de saisie
        }));
    };

    // Gérer la soumission du formulaire
    const onSubmit = e => {
        e.preventDefault();

        // Créer un objet de données d'enregistrement
        const recordData = {
            name,
            connexion,
            url,
            password
        };

        // Dispatch l'action createRecord
        dispatch(createRecord(recordData));
        dispatch(getRecords());

        // Réinitialiser le formulaire
        setFormData({
            name: '',
            connexion: '',
            url: '',
            password: ''
        });
    }

    // Utiliser le hook useEffect pour afficher les messages
    useEffect(() => {

        // S'il y a une erreur, afficher le message d'erreur
        if (isError) {
            toast.error(message);
        };

        // Si l'enregistrement est créé avec succès, afficher le message de succès
        if (isSuccess || record) {
            toast.success(message.message);
        };

        // Réinitialiser l'état de l'enregistrement
        dispatch(reset());

    }, [record, isError, isSuccess, message, dispatch]);

    // État pour afficher ou masquer le formulaire
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => {
        setShowForm((prevShowForm) => !prevShowForm);
    };

    return (
        <>
            <button className='btn btn-block' onClick={toggleForm}>
                {showForm ? 'Hide Form' : 'Click here to add a new record'}
            </button>
            {showForm && (
                <section className='form'>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="text">Nom de l'enregistrement</label>
                            <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Twitter" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">Url de l'application</label>
                            <input type="text" className="form-control" id="url" name="url" value={url} placeholder="https://www.twitter.com" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">Identifiant de connexion</label>
                            <input type="text" className="form-control" id="connexion" name="connexion" value={connexion} placeholder="@KazanyTwitter" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">Mot de passe</label>
                            <div className="password-input">
                                <input type={hidePassword ? "password" : "text"} className="form-control" id="password" name="password" value={password} placeholder="m0t/*d3-|p@55€%~SeCUri5é" onChange={onChange} />
                                <a onClick={showHidePassword}><i style={{ display: hidePassword === true ? 'flex' : 'none' }}>{Eye}</i></a>
                                <a onClick={showHidePassword}><i style={{ display: hidePassword === false ? 'flex' : 'none' }}>{EyeSlash}</i></a>
                            </div>
                        </div>
                        <div className='form-group'>
                            <input type="submit" className='btn btn-block' value="Enregistrer" />
                        </div>
                    </form>
                </section>
            )}
        </>
    )
};

export default RecordForm;