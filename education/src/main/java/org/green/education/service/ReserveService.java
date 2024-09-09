    package org.green.education.service;

    import jakarta.transaction.Transactional;
    import org.green.education.entity.LeaveOfAbsence;
    import org.green.education.repository.IReserveRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.Optional;


    @Service
    public class ReserveService implements IReserveService{

        private IReserveRepository iReserveRepository;

        @Autowired
        public ReserveService (IReserveRepository theIReserveRepository){
            this.iReserveRepository=theIReserveRepository;
        }

        @Override
        public LeaveOfAbsence findReserveByStudentId(int studentId) {
            Optional<LeaveOfAbsence> result = iReserveRepository.findById(studentId);

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
                if (!iReserveRepository.existsById(leaveOfAbsence.getStudent().getId())) {
                    throw new RuntimeException("Referenced Student does not exist");
                }
            }
            if (leaveOfAbsence.getSubject() != null) {
                if (!iReserveRepository.existsById(leaveOfAbsence.getSubject().getSubjectId())) {
                    throw new RuntimeException("Referenced Subject does not exist");
                }
            }
            return iReserveRepository.save(leaveOfAbsence);
        }

        @Override
        @Transactional
        public void deleteById(int studentId) {
            iReserveRepository.deleteById(studentId);
        }

        @Override
        @Transactional
        public LeaveOfAbsence updateReserved(int studentId, LeaveOfAbsence leaveOfAbsence) {

            LeaveOfAbsence tempReserve = iReserveRepository.findById(studentId).orElseThrow(()-> new RuntimeException("Reserved not found"));

            if (leaveOfAbsence.getStudent() != null) {
                if (!iReserveRepository.existsById(leaveOfAbsence.getStudent().getId())) {
                    throw new RuntimeException("Referenced Student does not exist");
                }
            }
            if (leaveOfAbsence.getSubject() != null) {
                if (!iReserveRepository.existsById(leaveOfAbsence.getSubject().getSubjectId())) {
                    throw new RuntimeException("Referenced Subject does not exist");
                }
            }

            tempReserve.setStudent(leaveOfAbsence.getStudent());
            tempReserve.setStartTime(leaveOfAbsence.getStartTime());
            tempReserve.setEndTime(leaveOfAbsence.getEndTime());
            tempReserve.setSubject(leaveOfAbsence.getSubject());
            tempReserve.setStatus(leaveOfAbsence.getStatus());

            return iReserveRepository.save(tempReserve);
        }
    }
