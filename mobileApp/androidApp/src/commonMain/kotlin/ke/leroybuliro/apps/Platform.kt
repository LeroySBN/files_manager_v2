package ke.leroybuliro.apps

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform