/* @flow */
/* eslint-disable import/prefer-default-export */

import fetch from 'node-fetch';

const restnb_host = process.env.RESTAPIHOST || '35.193.0.206';
const restnb_port = process.env.RESTAPIPORT || '8000';

const nb_url = 'http://' + restnb_host + ':' + restnb_port;

function createNewNotebook(details) {
    return fetch(nb_url + '/notebooks/', {
        method: "POST",
        body: JSON.stringify(details),

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': 'Y9CL7MUmiZmngLftI4WWaQzQIDXSTOEmVBBDfhY7GVX14nrSOUla7hKTVWatutv6'
        }
    })
}


module.exports = {
    createNewNotebook,
};
