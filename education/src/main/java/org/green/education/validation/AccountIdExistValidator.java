package org.green.education.validation;


import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.green.education.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class AccountIdExistValidator  implements ConstraintValidator<AccountIdExist,Integer> {
    @Autowired
    private IAccountRepository repository ;
    @Override
    public boolean isValid(Integer id, ConstraintValidatorContext context) {
        return repository.existsById(id);
    }
}
