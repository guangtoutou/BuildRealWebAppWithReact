import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export default {
  user: {
    login: credentials => {
      return axios.post('/login', credentials).then(res => {
        return res.headers.authorization;
      });
    },
    signup: userForm => axios.post('/signup', userForm).then(res => res)
  }
};
