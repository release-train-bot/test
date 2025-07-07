package com.example.multiplatform.app

import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavHostController
import com.example.multiplatform.app.presentation.AppMutableState
import com.example.multiplatform.app.presentation.AppState
import com.example.multiplatform.app.presentation.AppViewModel
import com.example.multiplatform.common.common
import com.example.multiplatform.home.home
import com.example.multiplatform.platform.platform
import org.koin.core.module.dsl.singleOf
import org.koin.core.module.dsl.viewModelOf
import org.koin.dsl.bind
import org.koin.dsl.module
import shared.presentation.theme.DefaultThemeState
import shared.presentation.theme.ThemeConfig
import shared.presentation.theme.ThemeState
import shared.presentation.ui.theme.DsThemes

fun NavGraphBuilder.app(navController: NavHostController) {
    platform(navController)
    common(navController)
    home(navController)
}

val app = module {
    includes(
        platform,
        common,
        home
    )
    viewModelOf(::AppViewModel)
    singleOf(::AppMutableState).bind<AppState>()
    single<ThemeState> {
        DefaultThemeState(
            defaultConfig = ThemeConfig(
                defaultTheme = DsThemes.Light,
                lightTheme = DsThemes.Light,
                darkTheme = DsThemes.Dark,
            )
        )
    }
}
