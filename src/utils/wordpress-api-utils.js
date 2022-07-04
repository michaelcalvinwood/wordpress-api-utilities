// https://developer.wordpress.org/rest-api/reference/

import axios from 'axios';

const wpAxios = request => {
    return new Promise((resolve, reject) => {
        axios(request)
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    })
}

export const wpGetEndpoints = domainUrl => {
    const request = {
        url: `${domainUrl}/wp-json`,
        method: 'get'
    }

    return wpAxios(request);

    // return new Promise((resolve, reject) => {
    //     axios(request)
    //     .then(result => resolve(result.data))
    //     .catch(error => reject(error));
    // })
}

export const wpGetPosts = domainUrl => {
    const request = {
        url: `${domainUrl}/wp-json/wp/v2/posts`,
        method: 'get'
    }

    return wpAxios(request);

    // return new Promise((resolve, reject) => {
    //     axios(request)
    //     .then(result => resolve(result.data))
    //     .catch(error => reject(error));
    // })
}

export const wpJwtAuthentication = (domainUrl, username, password) => {
    const request = {
        url: `${domainUrl}/wp-json/jwt-auth/v1/token`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            username,
            password
        }
    }

    console.log(request);
    return wpAxios(request);

    // return new Promise((resolve, reject) => {
    //     axios(request)
    //     .then(result => resolve(result.data))
    //     .catch(error => reject(error));
    // })
}

/* wpCreatePost: Example data
    const data = {
        title: "Test Title",
        content: "Test Content",
        status: "publish"
    }
*/

export const wpGetMediaInfoFromId = (domainUrl, mediaId) => {
    const request = {
        url: `${domainUrl}/wp-json/wp/v2/media/${mediaId}`,
        method: 'get'
    }

    return wpAxios(request);
}

export const wpCreatePost = (domainUrl, data, token) => {
    const request = {
        url: `${domainUrl}/wp-json/wp/v2/posts`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data
    }

    return wpAxios(request);
    // return new Promise((resolve, reject) => {
    //     axios(request)
    //     .then(result => resolve(result.data))
    //     .catch(error => reject(error));
    // })
}

const getAuthorInfoFromAuthorUrl = async url => {
    const request = {
        url,
        method: 'get'
    }
    return wpAxios(request);
    // return new Promise ((resolve, reject) => {
    //     axios(request)
    //     .then(result => resolve(result.data))
    //     .catch(error => reject(error));
    // })
}

export const getAuthorsFromAuthorArray = async authorArr => {
    console.log(authorArr);

    if (!Array.isArray(authorArr)) return '';
    if (!authorArr.length) return '';
    let authors = '';

    for (let i = 0; i < authorArr.length; ++i) {
        if (!authorArr[i].embeddable) continue;
        const authorInfo = await getAuthorInfoFromAuthorUrl(authorArr[i].href);

        if (authors.length) authors += ' ' + authorInfo.name;
        else authors = authorInfo.name;
    }

    return authors;
}

export const wpUpdatePost = async (domainUrl, selectedPost, data, token) => {
    const request = {
        url: `${domainUrl}/wp-json/wp/v2/posts/${selectedPost}`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data
    }

    return wpAxios(request);
}