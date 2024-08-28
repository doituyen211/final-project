package com.green.api.dto;

import lombok.Data;

@Data
public class AccountDto {
    private Integer id ;

    private String email ;

    private String password ;

    private String role ;

}
