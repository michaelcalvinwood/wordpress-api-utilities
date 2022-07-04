import { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as wpUtils from './utils/wordpress-api-utils';
import AppContext from './data/AppContext';
import WpAuthentication from './components/WpAuthentication';
import WpPosts from './components/WpPosts';
import WpEditPost from './components/WpEditPost';

function App() {
  const [endpoints, setEndpoints] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(0);

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
      {
        domainUrl && !selectedPost &&
        <WpPosts 
          setSelectedPost={setSelectedPost}
          posts={posts}
          setPosts={setPosts}/>
      }
      {
        selectedPost &&
        <WpEditPost
          posts={posts}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          />
      }
    </div>
  );
}

export default App;
