import React from "react";

const AppContext = React.createContext({
    domainUrl: '',
    token: '',
    displayName: '',
    email: '',
    niceName: '',


    setDomainUrl: () => {},
    setToken: () => {},
    setDisplayName: () => {},
    setEmail: () => {},
    setNiceName: () => {}
});

export default AppContext;