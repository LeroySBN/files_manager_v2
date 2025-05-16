package ke.leroybuliro.apps.domain

data class File (
    val fileId: String,
    val userId: String,
    val name: String,
    val type: String,
    val isPublic: Boolean,
    val parentId: String,
)
