import androidx.compose.ui.window.CanvasBasedWindow
import com.example.multiplatform.app.presentation.App
import org.jetbrains.skiko.wasm.onWasmReady

fun main() = onWasmReady {
    CanvasBasedWindow(canvasElementId = "appTarget") {
        App()
    }
}