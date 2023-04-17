import axios from 'axios';
import {getLocalStorage} from "../utils/save-local-storage";

const jwtToken = getLocalStorage('jwt');


axios.interceptors.request.use(
  config => {
    const token = jwtToken;
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
)
