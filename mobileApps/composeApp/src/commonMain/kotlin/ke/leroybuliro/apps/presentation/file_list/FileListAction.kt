package ke.leroybuliro.apps.presentation.file_list

interface FileListAction {
    object OnFileClick : FileListAction
    data class OnTabSelected(val index: Int) : FileListAction
}
