import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiPencilLine, RiDeleteBinLine, RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';

// Composant RecordList pour afficher la liste des enregistrements
function RecordList() {
    // Utiliser useDispatch pour récupérer la fonction dispatch à partir du store Redux
    const dispatch = useDispatch();

    // Utiliser useSelector pour récupérer l'état des enregistrements à partir du store Redux
    const { records } = useSelector((state) => state.records);
    const recordsList = records.records;

    // Fonctions pour gérer les boutons de modification, suppression et affichage/masquage du mot de passe
    const handleEdit = (record) => {
        // implémenter la logique d'édition ici
    };

    const handleDelete = (record) => {
        // implémenter la logique de suppression ici
    };

    const [visiblePasswordId, setVisiblePasswordId] = useState(null);
    const togglePasswordVisibility = (recordId) => {
        setVisiblePasswordId(visiblePasswordId === recordId ? null : recordId);
    };

    return (
        <div className="record-list-container">
            <div className="record-list-header">
                <h3 className="record-list-col-name">Nom</h3>
                <h3 className="record-list-col-connexion">Identifiant</h3>
                <h3 className="record-list-col-url">URL</h3>
                <h3 className="record-list-col-password">Mot de passe</h3>
                <h3 className="record-list-col-actions">Actions</h3>
            </div>
            <ul className="record-list">
                {Array.isArray(recordsList) &&
                    recordsList.map((record) => (
                        <li key={record._id} className="record-list-item">
                            <div className="record-item-header">
                                <h2>{record.name}</h2>

                            </div>
                            <p>Identifiant de connexion : {record.connexion}</p>
                            <p>URL : {record.url}</p>
                            <div className="password-section">
                                <p>
                                    Mot de passe :{' '}
                                    {visiblePasswordId === record._id ? record.password : '********'}
                                </p>
                                <button
                                    onClick={() => togglePasswordVisibility(record._id)}
                                    className="icon-btn"
                                >
                                    {visiblePasswordId === record._id ? (
                                        <RiEyeCloseFill />
                                    ) : (
                                        <RiEyeFill />
                                    )}
                                </button>
                            </div>
                            <div className="edit-delete-section">
                                <button onClick={() => handleEdit(record)} className="icon-btn">
                                    <RiPencilLine />
                                </button>
                                <button onClick={() => handleDelete(record)} className="icon-btn">
                                    <RiDeleteBinLine />
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default RecordList;