package com.vti.be.form;

import lombok.Data;

@Data
public class ChangePasswordForm {
    private String email;
    private String oldPassword;
    private String newPassword;
    private String token;
}
