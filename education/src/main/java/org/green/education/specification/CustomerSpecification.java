package org.green.education.specification;

import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.green.education.entity.Student;
import org.green.education.form.CustomerFilterForm;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CustomerSpecification {

    public static Specification<Student> buildSpec(CustomerFilterForm form) {
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

            // Filter by Status
            if (StringUtils.hasText(form.getStatus())) {
                Path<String> status = root.get("status");
                Predicate hasStatus = builder.equal(status, form.getStatus());
                predicates.add(hasStatus);
            }
//
//            // Filter by Date Range (fromDate to toDate)
//            if (form.getFromDate() != null && form.getToDate() != null) {
//                Path<Date> createdAt = root.get("createdAt");
//                Predicate betweenDates = builder.between(createdAt, form.getFromDate(), form.getToDate());
//                predicates.add(betweenDates);
//            } else if (form.getFromDate() != null) {
//                Path<Date> createdAt = root.get("createdAt");
//                Predicate afterDate = builder.greaterThanOrEqualTo(createdAt, form.getFromDate());
//                predicates.add(afterDate);
//            } else if (form.getToDate() != null) {
//                Path<Date> createdAt = root.get("createdAt");
//                Predicate beforeDate = builder.lessThanOrEqualTo(createdAt, form.getToDate());
//                predicates.add(beforeDate);
//            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
