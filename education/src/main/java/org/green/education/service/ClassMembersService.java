package org.green.education.service;

import org.green.education.dto.ClassMembersDto;
import org.green.education.entity.ClassMembers;
import org.green.education.entity.TrainingProgram;
import org.green.education.form.ClassMembersFillterForm;
import org.green.education.repository.IClassMembersRepository;
import org.green.education.repository.ITrainingProgramRepository;
import org.green.education.specification.ClassMembersSpecification;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service

public class ClassMembersService implements IClassMembersService {

    @Autowired
    private IClassMembersRepository classMembersRepository ;
    @Autowired
    private ITrainingProgramRepository programRepository ;
    @Autowired
    private ModelMapper mapper ;

    @Override
    @Transactional
    public ResponseEntity<?> create(ClassMembersDto classMembersDto) {
        ClassMembers classMembers = mapper.map(classMembersDto, ClassMembers.class);

        classMembersRepository.save(classMembers);

        return ResponseEntity.ok("Add successful!");
    }

    @Override
    public ResponseEntity<?> findALL(ClassMembersFillterForm form , int page , int pageSize,
                                     String sortDir, String sortBy     ) {
        //search
        Specification<ClassMembers> spec = ClassMembersSpecification.buildSpec(form) ;

        //Sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending() ;

        //Paging
        Pageable pageable = PageRequest.of(page,pageSize,sort) ;

        Page<ClassMembers> classMembers = classMembersRepository.findAll(spec,pageable) ;

        Map<String, Object> response = new HashMap<>();
        response.put("page",page);
        response.put("pageSize",pageSize) ;
        response.put("totalPages",classMembers.getTotalPages()) ;
        response.put("totalElements",classMembers.getTotalElements()) ;
        response.put("content", classMembers.getContent().stream().map(classMember -> {
            ClassMembersDto classMembersDto = mapper.map(classMember, ClassMembersDto.class) ;
            return classMembersDto ;
        }  ).toList() );

        return ResponseEntity.ok(response) ;
    }
    @Override
    public ResponseEntity<?> findById(Integer id) {
        Optional<ClassMembers> optionalClassMembers = classMembersRepository.findById(id);
        if (optionalClassMembers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found.");
        }
        ClassMembersDto classMembersDto = mapper.map(optionalClassMembers.get(), ClassMembersDto.class);
        return ResponseEntity.ok(classMembersDto);
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateById(Integer id, ClassMembersDto classMembersDto) {
        Optional<ClassMembers> optionalClassMembers = classMembersRepository.findById(id);
        if (optionalClassMembers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found.");
        }

        ClassMembers classMembers = optionalClassMembers.get();
        mapper.map(classMembersDto, classMembers);

        classMembersRepository.save(classMembers);

        return ResponseEntity.ok("Update successful!");
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteById(Integer id) {
        if (classMembersRepository.findById(id).isEmpty()) {
            System.out.println("Cannot find by Id: "+id); // log ra loi , thay bang logger
        }
        classMembersRepository.deleteById(id);
        return ResponseEntity.ok("Delete successful!") ;
    }
}
