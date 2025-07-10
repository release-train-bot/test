import androidx.compose.ui.window.ComposeViewport
import com.example.multiplatform.app.presentation.App
import org.jetbrains.skiko.wasm.onWasmReady

fun main() = onWasmReady {
    ComposeViewport("viewPort") {
        App()
    }
}