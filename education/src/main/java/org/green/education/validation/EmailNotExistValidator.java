package com.green.api.validation;

import com.green.api.repository.IAccountRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class EmailNotExistValidator   implements ConstraintValidator<EmailNotExist,String> {
    @Autowired
    private IAccountRepository repository ;

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return !repository.existsByEmail(email);    }

}
