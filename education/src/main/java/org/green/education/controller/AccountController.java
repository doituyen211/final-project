package org.green.education.controller;

import org.green.education.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;

@RestController
@RequestMapping( "/api/v1/accounts")
public class AccountController {
    @Autowired
    private AccountService service ;
    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getALL()) ;
    }
}
