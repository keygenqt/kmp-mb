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
package com.keygenqt.mb.shared.extension

import com.keygenqt.mb.shared.db.entities.UploadEntity
import com.keygenqt.mb.shared.utils.ConstantsMime.toMime
import java.io.File
import java.util.*

/**
 * Create upload from data for migrate
 */
fun String.createFileUpload(): UploadEntity? {
    val file = File(this)
    return if (file.isFile) {
        val upload = UploadEntity.new {
            this.fileName = "${UUID.randomUUID()}.${file.extension}"
            this.fileMime = file.extension.toMime()
            this.originalFileName = this@createFileUpload.substringAfterLast('/')
            this.createAt = System.currentTimeMillis()
        }
        file.copyTo(File("uploads/${upload.fileName}"))
        upload
    } else null
}
