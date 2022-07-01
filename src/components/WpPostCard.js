import './WpPostCard.scss';
import React, { useEffect } from "react";

const WpPostCard = props => {
    const { setSelectedPost } = props;
    const { id, featuredMedia, title, author, date, excerpt } = props.post;

    useEffect(() => {
        const excerptEl = document.querySelector(`.wp-post-card__excerpt-${id}`);
        excerptEl.innerHTML = excerpt;
    }, [])
    return (
        <div 
            className="wp-post-card"
            onClick={() => setSelectedPost(id)}>
            <h3 className="wp-post-card__title">{title}</h3>
            <p className="wp-post-card__author">{author}</p>
            <p className={`wp-post-card__excerpt-${id}`}></p>
        </div>
    )
}

export default WpPostCard;