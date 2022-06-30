import { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as wpUtils from './utils/wordpress-api-utils';
import AppContext from './data/AppContext';
import WpAuthentication from './components/WpAuthentication';

function App() {
  const [endpoints, setEndpoints] = useState(null);
  const [posts, setPosts] = useState(null);

  const appCtx = useContext(AppContext);
  const { domainUrl } = appCtx;

  const getEndpoints = async () => {
    const data = await wpUtils.wpGetEndpoints(domainUrl);
    setEndpoints(data);
  }

  const getPosts = async () => {
    const data = await wpUtils.wpGetPosts(domainUrl);
    setPosts(data);
  }

  useEffect(() => {
   
    return;
  }, [])

  

  return (
    <div className="App">
      { !domainUrl &&
        <WpAuthentication />
      }
    </div>
  );
}

export default App;
