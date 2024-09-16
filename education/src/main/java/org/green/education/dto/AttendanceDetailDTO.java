package org.green.education.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
//dto nay su dung cho ca nhan student , thang nao dong vao tao cat chim
public class AttendanceDetailDTO {
    private LocalDateTime attendanceDate;
    private String status;
    private String note;
}
