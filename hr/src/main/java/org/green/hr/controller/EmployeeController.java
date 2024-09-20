package org.green.hr.controller;

import org.green.core.constant.Constant;
import org.green.core.model.response.CoreResponse;
import org.green.hr.dto.EmployeeDTO;
import org.green.hr.entity.Employee;
import org.green.hr.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hr/employees")
public class EmployeeController {

    @Autowired
    private IEmployeeService iEmployeeService;


    @GetMapping
    public ResponseEntity<CoreResponse> getAllEmployees(@RequestParam(name = "pageNo", defaultValue = "1") int pageNo,
                                                        @RequestParam(name = "pageSize", defaultValue = "10") int pageSize) {

        Page<EmployeeDTO> employeeDTOS = iEmployeeService.getEmployees(pageNo - 1, pageSize);

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(employeeDTOS);

        return ResponseEntity.ok().body(coreResponse);
    }

    @GetMapping("/all")
    public ResponseEntity<CoreResponse> getAllEmployees() {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(iEmployeeService.getAllEmployees());

        return ResponseEntity.ok().body(coreResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoreResponse> getEmployeeById(@PathVariable("id") Long id) {
        EmployeeDTO employeeDTO = iEmployeeService.getEmployeeById(id);

        if (employeeDTO == null) {
            CoreResponse coreResponse = new CoreResponse()
                    .setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(coreResponse);
        }

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(employeeDTO);

        return ResponseEntity.ok().body(coreResponse);
    }

    @PostMapping("/create")
    public ResponseEntity<CoreResponse> createEmployee(@RequestBody(required = false) Employee employee) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(iEmployeeService.createEmployee(employee));

        return ResponseEntity.ok().body(coreResponse);
    }
}
