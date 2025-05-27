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
            {/*<NavigationPaneRow*/}
            {/*    icon={fileIcon}*/}
            {/*    title="My Files"*/}
            {/*    isFocus={paneFocus === "My Files"}*/}
            {/*    onClick={() => handleRowClick("My Files")}*/}
            {/*/>*/}
            {/*<NavigationPaneRow*/}
            {/*    icon={photoIcon}*/}
            {/*    title="Photos"*/}
            {/*    isFocus={paneFocus === "Photos"}*/}
            {/*    onClick={() => handleRowClick("Photos")}*/}
            {/*/>*/}
            {/*<NavigationPaneRow*/}
            {/*    icon={photoIcon}*/}
            {/*    title="Videos"*/}
            {/*    isFocus={paneFocus === "Videos"}*/}
            {/*    onClick={() => handleRowClick("Videos")}*/}
            {/*/>*/}
            <NavigationPaneRow
                icon={sharedIcon}
                title="Shared"
                isFocus={paneFocus === "Shared"}
                onClick={() => handleRowClick("Shared")}
            />
            <div className={css(styles["navigationPaneHeader"])} >
                <p className={css(styles.navigationItemTitle)}>Collections</p>
            </div>
            <NavigationPaneRow
                icon={fileIcon}
                title="Albums"
                isFocus={paneFocus === "Albums"}
                onClick={() => handleRowClick("Albums")}
            />
            <NavigationPaneRow
                icon={fileIcon}
                title="Shelves"
                isFocus={paneFocus === "Shelves"}
                onClick={() => handleRowClick("Shelves")}
            />
        </div>
    );
}

const styles = StyleSheet.create({
    navigationPane: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "1rem 2rem 0 0",
        gap: "14px",
        '@media (max-width: 676px)': {
            padding: "1rem 0.7rem 0 0",
            alignItems: "center",
        },
    },
    navigationPaneRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        gap: '10px',
        cursor: "pointer",
        paddingLeft: "0.5rem",
        borderLeft: "4px solid transparent",
        ':hover': {
            borderLeft: "4px solid #696969",
        },
        '@media (max-width: 676px)': {
            flexDirection: "column",
            justifyContent: "center",
            gap: "7px",
            padding: "1rem",
            border: "0",
            borderRadius: "1rem",
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
        '@media (max-width: 676px)': {
            flexDirection: "column",
            justifyContent: "center",
            gap: "7px",
            padding: "1rem",
            border: "0",
            borderRadius: "1rem",
            backgroundColor: "#3D85C66B",
        }
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
        '@media (max-width: 676px)': {
            borderRadius: "50&",
            padding: "0.7em",
            navigationPaneTitle: {
                display: "none",
            }
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
            fontSize: "0.7rem",
        },
    },
    navigationPaneHeader: {
        fontSize: "0.9rem",
        color: "#000000",
        marginTop: "1.5rem",
        paddingLeft: "1rem",
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
