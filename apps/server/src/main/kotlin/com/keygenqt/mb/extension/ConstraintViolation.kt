package com.keygenqt.mb.extension

import com.keygenqt.mb.shared.responses.StateValidateResponse
import jakarta.validation.ConstraintViolation

/**
 * Create exception
 */
fun Set<ConstraintViolation<*>>.toResponse(): List<StateValidateResponse> {
    val result = mutableListOf<StateValidateResponse>()
    forEach {
        val field = it.propertyPath.toString()
        val error = it.message

        val model = result
            .find { item -> item.filed == field }
            ?.let { er -> er.copy(errors = er.errors + listOf(error)) }
            ?: StateValidateResponse(filed = field, errors = arrayOf(error))

        result.removeIf { er -> er.filed == field }
        result.add(model)
    }
    return result
}
