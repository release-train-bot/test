package com.example.multiplatform.app.presentation

import com.example.multiplatform.home.presentation.HomeRoute
import shared.presentation.theme.ThemeState
import shared.presentation.viewmodel.BaseViewModel

class AppViewModel(
    val state: AppState,
    val themeState: ThemeState
) : BaseViewModel() {

    override fun doBind() {
        withState {
            themeState.currentConfig = themeState.defaultConfig
            state.setStartDestination(HomeRoute)
        }
    }
}
