package org.green.education.service;
import jakarta.validation.Valid;
import org.green.core.model.CoreResponse;
import org.green.education.form.TrainingProgramForm;
public interface ITrainingProgramService {
    CoreResponse<?> getAllTrainingPrograms(String searchText, int page, int limit);

    CoreResponse<?> getClassesByTrainingProgramId(int trainingProgramId, int page, int limit);

    CoreResponse<?> getSubjectsByTrainingProgramId(int trainingProgramId, int page, int limit);

    CoreResponse<?> addTrainingProgram(@Valid TrainingProgramForm trainingProgramForm);

    CoreResponse<?> updateTrainingProgram(int trainingProgramId,TrainingProgramForm trainingProgramForm);

    CoreResponse<?> deleteTrainingProgram(int trainingProgramId);

    CoreResponse<?> getAllTrainingPrograms();

//    CoreResponse<?> searchTrainingProgram(String searchText, int page, int limit);

}
