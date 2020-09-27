import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-56b93/us-central1/api'  // The API (cloud function) URL
});


export default instance;