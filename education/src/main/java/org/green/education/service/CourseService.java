package org.green.education.service;

import org.green.education.dto.CourseDto;
import org.green.education.entity.Course;
import org.green.education.form.CourseFilterForm;
import org.green.education.repository.ICourseRepository;
import org.green.education.repository.ITrainingProgramRepository;
import org.green.education.specification.CourseSpecification;
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
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service

public class CourseService implements ICourseService {

    @Autowired
    private ICourseRepository courseRepository ;
    @Autowired
    private ITrainingProgramRepository programRepository ;
    @Autowired
    private ModelMapper mapper ;

    @Override
    @Transactional
    public ResponseEntity<?> create(CourseDto courseDto) {
        Course course = mapper.map(courseDto, Course.class);

        courseRepository.save(course);

        return ResponseEntity.ok("Add successful!");
    }

    @Override
    public ResponseEntity<?> findALL(CourseFilterForm form, int page, int pageSize,
                                     String sortDir, String sortBy) {
        // Convert page number from 1-based to 0-based
        int zeroBasedPage = page - 1;

        // Search
        Specification<Course> spec = CourseSpecification.buildSpec(form);

        // Sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();

        // Paging
        Pageable pageable = PageRequest.of(zeroBasedPage, pageSize, sort);

        // Fetch the data
        Page<Course> courses = courseRepository.findAll(spec, pageable);

        // Prepare the response
        Map<String, Object> response = new HashMap<>();
        response.put("page", page); // Keep the original page number for the response
        response.put("pageSize", pageSize);
        response.put("totalPages", courses.getTotalPages());
        response.put("totalElements", courses.getTotalElements());
        response.put("content", courses.getContent().stream().map(course -> {
            CourseDto courseDto = mapper.map(course, CourseDto.class);
            return courseDto;
        }).toList());

        return ResponseEntity.ok(response);
    }
    @Override
    public ResponseEntity<?> findnoALL(CourseFilterForm form, String sortDir, String sortBy) {
        // Search
        Specification<Course> spec = CourseSpecification.buildSpec(form);

        // Sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        // Find all courses without pagination
        List<Course> courses = courseRepository.findAll(spec, sort);

        // Map the courses to DTOs
        List<CourseDto> courseDtos = courses.stream().map(course -> {
            CourseDto courseDto = mapper.map(course, CourseDto.class);
            return courseDto;
        }).toList();

        // Create response map
        Map<String, Object> response = new HashMap<>();
        response.put("totalElements", courses.size());
        response.put("content", courseDtos);

        return ResponseEntity.ok(response);
    }
    @Override
    public ResponseEntity<?> findById(Integer id) {
        Optional<Course> optionalCourse = courseRepository.findById(id);
        CourseDto courseDto = mapper.map(optionalCourse.get(), CourseDto.class);
        return ResponseEntity.ok(courseDto);
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateById(Integer id, CourseDto courseDto) {
        Optional<Course> optionalCourse = courseRepository.findById(id);
        Course course = optionalCourse.get();
        mapper.map(courseDto, course);

        courseRepository.save(course);

        return ResponseEntity.ok("Update successful!");
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteById(Integer id) {
        if (courseRepository.findById(id).isEmpty()) {
            System.out.println("Cannot find by Id: "+id); // log ra loi , thay bang logger
        }
        courseRepository.deleteById(id);
        return ResponseEntity.ok("Delete successful!") ;
    }
}
