# CMPE-273---LinkedIn-Prototype

Guidelines for Deployment:

There is .env at frontend root folder which has the backend server address:

REACT_APP_SERV_URL='http://localhost:3001'

By doing this,at the time of deployment we would need to change the URL here once rather than changing at different places.Deployment would be easier.

Please Use axios-setup.js file for all your axios calls:

It Looks like this:

                import axios from 'axios';

                const instance = axios.create({
                    baseURL: `${process.env.REACT_APP_SERV_URL}`
                 });

                export default instance;

To make axios call simply use it like this:
Example from Job Post Action: 
import axios from '../../axios-setup';

axios.post('/jobupdate',data)

To Use NavBar in your component Use it like this:
NavBar is in component folder:

import NavBar from '../NavBar/NavBar';

Simple add <NavBar />  inside div.

In the Backend and Kafka Backed there is db folder where mongoose configs are stored.
SQL is not used at the moment but pool.js available for future use in Backend


To Run create the following kafka topics:
1. jobpost
2. getjobpost
3. response_topic
4. createuser
5. getprofile


