/*
 * Copyright 2024 Vitaliy Zarubin
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.keygenqt.mb.routing.guest

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.html.*
import io.ktor.server.routing.*
import kotlinx.html.*

fun Route.guestHome() {
    get("/") {
        call.respondHtml(HttpStatusCode.OK) {
            head {
                title {
                    +"API - Mobile Broadcast"
                }
                link(rel = "icon", href = "/static/images/favicon.ico", type = "text/css")
                link(rel = "stylesheet", href = "/static/css/common.css", type = "text/css")
                meta(name = "viewport", content = "width=device-width, initial-scale=1")
            }
            body {
                div("Table") {
                    div("Table-Row") {
                        div("Table-Cell") {
                            div("Content") {
                                div("Box") {
                                    div("Table") {
                                        div("Table-Row") {
                                            div("Table-Cell BoxData") {
                                                div("Title") {
                                                    +"API for "
                                                    span { +"M" }
                                                    +"obile Broadcast"
                                                }
                                                img(src = "/static/images/image.png")
                                                div("Text") {
                                                    +"Server providing REST API for Mobile Broadcast project applications. Basic information on the project can be found on the project website."
                                                }
                                                a(href = "https://mb.keygenqt.com", classes = "Btn") {
                                                    +"Go to WebSite"
                                                }
                                            }
                                            div("Table-Cell BoxImage") {
                                                img(src = "/static/images/image.png")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    div("Table-Row") {
                        div("Table-Cell") {
                            style = "height: 1px"
                            div("Footer") {
                                div("Box") {
                                    +"© Mobile Broadcast 2024"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
