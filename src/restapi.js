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
var auth_token = '';

/**
 * receive Token from REST API
 * @params {[string, string]} [username: xxx, password: yyy]
 * @return {[json-string]} [token]
 */
function getTokenForAuth(info) {
    try {
        auth_token =
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
}

function getJSONFromRelativeURL(relativeURL) {
    return fetch(`${api_url}${relativeURL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
			'Authorization': 'Token ' + auth_token,
        }
    })
    .then(res => res.json());
}

function getUsers() {
    return getJSONFromRelativeURL('/api/users/')
        .then(json => json.users);
}

function getUser(id) {
    return getUserByURL(`/api/users/${id}/`);
}

function getUserByURL(relativeURL) {
    return getJSONFromRelativeURL(relativeURL)
        .then(json => json.user);
}

app.use(graphqlHTTP(req => {

    const cacheMap = new Map();

    const usersLoader =
        new DataLoader(keys => Promise.all(keys.map(getUsers)), {cacheMap});

    const userLoader =
        new DataLoader(keys => Promise.all(keys.map(getUser)), {
            cacheKeyFn: key => `/users/${key}`,
            cacheMap
        });

    const userByURLLoader =
        new DataLoader(keys => Promise.all(keys.map(getUserByURL)), {cacheMap});

    userLoader.loadAll = usersLoader.load.bind(usersLoader, '__all__');
	userLoader.loadByURL = userByURLLoader.load.bind(userByURLLoader);
	userLoader.loadManyByURL = userByURLLoader.loadMany.bind(userByURLLoader);
	const loaders = {user: userLoader};

    return {
        context: {loaders},
        graphiql: true,
        UserQuery
    };
}));
