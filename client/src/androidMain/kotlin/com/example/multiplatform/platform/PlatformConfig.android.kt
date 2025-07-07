package com.example.multiplatform.platform

import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavHostController
import com.example.multiplatform.Application
import org.koin.dsl.module

actual fun NavGraphBuilder.platform(navController: NavHostController) {
}

actual val platform = module {
}