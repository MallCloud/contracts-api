import { DataLoader } from 'dataloader';
import { fetch } from 'node-fetch';
import { graphqlHTTP } from 'express-graphql';
import app from './app';
import redis from './redis';
import request from 'request';
import UserQuery from './schema/UserQuery';


const restapi_host = process.env.RESTAPIHOST || '35.193.0.206';
const restapi_port = process.env.RESTAPIPORT || '8000';

const api_url = restapi_host + ':' + restapi_port;

var RestAPIConnector = {

    /**
     * receive Token from REST API
     * @params {[string, string]} [username: xxx, password: yyy]
     * @return {[json-string]} [token]
     */
    getTokenForAuth: function (info) {
        try {
            return
                fetch(api_url + '/api/api-token/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRFToken': 'EbtU1Lruhi0ZG09flLkTa5R6uO5Tbs58VxLgE6Y3MofDtJlx9JM3TcNrEYGLSpgB'
                    },
                    body: {username: info.username, password: info.password}
                })
                .then(res => res.json())
                .then(json => json.token)
                .then(function(token) {
                    auth_token = token;
                })
        }

        catch (e) {
            console.log('[-] Error: Token Not Received');
            console.log('[!] Exception: ' + e);
        }

        finally {
            // handle Exception
        }
    },

    getJSONFromRelativeURL: function (relativeURL, info) {
        return fetch(`${api_url}${relativeURL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
    			'Authorization': 'Token ' + getTokenForAuth(info),
            }
        })
        .then(res => res.json());
    },

    getUsers: function () {
        return getJSONFromRelativeURL('/api/users/')
            .then(json => json.users);
    },

    getUser: function (id, info) {
        return getUserByURL(`/api/users/${id}/`, info);
    },

    getUserByURL: function (relativeURL, info) {
        return getJSONFromRelativeURL(relativeURL, info)
            .then(json => json.user);
    },

};

export default RestAPIConnector;
