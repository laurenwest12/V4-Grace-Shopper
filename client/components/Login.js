import React, { Component } from 'react';
import { Button, CssBaseline, TextField, Paper, Grid } from '@material-ui/core';

import { connect } from 'react-redux';
import { loginUserThunk } from '../redux/actions/login';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleChange = (ev) => {
    this.setState({ [ev.target.name]: ev.target.value });
  };

  handleSubmit = (ev, history) => {
    ev.preventDefault();

    return this.props
      .login(this.state)
      .then(() => history.push(`/home`))
      .catch(({ response: { data } }) => this.setState({ error: data.errors }));
  };

  render() {
    const { email, password, error } = this.state;
    const { handleChange, handleSubmit } = this;
    const { history } = this.props;

    return (
      <Grid className="login" container component="main">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="login-image" />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="login-form">
            <div className="login-form-header">
              <img src="https://image.flaticon.com/icons/svg/1689/1689081.svg" />{' '}
              <h1>Log in to Versioning 4</h1>
              <br />
            </div>
            <form
              className="login-form"
              onSubmit={(ev) => handleSubmit(ev, this.props.history)}
              noValidate
            >
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

              {error &&
                (Array.isArray(error) ? (
                  <ul>
                    {error.map((e, idx) => (
                      <li key={idx}>{e}</li>
                    ))}
                  </ul>
                ) : (
                  <div>{error[0]}</div>
                ))}
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
                      Sign In
                    </Button>
                  </div>
                </Grid>

                <Grid item>
                  <div className="login-submit-button">
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      style={{ fontSize: '1.5rem' }}
                      onClick={() => history.push(`/signup`)}
                    >
                      Sign Up
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ loggedInUser }) => ({ loggedInUser });

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(loginUserThunk(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
