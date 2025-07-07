package com.example.multiplatform

import android.app.Application as AndroidApplication

class Application : AndroidApplication() {

    override fun onCreate() {
        ref = this
        super.onCreate()
    }

    companion object {
        lateinit var ref: Application
            private set
    }
}