import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export default {
  user: {
    login: credentials => {
      var form_data = new FormData();

      for (var key in credentials) {
        form_data.append(key, credentials[key]);
      }

      return axios.post('/login', form_data).then(res => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${
          res.headers.authorization
        }`;
        return res.headers.authorization;
      });
    },
    signup: userForm => axios.post('/signup', userForm).then(res => res)
  }
};
