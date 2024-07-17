/*
 * Copyright 2023 Vitaliy Zarubin
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
package com.keygenqt.mb.shared.db.service

import com.keygenqt.mb.shared.db.base.DatabaseMysql
import com.keygenqt.mb.shared.db.entities.UploadEntity
import com.keygenqt.mb.shared.db.entities.Uploads
import com.keygenqt.mb.shared.interfaces.IService
import io.ktor.http.*

class UploadsService(
    override val db: DatabaseMysql
) : IService<UploadsService> {

    /**
     * Delete by [Uploads.fileName]
     */
    fun deleteByFileName(
        fileName: String
    ) {
        val upload = UploadEntity
            .find { (Uploads.fileName eq fileName) }
            .firstOrNull()

        if (upload != null) {
            // @todo
            // CategoryUploads.deleteWhere { CategoryUploads.upload eq upload.id }
            upload.delete()
        }
    }

    /**
     * Create entity
     */
    fun insert(
        fileName: String,
        contentType: ContentType,
        originalFileName: String
    ) = UploadEntity.new {
        this.fileName = fileName
        this.fileMime = contentType.toString()
        this.originalFileName = originalFileName
        this.createAt = System.currentTimeMillis()
    }
}
