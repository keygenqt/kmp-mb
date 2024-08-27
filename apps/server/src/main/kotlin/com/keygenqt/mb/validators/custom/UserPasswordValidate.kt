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

import com.keygenqt.mb.base.Exceptions
import com.keygenqt.mb.base.SessionService
import com.keygenqt.mb.extension.getUserRoles
import com.keygenqt.mb.shared.db.entities.toResponse
import com.keygenqt.mb.shared.db.service.UsersService
import com.keygenqt.mb.shared.responses.UserRole
import com.keygenqt.mb.validators.models.UserValidate
import io.ktor.server.application.*
import jakarta.validation.Constraint
import jakarta.validation.ConstraintValidator
import jakarta.validation.ConstraintValidatorContext
import jakarta.validation.Payload
import kotlinx.coroutines.runBlocking
import org.koin.java.KoinJavaComponent.inject
import org.koin.ktor.ext.inject
import kotlin.reflect.KClass

@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
@Constraint(validatedBy = [ValidPasswordValidator::class])
@MustBeDocumented
annotation class UserPasswordValidate(
    val message: String = "Error validate password",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = []
)

class ValidPasswordValidator : ConstraintValidator<UserPasswordValidate?, UserValidate?> {
    val field = "password"

    override fun initialize(constraintAnnotation: UserPasswordValidate?) {}

    override fun isValid(user: UserValidate?, context: ConstraintValidatorContext): Boolean {
        if (user == null) {
            return true
        }
        val usersService: UsersService by inject(UsersService::class.java)
        val isCheck = runBlocking {
            user.id == null || usersService.transaction {
                findById(user.id)?.paswd.isNullOrEmpty()
            }
        }
        if (isCheck) {
            // Password only for MANAGER/ADMIN
            if (!(user.roles.contains(UserRole.MANAGER) || user.roles.contains(UserRole.ADMIN)) && user.password != null) {
                context
                    .apply { disableDefaultConstraintViolation() }
                    .buildConstraintViolationWithTemplate("Password can be specified for MANAGER and ADMIN roles")
                    .addPropertyNode(field).addConstraintViolation()
                return false
            }
            // Password for MANAGER/ADMIN required
            if ((user.roles.contains(UserRole.MANAGER) || user.roles.contains(UserRole.ADMIN)) && user.password == null) {
                context
                    .apply { disableDefaultConstraintViolation() }
                    .buildConstraintViolationWithTemplate("For users with the MANAGER and ADMIN roles, a password is required")
                    .addPropertyNode(field).addConstraintViolation()
                return false
            }
        }
        return true
    }
}
