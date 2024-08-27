package org.green.core.util;

import com.google.gson.reflect.TypeToken;
import org.green.core.model.CoreResponse;
import com.google.gson.Gson;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiToObject {
    private static final HttpClient httpClient = HttpClient.newHttpClient();
    private static final Gson gson = new Gson();
    public static <T> Object apiTransferObject(String apiUrl, Object commonObject, Class<T> clazz) {
        try {
            // Convert the commonObject to JSON
            String json = gson.toJson(commonObject);

            // Build the HTTP request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            // Send the request and get the response
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            // Check if the response code indicates success
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                // Parse the response body into CoreResponse<T>
                Type type = TypeToken.getParameterized(CoreResponse.class, clazz).getType();
                return gson.fromJson(response.body(), type);
            } else {
                // Handle non-successful response
                System.out.println("Failed with HTTP error code: " + response.statusCode());
                return null;
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }
}
