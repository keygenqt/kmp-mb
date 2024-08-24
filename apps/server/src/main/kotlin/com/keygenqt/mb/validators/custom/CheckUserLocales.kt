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
package com.keygenqt.mb.validators.custom

import com.keygenqt.mb.shared.responses.Locale
import com.keygenqt.mb.validators.models.UserLocaleValidate
import jakarta.validation.Constraint
import jakarta.validation.ConstraintValidator
import jakarta.validation.ConstraintValidatorContext
import jakarta.validation.Payload
import kotlin.reflect.KClass

@Target(AnnotationTarget.FIELD)
@MustBeDocumented
@Constraint(validatedBy = [CheckUserLocalesValidator::class])
@Suppress("unused")
annotation class CheckUserLocales(
    val message: String = "All locales of the model must be specified",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = []
)

class CheckUserLocalesValidator : ConstraintValidator<CheckUserLocales, Any?> {
    override fun isValid(value: Any?, context: ConstraintValidatorContext?): Boolean {
        if (value == null) {
            return false
        }
        if (value is List<*>) {
            if (value.isEmpty()) {
                return false
            }
            if (value.size != Locale.entries.size) {
                return false
            }
            return value
                .mapNotNull { it as? UserLocaleValidate }
                .mapNotNull { if (Locale.entries.contains(it.locale)) true else null }
                .size == Locale.entries.size
        }
        return false
    }
}
