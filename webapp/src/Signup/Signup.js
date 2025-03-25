import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WithLogging from '../HOC/WithLogging';
import { signup, clearAuthMessage } from '../actions/authActions';

function Signup({ showLogin, signup, loading, error, message, clearAuthMessage }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
        setLocalError('');

        try {
            await signup(email, password);
            // Don't call showLogin here, let the useEffect handle it
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

    useEffect(() => {
        // If signup was successful, redirect to login after 10 seconds
        if (message) {
            const timer = setTimeout(() => {
                clearAuthMessage();
                showLogin();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [message, showLogin, clearAuthMessage]);

    // Show success message if present
    if (message) {
        return (
            <div className={css(styles.successContainer)}>
                <div className={css(styles.successMessage)}>
                    {message}
                </div>
                <div className={css(styles.redirectMessage)}>
                    Redirecting to login...
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className={css(styles['Signup-container'])}>
                <p className={css(styles.title)}>Create Files account</p>
                {(error || localError) && (
                    <div className={css(styles.errorMessage)}>
                        {error || localError}
                    </div>
                )}
                <form className={css(styles.form)} onSubmit={handleSignupSubmit}>
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
                        {loading ? 'Creating account...' : 'Create Free Account'}
                    </button>
                </form>
            </div>
            <div className={css(styles.redirects)}>
                <span className={css(styles.redirectHeader)}>
                    Already have an account?
                    <button
                        className={css(styles.authSwitchButton)}
                        onClick={showLogin}
                        disabled={loading}
                    >
                        Sign in
                    </button>
                </span>
            </div>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    'Signup-container': {
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
    successContainer: {
        fontFamily: 'Inter, sans-serif',
        fontSize: '1rem',
        padding: '40px 20px',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '350px',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        '@media (max-width: 432px)': {
            width: '300px',
        },
    },
    successMessage: {
        color: '#059669',
        fontSize: '1.125rem',
        fontWeight: '500',
        marginBottom: '1rem',
    },
    redirectMessage: {
        color: '#6B7280',
        fontSize: '0.875rem',
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

Signup.propTypes = {
    showLogin: PropTypes.func.isRequired,
    signup: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.string,
    message: PropTypes.string,
    clearAuthMessage: PropTypes.func,
};

const mapStateToProps = (state) => ({
    message: state.auth.get('message'),
    loading: state.auth.get('loading'),
    error: state.auth.get('error'),
});

const mapDispatchToProps = {
    signup,
    clearAuthMessage,
};

const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);
const LoggedSignup = WithLogging(ConnectedSignup);

export { LoggedSignup as Signup };
