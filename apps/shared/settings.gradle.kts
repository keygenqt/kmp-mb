@file:Suppress("UnstableApiUsage")

rootProject.name = "dev.mb.shared"
include(":shared")

pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}

dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}
