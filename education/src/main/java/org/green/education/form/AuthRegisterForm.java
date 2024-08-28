package org.green.education.form;

import lombok.Getter;
import lombok.Setter;
import org.green.education.entity.Account;


@Getter
@Setter
public class AuthRegisterForm {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Account.Role role;
}
