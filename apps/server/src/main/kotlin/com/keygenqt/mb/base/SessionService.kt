/*
 * Copyright 2023-2024 Vitaliy Zarubin
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
package com.keygenqt.mb.base

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.interfaces.Payload
import com.keygenqt.mb.shared.db.base.DatabaseMysql
import com.keygenqt.mb.shared.db.entities.UserEntity
import com.keygenqt.mb.shared.db.entities.Users
import com.keygenqt.mb.shared.extension.expiresAt
import com.keygenqt.mb.shared.extension.toText
import com.keygenqt.mb.shared.responses.UserRole
import kotlinx.datetime.DateTimeUnit
import org.jetbrains.exposed.sql.and

class SessionService(
    private val db: DatabaseMysql,
    secret: String?,
) {
    companion object {
        val claimId = Users.id.name
        val claimRoles = Users.roles.name
    }

    private val issuer = "ktor.io"

    private val algorithm by lazy {
        if (secret != null) {
            Algorithm.HMAC512(secret)
        } else {
            throw RuntimeException("Error load secret")
        }
    }

    private val verifier: JWTVerifier = JWT
        .require(algorithm)
        .withIssuer(issuer)
        .build()

    /**
     * Generate token
     */
    fun generateToken(
        userId: Int,
        roles: List<UserRole>,
    ): String = JWT.create()
        .withSubject("Authentication")
        .withClaim(claimId, userId)
        .withClaim(claimRoles, roles.toText())
        .withIssuer(issuer)
        .withExpiresAt(System.currentTimeMillis().expiresAt(DateTimeUnit.WEEK))
        .sign(algorithm)

    /**
     * Get user by id
     */
    suspend fun findAuthUser(userId: Int, roles: List<UserRole>) = db.transaction {
        UserEntity
            .find { (Users.id eq userId) and (Users.roles eq roles.toText()) }
            .firstOrNull()
    }

    /**
     * Verify refresh token with get user ID
     */
    fun verify(value: String): Payload? = verifier.verify(value)
}
