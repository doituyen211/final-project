package org.green.education.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.green.education.dto.ClassDTO;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClassListResponse {
    @JsonProperty("class_list")
    private List<ClassDTO> classList;
    private int totalPages;
}
