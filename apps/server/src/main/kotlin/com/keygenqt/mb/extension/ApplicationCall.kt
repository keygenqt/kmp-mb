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
package com.keygenqt.mb.extension

import com.keygenqt.mb.base.Exceptions
import io.ktor.server.application.*
import io.ktor.server.request.*
import jakarta.validation.Validation

/**
 * Get value from params with validate
 */
fun ApplicationCall.getNumberParam(key: String = "id"): Int = parameters[key]
    ?.toIntOrNull() ?: throw Exceptions.NotFound()

/**
 * Get value from params with validate
 */
fun ApplicationCall.getStringParam(key: String = "name"): String = parameters[key]
    ?: throw throw Exceptions.NotFound()

/**
 * Get value from params with validate
 */
infix fun ApplicationCall.getQueryParam(key: String) =
    request.queryParameters[key] ?: throw throw Exceptions.NotFound()

/**
 * Get value from params with validate
 */
fun ApplicationCall.getNumbersQueryParam(key: String = "ids") =
    request.queryParameters.entries().find { it.key == key }?.value?.mapNotNull { it.toIntOrNull() }
        ?: throw throw Exceptions.NotFound()

/**
 * Get value from params with validate
 */
fun ApplicationCall.getDoublesQueryParam(key: String = "ids") =
    request.queryParameters.entries().find { it.key == key }?.value?.mapNotNull { it.toDoubleOrNull() }
        ?: throw throw Exceptions.NotFound()

/**
 * Get request with validate
 */
suspend inline fun <reified T : Any> ApplicationCall.receiveValidate(): T {
    val request = try {
        receive<T>()
    } catch (ex: Exception) {
        throw Exceptions.BadRequest()
    }

    val validate = Validation.buildDefaultValidatorFactory().validator.validate(request)

    if (validate.isEmpty()) {
        return request
    } else {
        throw Exceptions.UnprocessableEntity(validate)
    }
}
