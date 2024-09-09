    package org.green.education.service;

    import jakarta.transaction.Transactional;
    import org.green.education.entity.LeaveOfAbsence;
    import org.green.education.repository.ILeaveOfAbsenceRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.Optional;


    @Service
    public class LeaveOfAbsenceService implements ILeaveOfAbsenceService {

        private ILeaveOfAbsenceRepository iLeaveOfAbsenceRepository;

        @Autowired
        public LeaveOfAbsenceService(ILeaveOfAbsenceRepository theILeaveOfAbsenceRepository){
            this.iLeaveOfAbsenceRepository = theILeaveOfAbsenceRepository;
        }

        @Override
        public LeaveOfAbsence findReserveByStudentId(int studentId) {
            Optional<LeaveOfAbsence> result = iLeaveOfAbsenceRepository.findById(studentId);

            LeaveOfAbsence leaveOfAbsence = null;

            if(result.isPresent()){

                leaveOfAbsence = result.get();
            }else{
                throw new RuntimeException("Did not find reserve by studentId :" + studentId);
            }

            return leaveOfAbsence;

        }

        @Override
        @Transactional
        public LeaveOfAbsence save(LeaveOfAbsence leaveOfAbsence) {
            if (leaveOfAbsence.getStudent() != null) {
                if (!iLeaveOfAbsenceRepository.existsById(leaveOfAbsence.getStudent().getId())) {
                    throw new RuntimeException("Referenced Student does not exist");
                }
            }
            if (leaveOfAbsence.getSubject() != null) {
                if (!iLeaveOfAbsenceRepository.existsById(leaveOfAbsence.getSubject().getSubjectId())) {
                    throw new RuntimeException("Referenced Subject does not exist");
                }
            }
            return iLeaveOfAbsenceRepository.save(leaveOfAbsence);
        }

        @Override
        @Transactional
        public void deleteById(int studentId) {
            iLeaveOfAbsenceRepository.deleteById(studentId);
        }

        @Override
        @Transactional
        public LeaveOfAbsence updateReserved(int studentId, LeaveOfAbsence leaveOfAbsence) {

            LeaveOfAbsence tempReserve = iLeaveOfAbsenceRepository.findById(studentId).orElseThrow(()-> new RuntimeException("Reserved not found"));

            if (leaveOfAbsence.getStudent() != null) {
                if (!iLeaveOfAbsenceRepository.existsById(leaveOfAbsence.getStudent().getId())) {
                    throw new RuntimeException("Referenced Student does not exist");
                }
            }
            if (leaveOfAbsence.getSubject() != null) {
                if (!iLeaveOfAbsenceRepository.existsById(leaveOfAbsence.getSubject().getSubjectId())) {
                    throw new RuntimeException("Referenced Subject does not exist");
                }
            }

            tempReserve.setStudent(leaveOfAbsence.getStudent());
            tempReserve.setStartTime(leaveOfAbsence.getStartTime());
            tempReserve.setEndTime(leaveOfAbsence.getEndTime());
            tempReserve.setSubject(leaveOfAbsence.getSubject());
            tempReserve.setStatus(leaveOfAbsence.getStatus());

            return iLeaveOfAbsenceRepository.save(tempReserve);
        }
    }
