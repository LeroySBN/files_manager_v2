import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import WithLogging from '../HOC/WithLogging';

function Signup(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enableSubmit, setEnableSubmit] = useState(false);

    const handleShowLogin = () => {
        props.handleShowLogin();
    }

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        props.signUp(
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
            <div className={css(styles['Signup-container'])}>
                <p className={css(styles.title)}>Create Files account</p>
                <form className={css(styles.form)} onSubmit={handleSignupSubmit}>
                    <label className={css(styles.label)} htmlFor='email'>Email:</label>
                    <input className={css(styles.input)} type="email" id="email" name="email" value={email}
                           onChange={handleChangeEmail}/>
                    <label className={css(styles.label)} htmlFor='password'>Password:</label>
                    <input className={css(styles.input)} type="password" id="password" name="password" value={password}
                           onChange={handleChangePassword}/>
                    <span>
                        <input type={"checkbox"} id='marketing' value='true'/>
                        <label className={css(styles.checkbox)}
                           htmlFor='marketing'>Receive product updates, news, and other marketing communications</label>
                    </span>
                    <span>
                        <input type={"checkbox"} id='jwt-cookie' value='true'/>
                        <label className={css(styles.checkbox)} htmlFor='jwt-cookie'>Stay signed in</label>
                    </span>
                    <input className={css(styles.button)} type='submit' value='Create Free Account'
                           disabled={!enableSubmit}/>
                </form>
            </div>
            <div className={css(styles.redirects)}>
                <p className={css(styles.redirectHeader)}>Already have an account?
                    <a className={css(styles['redirect'])} href="#" onClick={handleShowLogin}> Sign in</a>
                </p>
            </div>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    'Signup-container': {
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '1rem',
        padding: '2rem 1.5rem',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '2px 2px 10px #000000',
        width: '350px',
        backgroundColor: '#ffffff',
        '@media (max-width: 432px)': {
            width: '100%',
            margin: '2vw',
            padding: '2rem 1rem',
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
        width: '100%',
    },
    label: {
        fontFamily: 'Lora, serif',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: '#999999',
        paddingBottom: 0,
    },
    input: {
        fontFamily: 'Lora, serif',
        fontSize: '0.8rem',
        color: '#000000',
        border: 'solid 1px #999999',
        borderRadius: '0.5em',
        padding: '0.5rem 0',
        width: '100%',
        marginBottom: '2rem',
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
        marginTop: '2rem',
    },
    checkbox: {
        fontFamily: 'Lora, serif',
        fontSize: '0.9rem',
        color: '#000000',
        cursor: 'pointer',
    },
    'redirects': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
    },
    'redirectHeader': {
        fontFamily: 'Lora, serif',
        color: '#000000',
        fonSize: '1rem',
    },
    'redirect': {
        fontFamily: 'Lora, serif',
        fontSize: '1rem',
        color: '#cc0000',
        background: 'transparent',
        border: 'none',
        textDecoration: 'none',
    },
})

Signup.propTypes = {
    signUp: PropTypes.func,
};

const SignupWithLogging = WithLogging(Signup);

export { Signup, SignupWithLogging };
