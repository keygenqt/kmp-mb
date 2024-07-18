@file:Suppress("PropertyName")

// Common
val ktor_version: String by project
val serialization_version: String by project
// JVM
val exposed_version: String by project
val flywaydb_version: String by project
val HikariCP_version: String by project
val mysql_connector_version: String by project
val kotlinx_datetime_version: String by project
val jbcrypt_version: String by project

plugins {
    kotlin("multiplatform") version "2.0.0"
    kotlin("plugin.serialization") version "2.0.0"
}

group = "dev.mb.shared"
version = "0.0.1"

kotlin {
    js(IR) {
        moduleName = "shared"
        binaries.library()
        nodejs()
    }
    jvm {
        withJava()
        compilations {
            val main = getByName("main")
            tasks {
                register<Jar>("buildFatJar") {
                    group = "application"
                    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
                    dependsOn(build)
                    from(configurations.getByName("jvmRuntimeClasspath").map { if (it.isDirectory) it else zipTree(it) }, main.output.classesDirs)
                    archiveBaseName.set("${project.name}-jvm-fat")
                }
            }
        }
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

        jvmMain.dependencies {
            // orm
            implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
            implementation("org.jetbrains.exposed:exposed-dao:$exposed_version")
            implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
            // db
            implementation("org.mindrot:jbcrypt:$jbcrypt_version")
            implementation("mysql:mysql-connector-java:$mysql_connector_version")
            implementation("com.zaxxer:HikariCP:$HikariCP_version")
            implementation("org.flywaydb:flyway-core:$flywaydb_version")
            implementation("org.flywaydb:flyway-mysql:$flywaydb_version")
            implementation("org.jetbrains.kotlinx:kotlinx-datetime:$kotlinx_datetime_version")
        }
    }
}

tasks.register("serverLib") {
    dependsOn("buildFatJar")
    doLast {
        copy {
            from(layout.buildDirectory.dir("libs/shared-jvm-fat-$version.jar"))
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

