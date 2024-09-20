package org.green.education.specification;

import org.green.education.entity.ClassMembers;
import org.green.education.form.ClassMembersFillterForm;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class ClassMembersSpecification {

    public static Specification<ClassMembers> buildSpec(ClassMembersFillterForm form) {
        return (root, query, builder) -> {
            if (form == null) {
                return null;
            }
            List<Predicate> predicates = new ArrayList<>();

//            if (StringUtils.hasText(form.getSearch())) {
//                String pattern = "%" + form.getSearch().trim() + "%";
//                Path<String> name = root.get("classId");
//                Predicate hasNameLike = builder.like(name, pattern);
//                predicates.add(hasNameLike);
//            }
            // Search By Name
            if (StringUtils.hasText(form.getSearch())) {
                try {
                    // Chuyển đổi chuỗi thành số nguyên
                    Integer searchValue = Integer.parseInt(form.getSearch().trim());

                    // Lấy thuộc tính classId là kiểu Integer
                    Path<Integer> classId = root.get("classId");

                    // So sánh bằng giá trị tìm kiếm
                    Predicate hasClassIdEqual = builder.equal(classId, searchValue);
                    predicates.add(hasClassIdEqual);
                } catch (NumberFormatException e) {
                    // Xử lý trường hợp chuỗi không thể chuyển thành số nguyên
                    // Ví dụ: ghi log hoặc bỏ qua không thêm predicate
                    e.printStackTrace();
                }
            }

            // Search By Status
            if (form.getStatus() != null) {
                Path<Integer> status = root.get("status");
                Predicate hasStatusEqual = builder.equal(status, form.getStatus());
                predicates.add(hasStatusEqual);
            }

            if (form.getClassid() != null) {
                Path<Integer> classId = root.get("classId");
                Predicate hasClassidEqual = builder.equal(classId, form.getClassid());
                predicates.add(hasClassidEqual);
            }

            if (form.getStudentid() != null) {
                Path<Integer> studentId = root.get("studentId");
                Predicate hasStudentidEqual = builder.equal(studentId, form.getStudentid());
                predicates.add(hasStudentidEqual);
            }

            return builder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
