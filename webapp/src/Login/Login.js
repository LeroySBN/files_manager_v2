import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WithLogging from '../HOC/WithLogging';
import { login } from '../actions/authActions';

function Login({ showSignup, login, loading, error, signupEmail }) {
    const [email, setEmail] = useState(signupEmail || '');
    const [password, setPassword] = useState('');
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setLocalError('');

        try {
            await login(email, password);
        } catch (err) {
            setLocalError(err.toString());
        }
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        setEnableSubmit(email !== '' && password !== '');
    }, [email, password]);

    return (
        <React.Fragment>
            <div className={css(styles['Login-container'])}>
                <p className={css(styles.title)}>Sign in to Files</p>
                {(error || localError) && (
                    <div className={css(styles.errorMessage)}>
                        {error || localError}
                    </div>
                )}
                <form className={css(styles.form)} onSubmit={handleLoginSubmit}>
                    <label className={css(styles.label)} htmlFor='email'>Email:</label>
                    <input
                        className={css(styles.input)}
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChangeEmail}
                        required
                        disabled={loading}
                    />
                    <label className={css(styles.label)} htmlFor='password'>Password:</label>
                    <input
                        className={css(styles.input)}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChangePassword}
                        required
                        disabled={loading}
                    />
                    <button
                        className={css(styles.button)}
                        type='submit'
                        disabled={!enableSubmit || loading}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
            <div className={css(styles.redirects)}>
                <span className={css(styles.redirectHeader)}>
                    Don't have an account?
                    <button
                        className={css(styles.authSwitchButton)}
                        onClick={showSignup}
                        disabled={loading}
                    >
                        Create free account
                    </button>
                </span>
            </div>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    'Login-container': {
        fontFamily: 'Inter, sans-serif',
        fontSize: '1rem',
        padding: '40px 20px',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '350px',
        backgroundColor: '#ffffff',
        '@media (max-width: 432px)': {
            width: '300px',
        },
    },
    title: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: '2rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        gap: '1rem',
    },
    label: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#4B5563',
    },
    input: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '1rem',
        color: '#1F2937',
        border: '1px solid #D1D5DB',
        borderRadius: '0.375rem',
        padding: '0.75rem',
        width: '100%',
        transition: 'border-color 0.15s ease-in-out',
        ':focus': {
            outline: 'none',
            borderColor: '#3B82F6',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
        },
        ':disabled': {
            backgroundColor: '#F3F4F6',
            cursor: 'not-allowed',
        },
    },
    button: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '1rem',
        fontWeight: '500',
        border: 'none',
        borderRadius: '0.375rem',
        padding: '0.75rem',
        cursor: 'pointer',
        width: '100%',
        background: '#3B82F6',
        color: '#ffffff',
        marginTop: '1rem',
        transition: 'background-color 0.15s ease-in-out',
        ':hover:not(:disabled)': {
            backgroundColor: '#2563EB',
        },
        ':disabled': {
            backgroundColor: '#93C5FD',
            cursor: 'not-allowed',
        },
    },
    redirects: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '1.5rem',
    },
    redirectHeader: {
        fontFamily: 'Inter, sans-serif',
        color: '#4B5563',
        fontSize: '0.875rem',
    },
    authSwitchButton: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.875rem',
        color: '#3B82F6',
        background: 'transparent',
        border: 'none',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        transition: 'color 0.15s ease-in-out',
        ':hover:not(:disabled)': {
            color: '#2563EB',
            textDecoration: 'underline',
        },
        ':disabled': {
            color: '#93C5FD',
            cursor: 'not-allowed',
        },
    },
    errorMessage: {
        color: '#DC2626',
        textAlign: 'center',
        marginBottom: '1rem',
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#FEE2E2',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
    },
});

Login.propTypes = {
    showSignup: PropTypes.func.isRequired,
    login: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.string,
    signupEmail: PropTypes.string,
};

const mapStateToProps = (state) => ({
    loading: state.auth.get('loading'),
    error: state.auth.get('error'),
    signupEmail: state.auth.get('signupEmail'),
});

const mapDispatchToProps = {
    login,
};

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
const LoggedLogin = WithLogging(ConnectedLogin);

export { LoggedLogin as Login };
