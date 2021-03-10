import axios from 'axios';

const instance= axios.create({
    baseURL:  'https://vandore-backend.netlify.app/.netlify/functions/api' 
});

export default instance;