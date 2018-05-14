import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Form, Header, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class LoginUserInput extends Component {
  state = {
		username: '',
		password: '',
		usernameError: '',
		passwordError: '',
  }

  changeValue = (e, { name, value }) => {
		this.setState({ [name]: value });
  }

  submitForm = (e) => {
  	// TODO redundunt checks?
  	e.preventDefault();
  	if (this.state.username.length > 0 && this.state.password.length > 0) {
  		this.props.onSubmit(this.state.username, this.state.password);
  	} else {
  		this.setState({
  			usernameError: !this.state.username,
  			passwordError: !this.state.password,
  		});
  	}
  }

  render() {
		return (
			<Segment className="login-user-input">
				<Header size="medium">
					Log in
				</Header>
				<Form onSubmit={this.submitForm}>
					<Form.Input
						required
						type="text"
						placeholder="User Name"
						name="username"
						value={this.state.username}
						onChange={this.changeValue}
						error={!!this.state.usernameError}
					/>
					<Form.Input
						required
						type="password"
						placeholder="*******"
						name="password"
						value={this.state.password}
						onChange={this.changeValue}
						error={!!this.state.passwordError}
					/>
					<Form.Button content="Submit" />
				</Form>
				{this.props.errors && Object.keys(this.props.errors).length > 0 && (
					<Message
						error
						content="Wrong username/password combination."
					/>
				)}
				<Header size="small">Don&#039;t have an account yet?</Header>
				<Link to="/register">Register</Link>
  		</Segment>
  	);
  }
}

LoginUserInput.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	errors: PropTypes.shape({
		non_field_errors: PropTypes.array,
	}),
};
