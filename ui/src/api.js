import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export default {
  user: {
    login: credentials =>
      axios.post('/login', credentials).then(res => res.data),
    signup: userForm => axios.post('/signup', userForm).then(res => res.data),
    confirm: token =>
      axios.get('/confirm', { params: { token: token } }).then(res => res.data),
    forgetPassword: data =>
      axios.post('/forget_password', data).then(res => res.data),
    validateToken: token =>
      axios.post('/validate_token', token).then(res => res.data),
    resetPassword: data =>
      axios.post('/reset_password', data).then(res => res.data)
  }
};
