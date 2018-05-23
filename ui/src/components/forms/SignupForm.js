import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';

class SignupForm extends Component {
  state = {
    data: {
      username: '',
      password: ''
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err =>
        this.setState({
          errors: { message: err.response.data },
          loading: false
        })
      );
    }
  };

  validate = data => {
    const errors = {};
    if (Validator.isEmpty(data.username))
      errors.username = "Username can't be empty";
    if (Validator.isEmpty(data.password))
      errors.password = "Password can't be empty";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.message && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.message}</p>
          </Message>
        )}
        <Form.Field error={!!errors.username}>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="James"
            value={data.username}
            onChange={this.onChange}
          />
          {errors.username && <InlineError text={errors.username} />}
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make it secure"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
