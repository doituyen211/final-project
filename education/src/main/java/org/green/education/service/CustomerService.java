package org.green.education.service;

import org.green.education.dto.CustomerDto;
import org.green.education.dto.SubjectDto;
import org.green.education.entity.Student;
import org.green.education.entity.Subject;
import org.green.education.form.SubjectFilterForm;
import org.green.education.repository.IStudentRepository;
import org.green.education.repository.ITrainingProgramRepository;
import org.green.education.specification.CustomerSpecification;
import org.green.education.specification.SubjectSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ITrainingProgramRepository programRepository ;
    @Autowired
    private IStudentRepository studentRepository ;
    @Autowired
    private ModelMapper mapper ;

    @Override
    public ResponseEntity<?> findALL(SubjectFilterForm form, int page, int pageSize,
                                     String sortDir, String sortBy) {

        //searc
        Specification<Student> spec = CustomerSpecification.buildSpec(form) ;

        //Sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending() ;

        //Paging
        Pageable pageable = PageRequest.of(page,pageSize,sort) ;

        Page<Student> customers = studentRepository.findAll(spec,pageable) ;

        Map<String, Object> response = new HashMap<>();
        response.put("page",page);
        response.put("pageSize",pageSize) ;
        response.put("totalPages",customers.getTotalPages()) ;
        response.put("totalElements",customers.getTotalElements()) ;
        response.put("content", customers.getContent().stream().map(customer -> {
            CustomerDto customerDto = mapper.map(customer, CustomerDto.class) ;
            customerDto.setProgramInterestId(customer.getProgramId());
            return customerDto ;
        }  ).toList() );
//
        return ResponseEntity.ok("ok") ;

    }
}
