package org.green.education.form;

import lombok.Data;

@Data
public class ChangePasswordForm {
    private String email;
    private String oldPassword;
    private String newPassword;
    private String token;
}
