package org.green.education.service;

import org.green.education.dto.StudentDTO;
import org.green.education.entity.Student;
import org.green.education.repository.IStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService implements IStudentService {

    @Autowired
    private IStudentRepository iStudentRepository;

    @Override
    public List<StudentDTO> getAllStudents() {
        List<Student> studentList = iStudentRepository.findAll();
        List<StudentDTO> studentDTOList = new ArrayList<>();
        for (Student student : studentList) {
            StudentDTO studentDTO = new StudentDTO();
            studentDTO.setId(student.getId());
            studentDTO.setFullName(student.getFullName());
            studentDTO.setEmail(student.getEmail());
            studentDTO.setAddress(student.getAddress());
            studentDTO.setFacebookLink(student.getFacebookLink());
            studentDTO.setDateOfBirth(student.getDateOfBirth());
            studentDTO.setLearningGoal(student.getLearningGoal());

            studentDTOList.add(studentDTO);
        }
        return studentDTOList;
    }
}
