package mb.shared.service.impl

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import mb.shared.models.ExpertModel

class GetRequest(private val client: HttpClient) {
    @Throws(Exception::class)
    suspend fun experts(): List<ExpertModel> {
        return client.get("experts").body()
    }
}
