package org.green.education.specification;

import org.green.education.entity.Course;
import org.green.education.entity.Subject;
import org.green.education.form.CourseFilterForm;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.green.education.form.SubjectFilterForm;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class CourseSpecification {

    public static Specification<Course> buildSpec(CourseFilterForm form) {
        return (root, query, builder) -> {
            if (form == null) {
                return null;
            }
            List<Predicate> predicates = new ArrayList<>();

            // Search By Name
            if (StringUtils.hasText(form.getSearch())) {
                String pattern = "%" + form.getSearch().trim() + "%";
                Path<String> name = root.get("courseName");
                Predicate hasNameLike = builder.like(name, pattern);
                predicates.add(hasNameLike);
            }


            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
