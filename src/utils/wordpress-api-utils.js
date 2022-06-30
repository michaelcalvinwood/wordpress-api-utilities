import axios from 'axios';

export const wpGetEndpoints = domainUrl => {
    const request = {
        url: `${domainUrl}/wp-json`,
        method: 'get'
    }

    return new Promise((resolve, reject) => {
        axios(request)
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
}