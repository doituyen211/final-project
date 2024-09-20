package org.green.education.form;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.green.education.entity.Account;
import org.green.education.validation.EmailNotExist;

@Getter
@Setter
public class AccountCreateForm {
    @NotBlank(message = "{AccountForm.email.NotBlank}")
    @EmailNotExist(message = "Email is not exist!")
    private String email;
    @NotBlank(message = "{AccountForm.password.NotBlank }")
    private String password;
    private String firstName;
    private String username;
    private String lastName;
    @NotEmpty(message = "Role is not Blank!")
    private Account.Role role;
    @Pattern(regexp = "ENABLED|BLOCKED|DENIED", message = "Role is Invalid!")
    private String status;


}
