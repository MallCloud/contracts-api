/* @flow */

import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cuid from 'cuid';
import cors from 'cors';
import LoginConnector from './connectors/loginconn';
import NotebookConnector from './connectors/nbconn';
import DatasetConnector from './connectors/datasetconn';



/**
 * Earlier way of accessing ethereum contracts;
 * available here for reference while new code is written
 */

/**

const loginConnector = LoginConnector.at(process.env.LOGIN_CONTRACT_ADDRESS || '0xf7b06365e9012592c8c136b71c7a2475c7a94d71');
const nbConnector = NotebookConnector.at(process.env.NB_CONTRACT_ADDRESS || '0xf7b06365e9012592c8c136b71c7a2475c7a94d71');
const datasetConnector = DatasetConnector.at(process.env.DATASET_CONTRACT || '0xf7b06365e9012592c8c136b71c7a2475c7a94d71');

const loginAttempt = loginConnector.LoginAttempt();

const createNewNotebook = nbConnector.CreateNewNotebook();
const accessLevelFromUser = nbConnector.AccessLevelFromUser();
const addNotebookVersion = nbConnector.addNotebookVersion();

**/

const eth = {

}

export default eth;
