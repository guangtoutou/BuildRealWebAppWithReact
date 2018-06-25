import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';

class ResetPasswordForm extends Component {
  state = {
    data: {
      password: '',
      confirmPassword: '',
      token: this.props.token
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
          errors: { message: err.response.data.message },
          loading: false
        })
      );
    }
  };

  validate = data => {
    const errors = {};
    if (Validator.isEmpty(data.password))
      errors.password = "password can't be empty";
    if (Validator.isEmpty(data.confirmPassword))
      errors.confirmPassword = "password can't be empty";
    if (!Validator.matches(data.password, data.confirmPassword))
      errors.password = 'passwords must match';
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
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Please enter your password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder=""
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.confirmPassword}>
          <label htmlFor="confirmPassword">Please confirm your password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder=""
            value={data.confirmPassword}
            onChange={this.onChange}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword} />
          )}
        </Form.Field>

        <Button primary>submit</Button>
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ResetPasswordForm;
