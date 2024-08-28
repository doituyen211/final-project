package com.vti.be.form;


import com.vti.be.entity.Account;
import com.vti.be.validation.EmailNotExist;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class AccountCreateForm {
    @NotBlank(message = "{AccountForm.email.NotBlank}")
    @EmailNotExist(message = "Email is not exist!")
    private String email;
    @NotBlank(message = "{AccountForm.password.NotBlank }")
    private String password;
    private String firstName;
    private String lastName;
    @NotEmpty(message = "Role is not Blank!")
    private Account.Role role;
    @Pattern(regexp = "ENABLED|BLOCKED|DENIED", message = "Role is Invalid!")
    private String status;


}
