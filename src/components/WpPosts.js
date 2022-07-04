import './WpPosts.scss';
import React, { useContext, useState, useEffect } from "react";
import AppContext from "../data/AppContext";
import * as wpUtils from '../utils/wordpress-api-utils';
import WpPostCard from "./WpPostCard";

const WpPosts = props => {

    const { setSelectedPost } = props;

    const appCtx = useContext(AppContext);
    const { domainUrl } = appCtx;

    const { posts, setPosts } = props;

    const getPosts = async () => {
        let posts = [];
        try {
            const postData = await wpUtils.wpGetPosts(domainUrl);

            // get author
            for (let i = 0; i < postData.length; ++i) {
                console.log(`postData[${i}]`, postData[i])
                let post = {};
                post.id = postData[i].id;
                post.title = postData[i].title.rendered;
                post.content = postData[i].content.rendered;
                post.excerpt = postData[i].excerpt.rendered;
                post.author = postData[i].author;
                post.date = postData[i].date_gmt;
                post.featuredMedia = postData[i].featured_media;
                posts.push(post);
            }
        } catch (e) {
            console.log(e);
            alert(e);
        }
        
        console.log('posts', posts);
        setPosts(posts);
    }


    useEffect (() => {
        getPosts();
    }, [])

    return (
        <div className="wp-posts">
            <div className="wp-posts__postcards">
                {posts.map(post => {
                    return (
                    <WpPostCard
                            post={post}
                            setSelectedPost={setSelectedPost}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default WpPosts;