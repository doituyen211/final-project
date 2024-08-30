package org.green.education.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.green.education.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class EmailNotExistValidator   implements ConstraintValidator<EmailNotExist,String> {
    @Autowired
    private IAccountRepository repository ;

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return !repository.existsByEmail(email);    }

}
