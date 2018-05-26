import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

var bodyFormData = new FormData();
bodyFormData.set('username', 'James');
bodyFormData.append('password', 'Ilovecc2');

export default {
  user: {
    login: credentials => {
      var form_data = new FormData();

      for (var key in credentials) {
        form_data.append(key, credentials[key]);
      }

      return axios
        .post('/login', form_data)
        .then(res => res.headers.authorization);
    },
    signup: userForm => axios.post('/signup', userForm).then(res => res)
  }
};
