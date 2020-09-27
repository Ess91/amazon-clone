import axios from "axios";

const instance = axios.create({
    baseURL: '...'  // The API (cloud function) URL
});

//http://localhost:5001/clone-56b93/us-central1/api
export default instance;