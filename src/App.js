import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as wpUtils from './utils/wordpress-api-utils';

function App() {
  const [endpoints, setEndpoints] = useState(null);

  const getEndpoints = async domainUrl => {
    const data = await wpUtils.wpGetEndpoints(domainUrl);
    setEndpoints(data);
  }

  useEffect(() => {
    getEndpoints('https://wordpress.appgalleria.com');    
    return;
  }, [])

  return (
    <div className="App">
      {JSON.stringify(endpoints, null, 4)}
    </div>
  );
}

export default App;
