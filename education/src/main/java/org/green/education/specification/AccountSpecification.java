package org.green.education.specification;

import jakarta.persistence.criteria.Predicate;
import org.green.education.entity.Account;
import org.green.education.form.AccountFilterForm;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class AccountSpecification {
    public static Specification<Account> buildSpec (AccountFilterForm form) {
        return (root, query, builder) -> {
            if (form == null) {
                return null;
            }
            List<Predicate> predicates = new ArrayList<>() ;

            return  builder.and(predicates.toArray(new Predicate[0])) ;
        };
    }
}
