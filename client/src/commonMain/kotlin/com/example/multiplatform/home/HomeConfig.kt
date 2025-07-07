package com.example.multiplatform.home

import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavHostController
import androidx.navigation.compose.composable
import com.example.multiplatform.home.presentation.HomeRoute
import com.example.multiplatform.home.presentation.HomeScreen
import com.example.multiplatform.home.presentation.HomeViewModel
import org.koin.core.module.dsl.viewModelOf
import org.koin.dsl.module

fun NavGraphBuilder.home(navController: NavHostController) {
    composable<HomeRoute> { HomeScreen() }
}

val home = module {
    viewModelOf(::HomeViewModel)
}
