package org.green.education.service;

import org.green.education.dto.StudentDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IStudentService {

    List<StudentDTO> getAllStudents();
}
