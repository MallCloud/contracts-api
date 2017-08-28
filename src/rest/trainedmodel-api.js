/* @flow */
/* eslint-disable import/prefer-default-export */

import fetch from 'node-fetch';

const resttm_host = process.env.RESTAPIHOST || '35.193.0.206';
const resttm_port = process.env.RESTAPIPORT || '8000';

const tm_url = 'http://' + resttm_host + ':' + resttm_port;

function createNewTrainedModel(details) {
    return fetch(tm_url + '/trainedmodels/', {
        method: "POST",
        body: JSON.stringify(details),

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': 'Y9CL7MUmiZmngLftI4WWaQzQIDXSTOEmVBBDfhY7GVX14nrSOUla7hKTVWatutv6'
        }
    });
}


module.exports = {
    createNewTrainedModel,
};
