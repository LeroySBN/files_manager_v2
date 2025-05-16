package ke.leroybuliro.apps.presentation.file_list

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

class FileListViewModel: ViewModel() {
    private val _state = MutableStateFlow(FileListState())
    val state: StateFlow<FileListState> = _state.asStateFlow()

    fun onAction(action: FileListAction) {
        when (action) {
            is FileListAction.OnFileClick -> {
                _state.update {
                    it.copy()
                }
            }
            is FileListAction.OnTabSelected -> {
                _state.update {
                    it.copy(selectedTabIndex = action.index)
                }
            }
        }
    }
}