package com.vti.be.form;

import com.vti.be.entity.Account;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AuthRegisterForm {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Account.Role role;
}
