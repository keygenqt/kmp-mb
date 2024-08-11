package com.keygenqt.mb.shared.db.service

import com.keygenqt.mb.shared.db.base.DatabaseMysql
import com.keygenqt.mb.shared.interfaces.IService
import com.keygenqt.mb.shared.requests.StatisticViewPage
import com.keygenqt.mb.shared.responses.DataKeyValueResponse
import com.keygenqt.mb.shared.responses.DataKeyValuesResponse
import com.keygenqt.mb.shared.responses.DataValueResponse
import kotlinx.datetime.Month
import org.jetbrains.exposed.sql.Transaction


class RawService(
    override val db: DatabaseMysql
) : IService<RawService> {

    /**
     * Get count of visits to page by type
     */
    fun Transaction.getCountPageView(
        page: StatisticViewPage
    ): DataValueResponse = run {
        val count = exec(
            """
            SELECT COUNT(StatisticView.pageHash) as `count`
            FROM StatisticView
            WHERE 
                StatisticView.pageKey = ${page.ordinal}
            ;
            """.trimIndent()
        ) { rs ->
            while (rs.next()) {
                return@exec rs.getInt("count")
            }
        }
        return DataValueResponse(value = count?.toString()?.toIntOrNull() ?: 0)
    }

    /**
     * Get count of visits to registration pages
     */
    fun Transaction.getCountPageRegs(): DataValueResponse = run {
        val count = exec(
            """
            SELECT COUNT(StatisticView.pageHash) as `count`
            FROM StatisticView
            WHERE
                StatisticView.pageKey = ${StatisticViewPage.REG_EXPERT.ordinal}
                OR
                StatisticView.pageKey = ${StatisticViewPage.REG_PARTNER.ordinal}
                OR
                StatisticView.pageKey = ${StatisticViewPage.REG_ORGANIZER.ordinal}
            ;
            """.trimIndent()
        ) { rs ->
            while (rs.next()) {
                return@exec rs.getInt("count")
            }
        }
        return DataValueResponse(value = count?.toString()?.toIntOrNull() ?: 0)
    }

    /**
     * Get top view community page
     */
    fun Transaction.getTopCommunityIDs(): DataKeyValuesResponse = run {
        val values = mutableListOf<DataKeyValueResponse>()
        exec(
            """
            SELECT StatisticView.pageID, COUNT(StatisticView.pageID) as `count`
            FROM StatisticView
            WHERE
                StatisticView.pageID IS NOT NULL
                AND
                StatisticView.pageKey = ${StatisticViewPage.CITY.ordinal}
            GROUP BY StatisticView.pageID
            ORDER BY `count` 
            DESC LIMIT 5;
            """.trimIndent()
        ) { rs ->
            while (rs.next()) {
                values.add(
                    DataKeyValueResponse(
                        key = rs.getString("pageID"),
                        value = rs.getInt("count"),
                    )
                )
            }
        }
        return DataKeyValuesResponse(
            values = values.toTypedArray()
        )
    }

    /**
     * Get view pages by months
     */
    fun Transaction.getActivityByMonths(): DataKeyValuesResponse = run {
        val values = mutableListOf<DataKeyValueResponse>()
        val result = mutableListOf<DataKeyValueResponse>()
        exec(
            """
                SELECT COUNT(StatisticView.pageHash) as `count`, MONTH(FROM_UNIXTIME(StatisticView.createAt/1000)) as `month`
                FROM StatisticView
                GROUP BY `month`
                ORDER BY `month` ;
                """.trimIndent()
        ) { rs ->
            while (rs.next()) {
                result.add(
                    DataKeyValueResponse(
                        key = Month.of(rs.getInt("month")).name,
                        value = rs.getInt("count"),
                    )
                )
            }
        }
        for (month in Month.entries) {
            val data = result.firstOrNull { it.key == month.name }
            if (data != null) {
                values.add(data)
            } else {
                values.add(
                    DataKeyValueResponse(
                        key = month.name,
                        value = 0,
                    )
                )
            }
        }
        return DataKeyValuesResponse(
            values = values.toTypedArray()
        )
    }
}
