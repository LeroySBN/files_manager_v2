package ke.leroybuliro.apps.presentation.file_list

import ke.leroybuliro.apps.domain.File

data class FileListState(
    val documentList: List<File> = emptyList(),
    val collectionList: List<File> = emptyList(),
    val selectedTabIndex: Int = 0,
    val isLoading: Boolean = false,
    val error: String? = null
)
