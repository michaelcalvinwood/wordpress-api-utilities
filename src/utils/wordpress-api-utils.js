import axios from 'axios';

export const wpGetEndpoints = domainUrl => {
    const request = {
        url: `${domainUrl}/wp-json`,
        method: 'get'
    }

    return new Promise((resolve, reject) => {
        axios(request)
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    })
}

export const wpGetPosts = domainUrl => {
    const request = {
        url: `${domainUrl}/wp-json/wp/v2/posts`,
        method: 'get'
    }

    return new Promise((resolve, reject) => {
        axios(request)
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    })
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

    console.log(request)

    return new Promise((resolve, reject) => {
        axios(request)
        .then(result => resolve(result.data))
        .catch(error => reject(error));
    })
}