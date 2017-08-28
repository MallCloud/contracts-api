/* @flow */
/* eslint-disable import/prefer-default-export */

import fetch from 'node-fetch';

const restds_host = process.env.RESTAPIHOST || '35.193.0.206';
const restds_port = process.env.RESTAPIPORT || '8000';

const ds_url = 'http://' + restds_host + ':' + restds_port;

function createNewDataset(details) {
    return fetch(ds_url + '/datasets/', {
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
    createNewDataset,
};
