import React, { useState } from "react";
import AppContext from "./AppContext";

const AppContextProvider = props => { 
    const [domainUrl, setDomainUrl] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [niceName, setNiceName] = useState('');
    const [token, setToken] = useState('');

    return (
        <AppContext.Provider 
            value = {{
                domainUrl,
                displayName,
                email,
                niceName,
                token,

                setDomainUrl,
                setDisplayName,
                setEmail,
                setNiceName,
                setToken
            }}>
            {props.children}
        </AppContext.Provider>
    )   

};

export default AppContextProvider;