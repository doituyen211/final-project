package com.green.api.service;

import com.green.api.form.AuthRegisterForm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface IAuthService {
    void create(AuthRegisterForm form);

    UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;
}
