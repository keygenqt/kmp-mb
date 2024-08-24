package com.keygenqt.mb.interfaces

/**
 * Interface for check validate ids
 */
interface IdValidate {
    val id: Int?
    val type: Any?
}

/**
 * Create data for validate
 */
data class IdDataValidate(
    override val id: Int?,
    override val type: Any?
) : IdValidate
