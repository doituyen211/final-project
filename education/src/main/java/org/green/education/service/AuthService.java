package com.green.api.service;


import com.green.api.entity.Account;
import com.green.api.form.AuthRegisterForm;
import com.green.api.repository.IAuthRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements IAuthService, UserDetailsService {
    private final IAuthRepository repository;

    private ModelMapper mapper ;
    private final PasswordEncoder encoder;

    @Autowired
    public AuthService(IAuthRepository repository, ModelMapper mapper, PasswordEncoder encoder) {
        this.repository = repository;
        this.mapper = mapper;
        this.encoder = encoder;
    }


    @Override
    public void create(AuthRegisterForm form) {
        Account account = mapper.map(form, Account.class);
        String encodedPassword = encoder.encode(account.getPassword());
        account.setPassword(encodedPassword);
        repository.save(account);
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Account account = repository.findByEmail(email);
        if (account == null) {
            throw new UsernameNotFoundException(email);
        }
        return User.builder()
                .username(account.getEmail())
                .password(account.getPassword())
                .authorities(account.getRole().toString())
                .build();
    }
//    @Override
//    public void update(String username, AuthRegisterForm form) {
//        Account account = repository.findByUsername(username);
//        if (encoder.matches())
//        repository.save(account) ;
//    }
}
