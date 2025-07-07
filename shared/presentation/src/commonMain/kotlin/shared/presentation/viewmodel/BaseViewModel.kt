package shared.presentation.viewmodel

import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.Stable
import androidx.compose.runtime.snapshots.Snapshot
import androidx.compose.ui.platform.LocalLifecycleOwner
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.compose.LocalViewModelStoreOwner
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kotlin.coroutines.CoroutineContext

/**
 * Abstract class representing a ViewModel with lifecycle-aware coroutine launching capabilities.
 *
 * https://www.jetbrains.com/help/kotlin-multiplatform-dev/compose-lifecycle.html#viewmodel-implementation
 * https://github.com/Kotlin/kotlinx.coroutines/blob/master/ui/coroutines-guide-ui.md
 */
@Immutable
abstract class BaseViewModel : ViewModel() {

    private val jobs = mutableMapOf<String, Job>()
    private var initialized = false

    /**
     * Take a MutableSnapshot and run block within it on the main thread.
     */
    protected fun withState(block: () -> Unit) {
        viewModelScope.launch(Dispatchers.Main.immediate) {
            Snapshot.withMutableSnapshot(block)
        }
    }

    /**
     * Launches a coroutine in the main thread context.
     *
     * @param id The identifier for the coroutine job.
     * @param block The block of code to execute as a coroutine.
     */
    protected fun ui(
        id: String,
        block: suspend CoroutineScope.() -> Unit
    ) {
        launch(
            id = id,
            block = block,
            context = Dispatchers.Main,
        )
    }

    /**
     * Launches a coroutine in the IO thread context.
     *
     * @param id The identifier for the coroutine job.
     * @param force Force new execution despite any existing is in progress.
     * @param block The block of code to execute as a coroutine.
     */
    protected fun async(
        id: String,
        force: Boolean = false,
        block: suspend CoroutineScope.() -> Unit
    ) {
        launch(
            id = id,
            force = force,
            block = block,
            context = Dispatchers.Default
        )
    }

    private fun launch(
        id: String,
        force: Boolean = false,
        context: CoroutineContext,
        block: suspend CoroutineScope.() -> Unit
    ) {
        val job = jobs[id]
        when {
            force -> {
                job?.cancel()
                jobs[id] = viewModelScope.launch(context = context, block = block)
            }

            job == null || job.isCompleted -> {
                jobs[id] = viewModelScope.launch(context = context, block = block)
            }

            else -> Unit
        }
    }

    /**
     * Lifecycle-aware method called when initializing the ViewModel.
     */
    protected open fun doInit() = Unit

    /**
     * Lifecycle-aware method called when binding the ViewModel to a view.
     */
    @Composable
    protected open fun DoBind() = Unit

    /**
     * Lifecycle-aware method called when binding the ViewModel to a view.
     */
    protected open fun doBind() = Unit

    /**
     * Lifecycle-aware method called when the ViewModel is resumed.
     */
    protected open fun doResume() = Unit

    /**
     * Lifecycle-aware method called when the ViewModel is paused.
     */
    protected open fun doPause() = Unit

    /**
     * Lifecycle-aware method called when disposing the ViewModel.
     */
    protected open fun doDispose() = Unit

    /**
     * Binds the ViewModel to the current Composable lifecycle.
     */
    @Composable
    fun bind() {
        DoBind()
        val owner = LocalLifecycleOwner.current
        LaunchedEffect(owner) {
            if (!initialized) {
                initialized = true
                doInit()
            }
            doBind()
            var initialRequest = true
            owner.lifecycle.currentStateFlow.collect { state ->
                when (state) {
                    Lifecycle.State.RESUMED -> {
                        if (!initialRequest) {
                            doResume()
                        }
                        initialRequest = false
                    }

                    Lifecycle.State.STARTED -> {
                        if (!initialRequest) {
                            doPause()
                        }
                    }

                    else -> Unit
                }
            }
        }
    }

    override fun onCleared() {
        doDispose()
    }

}
