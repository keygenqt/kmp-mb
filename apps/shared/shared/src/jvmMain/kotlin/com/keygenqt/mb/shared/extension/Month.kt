package com.keygenqt.mb.shared.extension

import kotlinx.datetime.*

fun Month.getFirstDayTimeMillis() = LocalDateTime(
    year = Clock.System.now().toLocalDateTime(TimeZone.UTC).year,
    month = this,
    dayOfMonth = 1,
    hour = 0,
    minute = 0,
    second = 0,
    nanosecond = 0
)
    .toInstant(UtcOffset.ZERO)
    .toEpochMilliseconds()
