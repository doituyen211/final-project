package org.green.education.controller;


import jakarta.validation.Valid;
import org.green.education.dto.AccountDto;
import org.green.education.entity.Account;
import org.green.education.form.AccountCreateForm;
import org.green.education.form.AccountFilterForm;
import org.green.education.service.IAccountService;
import org.green.education.validation.AccountIdExist;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {

    @Autowired
    private IAccountService service;

    @Autowired
    private ModelMapper mapper;

    @GetMapping()
    public Page<AccountDto> findAll(AccountFilterForm form,
                                    @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
                                    @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
                                    @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
                                    @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir
            ) {
        Page<Account> accounts = service.findAll(form, pageNo, pageSize, sortBy, sortDir);
        return accounts.map(account -> mapper.map(account, AccountDto.class)) ;
    }

    @GetMapping("/{id}")
    public AccountDto findById(@PathVariable("id")  @AccountIdExist Integer id) {
        return mapper.map(service.findById(id), AccountDto.class) ;
    }

    @PostMapping
    public void create(@RequestBody @Valid AccountCreateForm form) {
        service.create(form);
    }


    @PutMapping("/{id}")
    public void update(@PathVariable("id") @AccountIdExist Integer id, @RequestBody Account form) {
        form.setId(id);
        service.update(form);
    }

    @DeleteMapping("/id")
    public void deleteById(@PathVariable("id") Integer id) {
        service.deleteById(id);
    }
}
