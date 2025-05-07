package ke.leroybuliro.apps

import ke.leroybuliro.apps.platform.getPlatform

class Greeting {
    private val platform = getPlatform()

    fun greet(): String {
        return "Hello, ${platform.name}!"
    }
}