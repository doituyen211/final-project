    package org.green.education.service;

    import jakarta.transaction.Transactional;
    import org.green.education.entity.Grade;
    import org.green.education.entity.Reserved;
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
        public Reserved findReserveByStudentId(int studentId) {
            Optional<Reserved> result = iReserveRepository.findById(studentId);

            Reserved reserved = null;

            if(result.isPresent()){

                reserved = result.get();
            }else{
                throw new RuntimeException("Did not find reserve by studentId :" + studentId);
            }

            return reserved;

        }

        @Override
        @Transactional
        public Reserved save(Reserved reserved) {
            if (reserved.getStudent() != null) {
                if (!iReserveRepository.existsById(reserved.getStudent().getId())) {
                    throw new RuntimeException("Referenced Student does not exist");
                }
            }
            if (reserved.getSubject() != null) {
                if (!iReserveRepository.existsById(reserved.getSubject().getSubjectId())) {
                    throw new RuntimeException("Referenced Subject does not exist");
                }
            }
            return iReserveRepository.save(reserved);
        }

        @Override
        @Transactional
        public void deleteById(int studentId) {
            iReserveRepository.deleteById(studentId);
        }

        @Override
        @Transactional
        public Reserved updateReserved(int studentId, Reserved reserved) {

            Reserved tempReserve = iReserveRepository.findById(studentId).orElseThrow(()-> new RuntimeException("Reserved not found"));

            if (reserved.getStudent() != null) {
                if (!iReserveRepository.existsById(reserved.getStudent().getId())) {
                    throw new RuntimeException("Referenced Student does not exist");
                }
            }
            if (reserved.getSubject() != null) {
                if (!iReserveRepository.existsById(reserved.getSubject().getSubjectId())) {
                    throw new RuntimeException("Referenced Subject does not exist");
                }
            }

            tempReserve.setStudent(reserved.getStudent());
            tempReserve.setStartTime(reserved.getStartTime());
            tempReserve.setEndTime(reserved.getEndTime());
            tempReserve.setSubject(reserved.getSubject());
            tempReserve.setStatus(reserved.getStatus());

            return iReserveRepository.save(tempReserve);
        }
    }
