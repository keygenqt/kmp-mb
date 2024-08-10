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
package com.keygenqt.mb.shared.interfaces

import com.keygenqt.mb.shared.db.base.DatabaseMysql
import org.jetbrains.exposed.sql.Transaction
import org.jetbrains.exposed.sql.transactions.TransactionManager

@Suppress("UNCHECKED_CAST")
interface IService<T> {
    val db: DatabaseMysql

    suspend fun <R> transaction(query: T.() -> R) = db.transaction {
        query.invoke(this as T)
    }

    suspend fun <R> transactionRaw(query: T.(Transaction) -> R) = db.transaction {
        query.invoke(this as T, TransactionManager.current())
    }
}
