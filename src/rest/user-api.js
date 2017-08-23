/* @flow */
/* eslint-disable import/prefer-default-export */

import fetch from 'node-fetch';

const restapi_host = process.env.RESTAPIHOST || '35.193.0.206';
const restapi_port = process.env.RESTAPIPORT || '8000';

const api_url = 'http://' + restapi_host + ':' + restapi_port;

import { getTokenForAuth } from './token';

function getJSONFromRelativeURLUsingCred(relativeURL, info) {
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

function getJSONFromRelativeURL(relativeURL, token) {
    return fetch(`${api_url}${relativeURL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })
    .then(function(res) {
        return res.json();
    })
}

module.exports = {
    getJSONFromRelativeURLUsingCred,
    getJSONFromRelativeURL,
};
