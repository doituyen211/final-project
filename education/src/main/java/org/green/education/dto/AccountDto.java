package org.green.education.dto;

import lombok.Data;

@Data
public class AccountDto {
    private Integer id ;

    private String email ;

    private String username;

    private String fullName;

    private String password ;

    private String role ;

}
