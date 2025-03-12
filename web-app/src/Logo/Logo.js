import React, { Fragment } from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/logo.jpg';

function Logo() {
    return (
        <Fragment>
            <div className={css(styles['App-logo'])} id='App-logo'>
                <img src={logo} className={css(styles.headerLogo)} alt="logo"/>
            </div>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    'App-logo': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2',
    },
    headerLogo: {
        width: '50px',
        height: 'auto',
    },
});

export default Logo;
