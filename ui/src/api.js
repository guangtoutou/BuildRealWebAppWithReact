import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export default {
  user: {
    login: credentials => {
      return axios.post('/login', credentials).then(res => res.data);
    },
    signup: userForm => axios.post('/signup', userForm).then(res => res.data),
    confirm: token => {
      console.log(`hello ${token}`);
      return axios
        .get('/confirm', { params: { token: token } })
        .then(res => res.data);
    }
  }
};
