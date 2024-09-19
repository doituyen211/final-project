package org.green.education.service;


import org.green.education.entity.Account;
import org.green.education.entity.ChangePasswordRequest;
import org.green.education.form.AuthRegisterForm;
import org.green.education.form.ChangePasswordForm;
import org.green.education.repository.IAuthRepository;
import org.green.education.repository.IChangePasswordRequestRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService implements IAuthService, UserDetailsService {
    private final IAuthRepository repository;

    private ModelMapper mapper ;
    private final PasswordEncoder encoder;

    private final JavaMailSender mailSender;
    private final IChangePasswordRequestRepository changePasswordRepository ;
    @Value("${frontend.domain}")
    private String frontendDomain;

    @Autowired
    public AuthService(IAuthRepository repository, ModelMapper mapper, PasswordEncoder encoder, JavaMailSender mailSender, IChangePasswordRequestRepository changePasswordRepository) {
        this.repository = repository;
        this.mapper = mapper;
        this.encoder = encoder;
        this.mailSender = mailSender;
        this.changePasswordRepository = changePasswordRepository;
    }


    @Override
    public void create(AuthRegisterForm form) {
        Account account = mapper.map(form, Account.class);
        String encodedPassword = encoder.encode(account.getPassword());
        account.setPassword(encodedPassword);
        account.setStatus("ACTIVE");
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

    @Override
    public ResponseEntity<String> sendToEmail(String email) {
        if (repository.existsByEmail(email)) {
            String token = UUID.randomUUID().toString() + ":" + email;
            String resetLink = frontendDomain + "/reset-password?token=" + token;

            try {
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setFrom("${spring.mail.username}");
                mailMessage.setTo(email);
                mailMessage.setText("Click the following link to reset your password: " + resetLink);
                mailMessage.setSubject("Password Reset Link");

                mailSender.send(mailMessage);

                ChangePasswordRequest changePasswordRequest = new ChangePasswordRequest();
                changePasswordRequest.setEmail(email);
                changePasswordRequest.setToken(token);
                changePasswordRequest.setExpirationDate(LocalDateTime.now().plusMinutes(30));  // Token valid for 30 minutes
                changePasswordRequest.setUsed(false);  // Token is not yet used
                changePasswordRepository.save(changePasswordRequest);

                return ResponseEntity.ok("Password reset link has been sent to your email.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while Sending Mail");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is not Valid!");
        }
    }
    @Override
    public void resetPassword(ChangePasswordForm form) {
        ChangePasswordRequest resetRequest = changePasswordRepository.findByToken(form.getToken())
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired password reset token."));

        if (resetRequest.isExpired() || resetRequest.isUsed()) {
            throw new IllegalArgumentException("Password reset token is invalid, expired, or has already been used.");
        }

        String[] parts = form.getToken().split(":");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid token format.");
        }

        Account account = repository.findByEmail(parts[1]);
        if (account == null) {
            throw new IllegalArgumentException("No account found for the provided email.");
        }

        account.setPassword(encoder.encode(form.getNewPassword()));
        repository.save(account);

        resetRequest.setUsed(true);
        changePasswordRepository.save(resetRequest);
    }

//    @Override
//    public void update(String username, AuthRegisterForm form) {
//        Account account = repository.findByUsername(username);
//        if (encoder.matches())
//        repository.save(account) ;
//    }
}
