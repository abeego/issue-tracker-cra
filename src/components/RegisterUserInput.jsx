import React, { Component } from 'react';
import { Link } from 'react-router';
import { Segment, Form, Header, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class RegisterUserInput extends Component {
  state = {
    username: '',
    password: '',
    passwordConfirmed: '',
    email: '',
    usernameError: '',
    passwordError: '',
    emailError: '',
    passwordConfirmedError: '',
  }

  componentWillReceiveProps = (newProps) => {
    if (!this.props.newUser && newProps.newUser) {
      this.setState({
        username: '',
        password: '',
        passwordConfirmed: '',
        email: '',
        usernameError: '',
        passwordError: '',
        emailError: '',
        passwordConfirmedError: false,
        registerError: '',
      });
    }
  }

  changeValue = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.state.username.length
      && this.state.password.length
      && this.state.passwordConfirmed.length
      && this.state.password === this.state.passwordConfirmed
      && this.state.email.length) {
      this.props.onSubmit(this.state.username, this.state.email, this.state.password);
    } else {
      this.setState({
        usernameError: !this.state.username,
        passwordError: !this.state.password,
        passwordConfirmedError: !this.state.passwordConfirmed,
        emailError: !this.state.email,
      });
      if (this.state.password !== this.state.passwordConfirmed) {
        this.setState({ registerError: "Passwords didn't match" });
      } else {
        this.setState({ registerError: '' });
      }
    }
  }

  render() {
    return (
      <Segment className="login-user-input">
        <Header size="medium">
          Register new user
        </Header>
        <Form onSubmit={this.submitForm}>
          <Form.Input
            type="text"
            placeholder="User Name"
            name="username"
            value={this.state.username}
            onChange={this.changeValue}
            error={!!this.state.usernameError}
          />
          <Form.Input
            type="email"
            placeholder="email@email.com"
            name="email"
            value={this.state.email}
            onChange={this.changeValue}
            error={!!this.state.emailError}
          />
          <Form.Input
            type="password"
            placeholder="*******"
            name="password"
            value={this.state.password}
            onChange={this.changeValue}
            error={!!this.state.passwordError}
          />
          <Form.Input
            type="password"
            placeholder="*******"
            name="passwordConfirmed"
            value={this.state.passwordConfirmed}
            onChange={this.changeValue}
            error={!!this.state.passwordConfirmedError}
          />
          <Form.Button content="Submit" />
        </Form>
        {this.props.errors && this.props.errors.error && (
          <Message
            error
            content={this.props.errors.error}
          />
        )}
        {this.state.registerError && (
          <Message
            error
            content={this.state.registerError}
          />
        )}
        {this.props.newUser && (
          <Message
            success
            content={this.props.newUser}
          />
        )}
        <Header size="small">Already registered?</Header>
      </Segment>
    );
  }
}

RegisterUserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    error: PropTypes.string,
  }),
  newUser: PropTypes.string,
};
