import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import { StyleSheet, css } from 'aphrodite';
import addIcon from "../assets/add_white.png"
import homeIcon from "../assets/home_black.png";
import fileIcon from "../assets/folder_black.png";
import photoIcon from "../assets/photo_black.png";
import sharedIcon from "../assets/folder_shared_black.png";
import WithLogging from "../HOC/WithLogging";
import {dashboardSwitch} from "../actions/uiActions";

const NavigationPaneRow = ({ icon, title, isFocus, onClick }) => {
    const rowStyles = [
        styles.navigationPaneRow,
        isFocus && styles.navigationPaneFocus
    ];

    return (
        <div className={css(rowStyles)} onClick={onClick}>
            <img className={css(styles.navigationItemLogo)} src={icon} alt={title}/>
            <p className={css(styles.navigationItemTitle)}>{title}</p>
        </div>
    );
};

function NavigationPane({paneFocus, dashboardSwitch}) {
    const handleRowClick = (focus) => {
        dashboardSwitch(focus);
    };

    return (
        <div className={css(styles.navigationPane)}>
            <div className={css(styles["navigationPaneAdd"])} >
                <img className={css(styles.navigationItemLogo)} src={addIcon} alt="logo"/>
                <p className={css(styles.navigationItemTitle)}>Add new</p>
            </div>
            <NavigationPaneRow
                icon={homeIcon}
                title="Home"
                isFocus={paneFocus === "Home"}
                onClick={() => handleRowClick("Home")}
            />
            <NavigationPaneRow
                icon={fileIcon}
                title="My Files"
                isFocus={paneFocus === "My Files"}
                onClick={() => handleRowClick("My Files")}
            />
            <NavigationPaneRow
                icon={photoIcon}
                title="Photos"
                isFocus={paneFocus === "Photos"}
                onClick={() => handleRowClick("Photos")}
            />
            <NavigationPaneRow
                icon={sharedIcon}
                title="Shared"
                isFocus={paneFocus === "Shared"}
                onClick={() => handleRowClick("Shared")}
            />
        </div>
    );
}

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
        borderLeft: "4px solid transparent",
        ':hover': {
            borderLeft: "4px solid #696969",
        }
    },
    navigationPaneFocus: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        gap: '10px',
        cursor: "pointer",
        paddingLeft: "0.5em",
        borderLeft: "4px solid #3d85c6",
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

NavigationPane.propTypes = {
    paneFocus: PropTypes.string.isRequired,
    dashboardSwitch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    paneFocus: state.ui.get('dashboardFocus'),
});

const mapDispatchToProps = {
    dashboardSwitch,
};

const ConnectedNavigationPane = connect(mapStateToProps, mapDispatchToProps)(NavigationPane);
const LoggedNavigationPane = WithLogging(ConnectedNavigationPane);

export { LoggedNavigationPane as NavigationPane };
