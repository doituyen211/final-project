package org.green.education.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamScheduleListResponse {
    @JsonProperty("examschedule_list")
    private List<?> examschedule_list;
    private int totalPages;
}
