package org.green.education.specification;

import org.green.education.entity.Subject;
import org.green.education.form.SubjectFilterForm;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class SubjectSpecification {
    public static Specification<Subject> buildSpec(SubjectFilterForm form) {
        return (root, query, builder) -> {
            if (form == null) {
                return null;
            }
            List<Predicate> predicates = new ArrayList<>();

            // Search By Name
            if (StringUtils.hasText(form.getSearch())) {
                String pattern = "%" + form.getSearch().trim() + "%";
                Path<String> name = root.get("subjectName");
                Predicate hasNameLike = builder.like(name, pattern);
                predicates.add(hasNameLike);
            }

            // Search By Status
            if (form.getStatus() != null) {
                Path<Integer> status = root.get("status");
                Predicate hasStatusEqual = builder.equal(status, form.getStatus());
                predicates.add(hasStatusEqual);
            }

            // Search By Program
            if (form.getProgram() != null) {
                Path<Integer> programId = root.get("trainingProgram").get("programId");
                Predicate hasProgramIdEqual = builder.equal(programId, form.getProgram());
                predicates.add(hasProgramIdEqual);
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
