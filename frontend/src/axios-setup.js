import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_SERV_URL}`
});

export default instance;