import './WpAuthentication.scss';
import React, { useContext, useState } from 'react';
import AppContext from '../data/AppContext';
import * as wpUtils from '../utils/wordpress-api-utils';

const WpAuthentication = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [testDomainUrl, setTestDomainUrl] = useState('');

    const appCtx = useContext(AppContext);
    const { domain, setDomainUrl, setToken, setDisplayName, setEmail, setNiceName } = appCtx;

    const updateTestDomainUrl = e => {
        const { value } = e.target;
        setTestDomainUrl(value);
    }
    
    const updateUsername = e => {
        const { value } = e.target;
        setUsername(value);
    }
    
    const updatePassword = e => {
        const { value } = e.target;
        setPassword(value);
    }

    const handleSubmit = async () => {
        console.log('handleSubmit');
        
        wpUtils.wpJwtAuthentication(testDomainUrl, username, password)
        .then(data => {
            const { token, user_display_name: displayName, user_emai: email, user_nice_name: niceName } = data;
            console.log('data', data, token, displayName, email, niceName);
            
            setDomainUrl(testDomainUrl);
            setToken(token);
            setDisplayName(displayName);
            setEmail(email);
            setNiceName(niceName);
            
            // const newPost = {
            //     title: "Test Title",
            //     content: "Test Content",
            //     status: "publish"
            // }

            // wpUtils.wpCreatePost(testDomainUrl, newPost, token)
            // .then(result => console.log(result))
            // .catch(error => console.log(error));

            // REST API
        })
        .catch(error => {
            console.log(error, error.message);
            switch(error.response.status) {
                case 403:
                    alert('invalid credentials');
                    break;
                case 404:
                    alert('invalid domainUrl');
                default:
                    error.response ?
                    alert(error.response.statusText) :
                    alert(error.message);
            }
        });
    }

    return (
        <div className="wp-authentication">
            <div className="wp-authentication__modal-container">
                <div className="wp-authentication__modal-content">
                    <label className="wp-authentication__label">
                        Domain URL
                        <input 
                            className="wp-authentication__input"
                            onChange={updateTestDomainUrl}
                            value={testDomainUrl} />
                    </label>
                    <label className="wp-authentication__label">
                        User Name
                        <input 
                            className="wp-authentication__input"
                            onChange={updateUsername}
                            value={username} />
                    </label>
                    <label className="wp-authentication__label">
                        Password
                        <input 
                            className="wp-authentication__input"
                            onChange={updatePassword}
                            value={password}
                            type='password' />
                    </label>
                    <button 
                        className="wp-authentication__submit"
                        onClick={handleSubmit}
                        >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WpAuthentication;