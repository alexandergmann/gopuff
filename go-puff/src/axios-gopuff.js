import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://prodcat.gopuff.com/api/'
});

export default instance;
