package org.green.education.service;
import lombok.RequiredArgsConstructor;
import org.green.core.model.CoreResponse;
import org.green.education.dto.ClassDTO;
import org.green.education.dto.ProgramDTO;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Class;
import org.green.education.entity.Course;
import org.green.education.entity.Subject;
import org.green.education.entity.TrainingProgram;
import org.green.education.form.TrainingProgramForm;
import org.green.education.repository.ClassRepository;
import org.green.education.repository.CourseRepository;
import org.green.education.repository.ISubjectRepository;
import org.green.education.repository.ITrainingProgramRepository;
import org.green.education.response.ClassListResponse;
import org.green.education.response.SubjectListResponse;
import org.green.education.response.TrainingProgramListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingProgramService implements ITrainingProgramService {
    private final ITrainingProgramRepository trainingProgramRepository;
    private final ClassRepository classRepository;
    private final ISubjectRepository subjectRepository;
    private final CourseRepository courseRepository;
    @Override
    public CoreResponse<?> getAllTrainingPrograms(String searchText, int page, int limit) {
        Page<TrainingProgram> trainingPrograms ;
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("programId").descending());
        if(searchText == null || searchText.trim().isEmpty()) {
            trainingPrograms = trainingProgramRepository.findAll(pageRequest);
        }else {
            trainingPrograms = trainingProgramRepository.findByProgramNameContainingIgnoreCase(searchText, pageRequest);
        }
        Page<ProgramDTO> programDTOs = trainingPrograms.map(trainingProgram -> new ProgramDTO().convertToProgramDTO(trainingProgram));
        TrainingProgramListResponse response = TrainingProgramListResponse.builder()
                .programDTOList(programDTOs.getContent())
                .totalPage(programDTOs.getTotalPages())
                .build();
        String message = trainingPrograms.isEmpty() ? "empty list" : "Get all training programs successfully";
        return CoreResponse.builder()
                .code(HttpStatus.OK.value())
                .message(message)
                .data(response)
                .build();
    }


    @Override
    public CoreResponse<?> getClassesByTrainingProgramId(int trainingProgramId, int page, int limit) {
        List<ClassDTO> classesDTO = new ArrayList<>();
        try {
            TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId).orElseThrow(() -> new Exception("Can't not find training program"));
            Pageable pageable = PageRequest.of(page, limit);
            Page<Class> classPage = classRepository.findByProgram(trainingProgram, pageable);
            for (Class thisClass : classPage.getContent()) {
                ClassDTO classDTO = ClassDTO.builder()
                        .trainingProgramName(trainingProgram.getProgramName())
                        .className(thisClass.getClassName())
                        .classSize(thisClass.getClassSize())
                        .startDate(thisClass.getStartDate())
                        .endDate(thisClass.getEndDate())
                        .build();
                classesDTO.add(classDTO);
            }
            ClassListResponse classListResponse = ClassListResponse.builder()
                    .data(classesDTO)
                    .totalPages(classPage.getTotalPages()).build();
            String message = classesDTO.isEmpty() ? "empty list" : "Get all classes successfully";
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .data(classListResponse)
                    .message( classesDTO.isEmpty() ? "empty list" : "Get all classes successfully")
                    .build();
        } catch (
                Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .data(null)
                    .message(e.getMessage())
                    .build();
        }

    }

    @Override
    public CoreResponse<?> getSubjectsByTrainingProgramId(int trainingProgramId, int page, int limit) {
        List<SubjectDto> subjectDtoList = new ArrayList<>();
        try {
            TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId).orElseThrow(() -> new Exception("Can't not find training program"));
            Pageable pageable = PageRequest.of(page, limit);
            Page<Subject> subjectPage = subjectRepository.findByTrainingProgram(trainingProgram, pageable);
            for (Subject thisSubject : subjectPage.getContent()) {
                SubjectDto subjectDto = SubjectDto.builder()
                        .subjectName(thisSubject.getSubjectName())
                        .trainingDuration(thisSubject.getTrainingDuration())
                        .status(thisSubject.getStatus())
                        .build();
                subjectDtoList.add(subjectDto);
            }
            SubjectListResponse subjectListResponse = SubjectListResponse.builder().subjectList(subjectDtoList).totalPages(subjectPage.getTotalPages()).build();
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .data(subjectListResponse)
                    .message(subjectDtoList.isEmpty() ? "empty list" : "Get all subjects successfully")
                    .build();
        } catch (
                Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.NOT_FOUND.value())
                    .data(null)
                    .message(e.getMessage())
                    .build();
        }
    }

    @Override
    public CoreResponse<?> addTrainingProgram( TrainingProgramForm trainingProgramForm) {
        try {

            Course course = courseRepository.findById(trainingProgramForm.getCourseId()).orElseThrow(() -> new Exception("Can't not find course"));
            TrainingProgram trainingProgram =  TrainingProgram.builder()
                    .course(course)
                    .programName(trainingProgramForm.getProgramName())
                    .status(true)
                    .tuitionFee(trainingProgramForm.getTuitionFee())
                    .trainingDuration(trainingProgramForm.getTrainingDuration())
                    .build();
            trainingProgramRepository.save(trainingProgram);
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("Added training program successfully")
                    .data(trainingProgramForm)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }

    @Override
    public CoreResponse<?> updateTrainingProgram(int trainingProgramId,TrainingProgramForm trainingProgramForm) {
        try {
            TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId).orElseThrow(() -> new Exception("Can't find training program"));
            Course course = courseRepository.findById(trainingProgramForm.getCourseId()).orElseThrow(() -> new Exception("Can't not find course"));
            trainingProgram.setCourse(course);
            trainingProgram.setProgramName(trainingProgramForm.getProgramName());
            trainingProgram.setTuitionFee(trainingProgramForm.getTuitionFee());
            trainingProgram.setTrainingDuration(trainingProgramForm.getTrainingDuration());
            trainingProgram.setStatus(trainingProgramForm.isStatus());
            trainingProgramRepository.save(trainingProgram);
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("updated training program successfully")
                    .data(trainingProgramForm)
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }

    @Override
    public CoreResponse<?> deleteTrainingProgram(int trainingProgramId) {
        try {
            TrainingProgram trainingProgram = trainingProgramRepository.findById(trainingProgramId).orElseThrow(() -> new Exception("Can't find training program"));
            trainingProgramRepository.delete(trainingProgram);
            return CoreResponse.builder()
                    .code(HttpStatus.OK.value())
                    .message("deleted training program successfully")
                    .build();
        } catch (Exception e) {
            return CoreResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .message(e.getMessage())
                    .build();
        }
    }

    @Override
    public CoreResponse<?> getAllTrainingPrograms() {
        List<TrainingProgram> trainingPrograms = trainingProgramRepository.findAll();
        List<ProgramDTO> programDTOList = new ArrayList<>();
        for (TrainingProgram trainingProgram : trainingPrograms) {
            ProgramDTO programDTO = ProgramDTO.builder()
                    .programName(trainingProgram.getProgramName())
                    .tuitionFee(trainingProgram.getTuitionFee())
                    .trainingDuration(trainingProgram.getTrainingDuration())
                    .status(trainingProgram.getStatus())
                    .id(trainingProgram.getProgramId())
                    .build();
            programDTOList.add(programDTO);
        }

        return CoreResponse.builder()
                .code(HttpStatus.OK.value())
                .message("get all training programs")
                .data(programDTOList)
                .build();
    }

}
