package org.green.education.service;

import org.green.education.dto.ClassDTO;
import org.green.education.dto.ClassMemberDTO;
import org.green.education.entity.Class;
import org.green.education.entity.TrainingProgram;
import org.green.education.form.ClassForm;
import org.green.education.repository.ClassRepository;
import org.green.education.repository.ITrainingProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClassService implements IClassService {
    @Autowired
    ClassRepository classRepository;

    @Autowired
    ITrainingProgramRepository trainingProgramRepository;

    @Override
    public Class getClassById(int classId) {
        return classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học nào với id " + classId));
    }

    @Override
    public List<ClassDTO> getClassList() {
        List<Class> classList = classRepository.findAll();
        List<ClassDTO> classDTOList = new ArrayList<>();

        for (Class classItem : classList) {
            ClassDTO classDTO = new ClassDTO();
            classDTO.setTrainingProgramName(classItem.getProgram().getProgramName());
            classDTO.setClassName(classItem.getClassName());
            classDTO.setClassSize(classItem.getClassSize());
            classDTO.setStartDate(classItem.getStartDate());
            classDTO.setEndDate(classItem.getEndDate());

            classDTOList.add(classDTO);
        }

        return classDTOList;
    }

    @Override
    public List<ClassMemberDTO> getStudentByClassId(int classId) {
        return classRepository.getListStudentByClassId(classId);
    }

    @Override
    public ClassForm createClass(ClassForm classForm) {
        TrainingProgram trainingProgram = trainingProgramRepository.findById(classForm.getProgramId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chương trình đào tạo với id là " + classForm.getProgramId()));

        Class newClass = new Class();

        newClass.setClassName(classForm.getClassName());
        newClass.setClassSize(classForm.getClassSize());
        newClass.setStartDate(classForm.getStartDate());
        newClass.setEndDate(classForm.getEndDate());
        newClass.setProgram(trainingProgram);

        classRepository.save(newClass);

        return classForm;
    }

    @Override
    public ClassForm editClass(int classId, ClassForm classForm) {
        Class presentClass = classRepository.findById(classId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lớp học nào với id " + classId));

        TrainingProgram trainingProgram = trainingProgramRepository.findById(classForm.getProgramId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chương trình đào tạo với id là " + classForm.getProgramId()));


        presentClass.setProgram(trainingProgram);
        presentClass.setClassName(classForm.getClassName());
        presentClass.setClassSize(classForm.getClassSize());
        presentClass.setStartDate(classForm.getStartDate());
        presentClass.setEndDate(classForm.getEndDate());

        classRepository.save(presentClass);

        return classForm;
    }

}

