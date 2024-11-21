import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import WithLogging from '../HOC/WithLogging';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    props.logIn(
      event.target.elements.email.value,
      event.target.elements.password.value
    );
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  };

  useEffect(() => {
    if (email !== '' && password !== '') {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [email, password]);

  return (
    <React.Fragment>
      <div className={css(styles['App-body'])}>
        <p className={css(styles.title)} >Login to access the full dashboard</p>
        <form className={css(styles.form)} onSubmit={handleLoginSubmit} >
          <label className={css(styles.label)} htmlFor='email'>Email:</label>
          <input className={css(styles.input)} type="email" id="email" name="email" value={email} onChange={handleChangeEmail} />
          <label className={css(styles.label)} htmlFor='password'>Password:</label>
          <input className={css(styles.input)} type="password" id="password" name="password" value={password} onChange={handleChangePassword} />
          <input className={css(styles.button)} type='submit' value='Ok' disabled={!enableSubmit} />
        </form>
      </div>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  'App-body': {
    fontFamily: 'Helvetica, sans-serif',
    fontSize: '1rem',
    '@media (max-width: 900px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  title: {
    fontFamily: 'Lora, serif',
    fontSize: '1rem',
    color: '#e1003c',
  },  
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  label: {
    fontFamily: 'Lora, serif',
    fontSize: '1rem',
    color: '#000000',
  },
  input: {
    fontFamily: 'Lora, serif',
    fontSize: '1rem',
    color: '#000000',
    border: 'none',
    borderRadius: '0.5em',
    padding: '0.5em',
    margin: '0.5em',
    '@media (max-width: 900px)': {
      margin: '0.5em 0',
    },
  },
  button: {
    fontFamily: 'Lora, serif',
    fontSize: '1.2rem',
    border: '2px solid gray',
    borderRadius: '8px',
    padding: '4px',
    cursor: 'pointer',
  },
})

Login.propTypes = {
  logIn: PropTypes.func,
};

const LoginWithLogging = WithLogging(Login);

export { Login, LoginWithLogging };
