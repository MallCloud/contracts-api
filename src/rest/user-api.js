/* @flow */
/* eslint-disable import/prefer-default-export */

import fetch from 'node-fetch';

const restapi_host = process.env.RESTAPIHOST || '35.193.0.206';
const restapi_port = process.env.RESTAPIPORT || '8000';

const api_url = 'http://' + restapi_host + ':' + restapi_port;

function getTokenForAuth(info) {
    return fetch(api_url + '/api/api-token/', {
        method: 'POST',
        body: JSON.stringify(info),

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': 'EbtU1Lruhi0ZG09flLkTa5R6uO5Tbs58VxLgE6Y3MofDtJlx9JM3TcNrEYGLSpgB'
        }
    })
    .then(function(res) {
        return res.json();
    })
}

function getJSONFromRelativeURL(relativeURL, info) {
    return getTokenForAuth(info)
        .then(function(token) {
            return fetch(`${api_url}${relativeURL}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token.token}`
                }
            });
        })
        .then(function(res) {
            return res.json();
        })
}

module.exports = {
    getTokenForAuth,
    getJSONFromRelativeURL,
};
