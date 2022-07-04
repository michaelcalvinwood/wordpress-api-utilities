import './WpEditPost.scss';
import JoditEditor from "jodit-react";
import React, {useState, useRef, useEffect, useContext, useMemo} from 'react';
import * as wpUtils from '../utils/wordpress-api-utils';
import AppContext from '../data/AppContext';


const WpEditPost = props => {
    const editor = useRef(null);
	const [content, setContent] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [featuredMediaUrl, setFeaturedMediaUrl] = useState('');

    console.log('wpEditPost props', props);
    const { posts, selectedPost, setSelectedPost} = props;

    const appCtx = useContext(AppContext);
    const { domainUrl, token } = appCtx;

    const config = {
		readonly: false
	}

    const cancelPostEdit = () => {
        setSelectedPost(0);
    }

    const postContent = () => {
        // give time for the blur event handler to update the content in state
        

        setTimeout(() => {
            const data = {
                content,
                title: postTitle
            };    
            
            wpUtils.wpUpdatePost(domainUrl, selectedPost, data, token)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.error(error);
            })
        }, 500);
    }

    const updateContent = newContent => {
        console.log('updating content', newContent);
        setContent(newContent);
    }

    const updatePostTitle = e => {
        e.preventDefault();
        e.stopPropagation();
        setPostTitle (e.target.value);
    }

    const setMediaUrl = async mediaId => {
        wpUtils.wpGetMediaInfoFromId(domainUrl, mediaId)
        .then(result => {
            console.log(result);
            setFeaturedMediaUrl(result.source_url);
        })
        .catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        console.log('wpEditPosts useEffect [] posts', posts);
        const curPost = posts.find(post => post.id === selectedPost);
        if (curPost) {
            setContent(curPost.content);
            setPostTitle(curPost.title);
            setMediaUrl(curPost.featuredMedia);
        }
    }, [])

    return (
        <div className='wp-edit-post'>
            <div className='wp-edit-post__buttons'>
                <button
                    className='wp-edit-post__publish-button'
                    onClick={postContent}
                >
                    Publish
                </button>
                <button
                    className='wp-edit-post__cancel-button'
                    onClick={cancelPostEdit}>
                    Exit
                </button>
            </div>
           
                        <input
                            className='wp-edit-post__title' 
                            value={postTitle}
                            onChange={updatePostTitle}/>
                    
                <div className='wp-edit-post__post-settings-media'>
                    { featuredMediaUrl &&
                        <img 
                            className='wp-edit-post__featured-image'
                            src={featuredMediaUrl} 
                            alt="Featured Image" 
                        />
                    }
                </div>
            
            <JoditEditor
                className="wp-edit-post__jodit"
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => updateContent(newContent)}
		/>
        </div> 
    )
}

export default WpEditPost;