@file:Suppress("PropertyName")

val ktor_version: String by project
val serialization_version: String by project

plugins {
    kotlin("multiplatform") version "2.0.0"
    kotlin("plugin.serialization") version "2.0.0"
}

group = "dev.mb.shared"
version = "0.0.1"

kotlin {
    jvm()
    js(IR) {
        moduleName = "shared"
        binaries.library()
        nodejs()
    }

    sourceSets {
        commonMain.dependencies {
            implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:$serialization_version")
            implementation("io.ktor:ktor-serialization-kotlinx-json:$ktor_version")
            implementation("io.ktor:ktor-client-content-negotiation:$ktor_version")
        }

        jsMain.dependencies {
            implementation("io.ktor:ktor-client-js:$ktor_version")
        }
    }
}

tasks.register("serverLib") {
    dependsOn("jvmJar")
    doLast {
        copy {
            from(layout.buildDirectory.dir("libs/shared-jvm-$version.jar"))
            into("${rootProject.rootDir}/../server/libs")
        }
    }
}

tasks.register("reactLib") {
    dependsOn("jsNodeProductionLibraryDistribution")
    doLast {
        copy {
            from(layout.buildDirectory.dir("dist/js/productionLibrary"))
            into("${rootProject.rootDir}/../admin-panel/libs/shared")
        }
        copy {
            from(layout.buildDirectory.dir("dist/js/productionLibrary"))
            into("${rootProject.rootDir}/../website/libs/shared")
        }
    }
}

