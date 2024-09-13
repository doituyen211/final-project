package org.green.education.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.green.education.dto.SubjectDto;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubjectListResponse {
    @JsonProperty("subject_list")
    private List<SubjectDto> subjectList;
    private int totalPages;
}
