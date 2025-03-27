import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {css, StyleSheet} from 'aphrodite';
import FileListRow from "./FileListRow";
import {connect} from "react-redux";
import WithLogging from "../HOC/WithLogging";
import {List} from "immutable";
import { fetchFilesAction } from '../actions/fileActions';
import { fileSelector } from '../selectors/fileSelector';

function FileList({ fileList, fetchFilesAction, dashboardFocus }) {
    useEffect(() => {
        fetchFilesAction();
    }, [fetchFilesAction]);

    return (
        <table id="FileList" className={css(styles.fileTable)}>
            <thead>
            <FileListRow
                textFirstCell="Name"
                textSecondCell="Type"
                textThirdCell="Sharing"
                isHeader={true}
            />
            </thead>
            <tbody>
            {fileList && fileList.size > 0 ? (
                fileList.map((file) => (
                    <FileListRow
                        key={file.get('id')}
                        textFirstCell={file.get('name')}
                        textSecondCell={file.get('type')}
                        textThirdCell={file.get('isPublic') ? 'Public' : 'Private'}
                    />
                ))
            ) : (
                <FileListRow
                    textFirstCell="No Files available yet"
                    textSecondCell={null}
                    textThirdCell=""
                    isHeader={false}
                />
            )}
            </tbody>
        </table>
    );
}

const styles = StyleSheet.create({
  fileTable: {
    marginTop: "2em",
    width: "100%",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
    margin: "auto",
  },
})

FileList.propTypes = {
    fileList: PropTypes.instanceOf(List).isRequired,
    fetchFilesAction: PropTypes.func.isRequired,
    dashboardFocus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    fileList: fileSelector(state, state.ui.get('dashboardFocus')),
    dashboardFocus: state.ui.get('dashboardFocus'),
});

const mapDispatchToProps = {
    fetchFilesAction,
};

const ConnectedFileList = connect(mapStateToProps, mapDispatchToProps)(FileList);
const LoggedFileList = WithLogging(ConnectedFileList);

export { LoggedFileList as FileList };
