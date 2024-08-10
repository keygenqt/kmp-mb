package com.keygenqt.mb.shared.db.service

import com.keygenqt.mb.shared.db.base.DatabaseMysql
import com.keygenqt.mb.shared.interfaces.IService
import com.keygenqt.mb.shared.requests.StatisticViewPage
import com.keygenqt.mb.shared.responses.DataValueResponse
import com.keygenqt.mb.shared.responses.DataKeyValueResponse
import com.keygenqt.mb.shared.responses.DataKeyValuesResponse
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
            return@exec 0
        }
        return@run DataValueResponse(value = (count ?: 0).toString())
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
            return@exec 0
        }
        return@run DataValueResponse(value = (count ?: 0).toString())
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
                values.add(DataKeyValueResponse(
                    key = rs.getInt("pageID").toString(),
                    value = rs.getInt("count").toString(),
                ))
            }
        }
        return@run DataKeyValuesResponse(
            values = values.toTypedArray()
        )
    }
}
