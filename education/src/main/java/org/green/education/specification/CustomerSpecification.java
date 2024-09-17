package org.green.education.specification;

import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.green.education.entity.Student;
import org.green.education.entity.Subject;
import org.green.education.form.SubjectFilterForm;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class CustomerSpecification {
    public static Specification<Student> buildSpec(SubjectFilterForm form) {
        return (root, query, builder) -> {
            if (form == null) {
                return null;
            }
            List<Predicate> predicates = new ArrayList<>();

            // Search By Name
            if (StringUtils.hasText(form.getSearch())) {
                String pattern = "%" + form.getSearch().trim() + "%";
                Path<String> name = root.get("fullName");
                Predicate hasNameLike = builder.like(name, pattern);
                predicates.add(hasNameLike);
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
