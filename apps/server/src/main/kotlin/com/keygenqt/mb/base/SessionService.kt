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
import com.keygenqt.mb.shared.db.base.DatabaseMysql
import com.keygenqt.mb.shared.db.entities.UserEntity
import com.keygenqt.mb.shared.db.entities.Users
import com.keygenqt.mb.shared.db.entities.toGuestResponse
import org.jetbrains.exposed.exceptions.ExposedSQLException
import java.util.*

class SessionService(
    private val db: DatabaseMysql,
    secret: String?,
) {

    private val claim = Users.id.name

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
        timestamp: Long = System.currentTimeMillis()
    ): String = JWT.create()
        .withSubject("Authentication")
        .withClaim(claim, userId)
        .withIssuer(issuer)
        .withExpiresAt(Date(timestamp.expiresAt()))
        .sign(algorithm)

    /**
     * Get user by id
     */
    suspend fun findUserById(userId: Int) = db.transaction {
        try {
            UserEntity.findById(userId)?.toGuestResponse()
        } catch (ex: ExposedSQLException) {
            null
        }
    }

    /**
     * Verify refresh token with get user ID
     */
    fun verify(value: String): Int? = verifier.verify(value).getClaim(claim).asInt()

    /**
     * (24 hours) * 30 days
     */
    private fun Long.expiresAt() = (this + 3_600_000 * 24) * 30
}
