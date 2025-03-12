import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import addIcon from "../assets/add_white.png"
import homeIcon from "../assets/home_black.png";
import fileIcon from "../assets/folder_black.png";
import photoIcon from "../assets/photo_black.png";
import sharedIcon from "../assets/folder_shared_black.png";

export default function NavigationPane({}) {
    return (
        <div className={css(styles.navigationPane)}>
            <div className={css(styles["navigationPaneAdd"])} >
                <img className={css(styles.navigationItemLogo)} src={addIcon} alt="logo"/>
                <p className={css(styles.navigationItemTitle)}>Add new</p>
            </div>
            <div className={css(styles.navigationPaneRow)}>
                <img className={css(styles.navigationItemLogo)} src={homeIcon} alt="logo"/>
                <p className={css(styles.navigationItemTitle)}>Home</p>
            </div>
            <div className={css(styles.navigationPaneRow)}>
                <img className={css(styles.navigationItemLogo)} src={fileIcon} alt="logo"/>
                <p className={css(styles.navigationItemTitle)}>My files</p>
            </div>
            <div className={css(styles.navigationPaneRow)}>
                <img className={css(styles.navigationItemLogo)} src={photoIcon} alt="logo"/>
                <p className={css(styles.navigationItemTitle)}>Photos</p>
            </div>
            <div className={css(styles.navigationPaneRow)}>
                <img className={css(styles.navigationItemLogo)} src={sharedIcon} alt="logo"/>
                <p className={css(styles.navigationItemTitle)}>Shared</p>
            </div>
        </div>
    );
};

const styles = StyleSheet.create({
    navigationPane: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "1em 2em 0 0",
        gap: "14px",
        '@media (max-width: 432px)': {
            padding: "1em 0.7em 0 0",
        },
    },
    navigationPaneRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        gap: '10px',
        cursor: "pointer",
        paddingLeft: "0.5em",
    },
    navigationPaneAdd: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        gap: '10px',
        backgroundColor: "#3d85c6",
        borderRadius: "28px",
        padding: "0 1em",
        cursor: "pointer",
        '@media (max-width: 432px)': {
            borderRadius: "50&",
            padding: "0.7em",
        },
    },
    navigationItemLogo: {
        height: "24px",
        width: "24px",
    },
    navigationItemTitle: {
        fontSize: "0.9rem",
        color: "#000000",
        '@media (max-width: 432px)': {
            display: "none",
        },
    }
})
