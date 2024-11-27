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
                <p className={css(styles.title)} >Create File Push account</p>
                <form className={css(styles.form)} onSubmit={handleLoginSubmit} >
                    <label className={css(styles.label)} htmlFor='email'>Email:</label>
                    <input className={css(styles.input)} type="email" id="email" name="email" value={email} onChange={handleChangeEmail} />
                    <label className={css(styles.label)} htmlFor='password'>Password:</label>
                    <input className={css(styles.input)} type="password" id="password" name="password" value={password} onChange={handleChangePassword} />
                    <input className={css(styles.button)} type='submit' value='Create Free Account' disabled={!enableSubmit} />
                </form>
                <p className={css(styles.redirect)}>Already have an account? Sign in</p>
            </div>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    'App-body': {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '1rem',
        margin: '0 400px',
        padding: '20px',
        border: '1px solid #e4e4e4',
        borderRadius: '8px',
        '@media (max-width: 900px)': {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    title: {
        fontFamily: 'Lora, serif',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.9rem',
        // '@media (max-width: 768px)': {
        //   flexDirection: 'column',
        //   alignItems: 'flex-start',
        // },
    },
    label: {
        fontFamily: 'Lora, serif',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#999999',
    },
    input: {
        fontFamily: 'Lora, serif',
        fontSize: '0.8rem',
        color: '#000000',
        border: 'solid 1px #999999',
        borderRadius: '0.5em',
        padding: '0.5em',
        width: '100%',
    },
    button: {
        fontFamily: 'Lora, serif',
        fontSize: '0.9rem',
        border: 'none',
        borderRadius: '8px',
        padding: '6px 4px',
        cursor: 'pointer',
        width: '100%',
        background: '#3d85c6',
        color: '#ffffff',
    },
    redirect: {
        fontFamily: 'Lora, serif',
        fontSize: '1rem',
        color: '#cc0000',
        textAlign: 'center',
    }
})

Login.propTypes = {
    logIn: PropTypes.func,
};

const LoginWithLogging = WithLogging(Login);

export { Login, LoginWithLogging };
