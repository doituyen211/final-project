package org.green.education.service;

import lombok.RequiredArgsConstructor;
import org.green.core.model.CoreResponse;
import org.green.education.dto.AttendanceDetailDTO;
import org.green.education.dto.AttendanceSumDTO;
import org.green.education.repository.IAttendanceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AttendanceService implements IAttendanceService {
    private final IAttendanceRepository attendanceRepository;
    @Override
    public CoreResponse<?> getSumAttendanceByClassIdAndStudentId(int classId, int studentId) {
        List<AttendanceSumDTO> attendanceSumDTOList = attendanceRepository.getAttendanceSummary(classId,studentId);
        return CoreResponse.builder()
                .message(!attendanceSumDTOList.isEmpty() ? "get sum attendance successfully" : "empty sum attendance")
                .data(attendanceSumDTOList)
                .code(HttpStatus.OK.value())
                .build();
    }

    @Override
    public CoreResponse<?> getAttendanceDetailByClassIdAndStudentIdAndSubjectId(int studentId, int classId, int subjectId) {
        List<AttendanceDetailDTO> attendanceDetailDTOList = attendanceRepository.getAttendanceDetailsBySubjectId(studentId,classId,subjectId);
        return CoreResponse.builder()
                .message(!attendanceDetailDTOList.isEmpty() ? "get attendance detail successfully" : "empty detail attendance")
                .data(attendanceDetailDTOList)
                .code(!attendanceDetailDTOList.isEmpty() ? HttpStatus.OK.value() : HttpStatus.NOT_FOUND.value())
                .build();
    }
}
