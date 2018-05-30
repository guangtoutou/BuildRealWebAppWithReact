import React, { Component } from 'react';
import { Form, Button, Message, Segment, Image, Grid } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';
import PropTypes from 'prop-types';

class BookForm extends Component {
  state = {
    data: {
      title: this.props.book.title,
      authors: this.props.book.authors,
      covers: this.props.book.covers,
      pages: this.props.book.pages
    },
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        title: props.book.title,
        authors: props.book.authors,
        covers: props.book.covers,
        pages: props.book.pages
      },
      loading: false,
      errors: {}
    });
  }

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
    if (Validator.isEmpty(data.title)) errors.title = "title can't be empty";
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                {errors.message && (
                  <Message negative>
                    <Message.Header>Something went wrong</Message.Header>
                    <p>{errors.message}</p>
                  </Message>
                )}
                <Form.Field error={!!errors.title}>
                  <label htmlFor="title">Book Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Book Title"
                    value={data.title}
                    onChange={this.onChange}
                  />
                  {errors.title && <InlineError text={errors.title} />}
                </Form.Field>
                <Form.Field error={!!errors.authors}>
                  <label htmlFor="authors">Author</label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    placeholder="Book authors"
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  {errors.authors && <InlineError text={errors.authors} />}
                </Form.Field>
                <Form.Field error={!!errors.pages}>
                  <label htmlFor="pages">Book pages</label>
                  <input
                    type="text"
                    id="pages"
                    name="pages"
                    placeholder="Book pages"
                    value={data.pages}
                    onChange={this.onChange}
                  />
                  {errors.pages && <InlineError text={errors.pages} />}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Image size="small" src={this.props.book.covers} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Button primary>Save</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default BookForm;
