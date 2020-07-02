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
        <Grid item xs={false} sm={4} md={7} className="login__image" />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="login__form">
            <div className="login__form__header">
              <img src="https://image.flaticon.com/icons/svg/1689/1689081.svg" />{' '}
              <h1>Log in to Versioning 4</h1>
              <br />
            </div>
            <form
              className="login__form"
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
              <Grid container className="login__submit">
                <Grid item>
                  <div className="login__submit__button">
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
                  <div className="login__submit__button">
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

            {/* <form onSubmit={(ev) => handleSubmit(ev, this.props.history)}>
                <li className="list-group-item">
                  <label>Email</label>
                  <input
                    className="form-control"
                    name="email"
                    value={email}
                    placeholder="Enter your email address"
                    onChange={handleChange}
                  />
                </li>

                <li className="list-group-item">
                  <label>Password</label>
                  <input
                    className="form-control"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    type="password"
                    onChange={handleChange}
                  />
                </li>

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

                <div className="login-buttons">
                  <button type="submit" className="standard-btn">
                    Log in
                  </button>
                  <button
                    type="button"
                    className="standard-btn"
                    onClick={() => history.push(`/signup`)}
                  >
                    Sign Up
                  </button>
                </div>
              </form> */}
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
