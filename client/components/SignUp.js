import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUpThunk } from '../redux/actions/users';
import { loginUserThunk } from '../redux/actions/login';
import { Link } from 'react-router-dom';

import { Button, CssBaseline, TextField, Paper, Grid } from '@material-ui/core';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: [],
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { history, signUp, login } = this.props;

    signUp(this.state)
      .then(() => login(this.state))
      .then(() => {
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          error: [],
        });
        history.push(`/home`);
      })
      .catch(({ response: { data } }) => this.setState({ error: data.errors }));
  };

  render() {
    const { firstName, lastName, email, password, error } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <Grid className="login" container component="main">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="login-image" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="login-form">
            <div className="login-form-header">
              <img src="https://image.flaticon.com/icons/svg/1689/1689081.svg" />{' '}
              <h1>Sign up for Versioning 4</h1>
              <br />
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="first name"
                value={firstName}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="last name"
                value={lastName}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChange}
              />
              {error && Array.isArray(error) && (
                <ul className="errors">
                  {error
                    .filter((item) => item.includes('notEmpty'))
                    .map((e, idx) => (
                      <li key={idx}>
                        {e.includes('firstName') && `First name is required`}
                        {e.includes('lastName') && `Last name is required`}
                        {e.includes('email') && `Email is required`}
                        {e.includes('password') && `Password is required`}
                      </li>
                    ))}
                </ul>
              )}
              <Grid container className="login-submit">
                <Grid item>
                  <div className="login-submit-button">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ fontSize: '1.5rem' }}
                    >
                      Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
              Already registered? <Link to="/login">Sign in</Link>
            </form>
          </div>
        </Grid>
      </Grid>

      // <div className="login-form">
      //   <form onSubmit={handleSubmit}>
      //     <ul className="list-group">
      //       <li className="list-group-item">
      //         <label>First Name</label>
      //         <input
      //           className="form-control"
      //           name="firstName"
      //           value={firstName}
      //           placeholder="First name"
      //           onChange={handleChange}
      //         />
      //       </li>
      //       <li className="list-group-item">
      //         <label>Last Name</label>
      //         <input
      //           className="form-control"
      //           name="lastName"
      //           value={lastName}
      //           placeholder="Last name"
      //           onChange={handleChange}
      //         />
      //       </li>
      //       <li className="list-group-item">
      //         <label>Email</label>
      //         <input
      //           className="form-control"
      //           name="email"
      //           value={email}
      //           placeholder="Email"
      //           onChange={handleChange}
      //         />
      //       </li>
      //       <li className="list-group-item">
      //         <label>Password</label>
      //         <input
      //           className="form-control"
      //           name="password"
      //           type="password"
      //           value={password}
      //           placeholder="Password"
      //           onChange={handleChange}
      //         />
      //       </li>
      //     </ul>
      //     {error && Array.isArray(error) && (
      //       <ul className="errors">
      //         {error
      //           .filter((item) => item.includes('notEmpty'))
      //           .map((e, idx) => (
      //             <li key={idx}>
      //               {e.includes('firstName') && `First name is required`}
      //               {e.includes('lastName') && `Last name is required`}
      //               {e.includes('email') && `Email is required`}
      //               {e.includes('password') && `Password is required`}
      //             </li>
      //           ))}
      //       </ul>
      //     )}
      //     <div className="login-buttons">
      //       <button type="submit" className="standard-btn">
      //         Submit
      //       </button>
      //     </div>
      //   </form>
      // </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUp: (user) => dispatch(signUpThunk(user)),
  login: (user) => dispatch(loginUserThunk(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
