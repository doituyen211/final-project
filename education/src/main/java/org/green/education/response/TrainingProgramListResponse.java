package org.green.education.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.green.education.dto.ProgramDTO;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingProgramListResponse {
    @JsonProperty("program_list")
    private List<ProgramDTO> programDTOList;
    private int totalPage;
}
