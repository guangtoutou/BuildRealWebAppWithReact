import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';

class ForgetPasswordForm extends Component {
  state = {
    data: {
      username: ''
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
    if (Validator.isEmpty(data.username))
      errors.username = "Username can't be empty";
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
          <label htmlFor="username">Please enter your username</label>
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

        <Button primary>submit</Button>
      </Form>
    );
  }
}

ForgetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgetPasswordForm;
