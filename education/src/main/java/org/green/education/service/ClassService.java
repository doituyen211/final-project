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

@Service
public class ClassService implements IClassService {
    @Autowired
    ClassRepository classRepository;

    @Autowired
    ITrainingProgramRepository trainingProgramRepository;

    @Override
    public List<ClassDTO> getClassList() {
        List<Class> classList = classRepository.findAll();
        List<ClassDTO> classDTOList = new ArrayList<>();
        for (Class item : classList) {
            ClassDTO classDTO = new ClassDTO();
            classDTO.setTrainingProgramName(item.getProgram().getProgramName());
            classDTO.setClassName(item.getClassName());
            classDTO.setClassSize(item.getClassSize());
            classDTO.setStartDate(item.getStartDate());
            classDTO.setEndDate(item.getEndDate());
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

        try {
            TrainingProgram trainingProgram = trainingProgramRepository.findById(classForm.getProgramId())
                    .orElseThrow(() -> new Exception("k tim thay"));

            Class mclass = new Class();
            mclass.setClassName(classForm.getClassName());
            mclass.setClassSize(classForm.getClassSize());
            mclass.setStartDate(classForm.getStartDate());
            mclass.setEndDate(classForm.getEndDate());
            mclass.setProgram(trainingProgram);
            classRepository.save(mclass);

            return classForm;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

}
