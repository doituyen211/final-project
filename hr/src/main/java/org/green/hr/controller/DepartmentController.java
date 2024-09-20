package org.green.hr.controller;

import static org.green.core.constant.Constant.SUCCESS;
import static org.green.core.constant.Constant.SUCCESS_MESSAGE;

import jakarta.validation.Valid;
import org.green.core.model.response.CoreResponse;
import org.green.hr.dto.DepartmentDTO;
import org.green.hr.service.IDepartmentService;
import org.green.hr.service.impl.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("hr/department")
public class DepartmentController {

  @Autowired
  private DepartmentService departmentService;

  @Autowired
  private IDepartmentService iDepartmentService;

  @PostMapping("/addDepartment")
  ResponseEntity<CoreResponse> addDepartment(@RequestBody @Valid DepartmentDTO departmentDTO) {
    DepartmentDTO addDepartment = departmentService.addDepartment(departmentDTO);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(addDepartment);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/updateDepartment/{departmentId}")
  ResponseEntity<CoreResponse> updateDepartment(@PathVariable("departmentId") @Valid long departmentId,
      @RequestBody DepartmentDTO departmentDTO) {
    DepartmentDTO updateDepartment = departmentService.updateDepartment(departmentId,
        departmentDTO);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(updateDepartment);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/deleteDepartment/{departmentId}")
  ResponseEntity<CoreResponse> deleteDepartment(@PathVariable("departmentId") long departmentId) {
    DepartmentDTO deletedDepartment = departmentService.deleteDepartment(departmentId);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(deletedDepartment);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/getAllDepartment")
  ResponseEntity<CoreResponse> getAllDepartment() {
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(iDepartmentService.getAllDepartment());
    return ResponseEntity.ok(response);
  }

  @GetMapping("/getDepartment/{departmentId}")
  ResponseEntity<?> getDepartmentById(@PathVariable("departmentId") long departmentId) {
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(iDepartmentService.getDepartmentById(departmentId));
    return ResponseEntity.ok(response);
  }
}

