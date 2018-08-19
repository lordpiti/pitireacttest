import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://footballpitiapi.azurewebsites.net/api/'
});

export default instance;