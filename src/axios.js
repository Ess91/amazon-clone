import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-clone-56b93.cloudfunctions.net/api'  // The API (cloud function) URL
});

//http://localhost:5001/clone-56b93/us-central1/api  - Local Host for debugging purposes
export default instance;