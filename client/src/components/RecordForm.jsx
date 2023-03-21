import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';
import { createRecord, reset } from '../features/records/recordSlice';
import recordService from '../features/records/recordService';

function RecordForm() {

    const [formData, setFormData] = useState({
        name: '',
        connexion: '',
        url: '',
        password: ''
    });

    const { name, connexion, url, password } = formData;

    const dispatch = useDispatch();

    const { record, isLoading, isError, isSuccess, message } = useSelector((state) => state.records);

    // password show/hide elements
    const Eye = <RiEyeFill />;
    const EyeSlash = <RiEyeCloseFill />;
    // this is the eye for the password input
    const [hidePassword, setHidePassword] = useState(true);
    const showHidePassword = () => {
        setHidePassword(!hidePassword);
    };

    const onChange = (e) => {

        // Extract name and value properties from event object using object destructuring
        const { name, value } = e.target;

        // Set state of form data object
        setFormData((prevState) => ({
            ...prevState,   // Spread operator to copy all properties from previous state
            [name]: value // Set value of property to value of input field
        }));
    };

    const onSubmit = e => {
        e.preventDefault();

        // Create user data object
        const recordData = {
            name,
            connexion,
            url,
            password
        };

        // Dispatch createRecord action
        dispatch(createRecord(recordData));

        // Reset the form
        // Reset the form
        setFormData({
            name: '',
            connexion: '',
            url: '',
            password: ''
        });
    }

    // i use useEffect hook to display of the messages 
    useEffect(() => {

        // If there is an error, display error message
        if (isError) {
            toast.error(message);
        };

        // If record is successfully created, display success message 
        if (isSuccess || record) {
            toast.success(message.message);
        };

        dispatch(reset());

    }, [record, isError, isSuccess, message, dispatch]);

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