package org.green.hr.controller;

import static org.green.core.constant.Constant.SUCCESS;
import static org.green.core.constant.Constant.SUCCESS_MESSAGE;

import jakarta.validation.Valid;
import org.green.core.model.response.CoreResponse;
import org.green.hr.dto.SalaryAdvanceDTO;
import org.green.hr.repository.SalaryAdvanceRepository;
import org.green.hr.service.ISalaryAdvanceService;
import org.green.hr.service.impl.SalaryAdvanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hr/salaryAdvances")
public class SalaryAdvanceController {

  @Autowired
  private SalaryAdvanceRepository salaryAdvanceRepository;
  @Autowired
  private ISalaryAdvanceService iSalaryAdvanceService;
  @Autowired
  private SalaryAdvanceService salaryAdvanceService;

  @PostMapping("/addSalaryAdvance")
  ResponseEntity<CoreResponse> addSalaryAdvance(
      @RequestBody @Valid SalaryAdvanceDTO salaryAdvanceDTO) {
    SalaryAdvanceDTO addSalaryAdvance = salaryAdvanceService.addSalaryAdvance(salaryAdvanceDTO);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(addSalaryAdvance);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/updateSalaryAdvance/{salaryAdvanceId}")
  ResponseEntity<CoreResponse> updateSalaryAdvance(
      @PathVariable("salaryAdvanceId") @Valid long salaryAdvanceId,
      @RequestBody @Valid SalaryAdvanceDTO salaryAdvanceDTO) {
    SalaryAdvanceDTO updateSalaryAdvance = salaryAdvanceService.updateSalaryAdvance(salaryAdvanceId,
        salaryAdvanceDTO);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(updateSalaryAdvance);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/deleteSalaryAdvance/{salaryAdvanceId}")
  ResponseEntity<CoreResponse> deleteSalaryAdvance(
      @PathVariable("salaryAdvanceId") long salaryAdvanceId) {
    SalaryAdvanceDTO deletedSalaryAdvance = salaryAdvanceService.deleteSalaryAdvance(
        salaryAdvanceId);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(deletedSalaryAdvance);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/getAllSalaryAdvance")
  ResponseEntity<CoreResponse> getAllSalaryAdvance() {
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(iSalaryAdvanceService.getSalaryAdvances());
    return ResponseEntity.ok(response);
  }

  @GetMapping("/getSalaryAdvances/{salaryAdvanceId}")
  ResponseEntity<CoreResponse> getSalaryAdvanceById(
      @PathVariable("salaryAdvanceId") long salaryAdvanceId) {
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(iSalaryAdvanceService.getSalaryAdvanceById(salaryAdvanceId));
    return ResponseEntity.ok(response);
  }

  @GetMapping("/getAllSalaryAdvances")
  public ResponseEntity<CoreResponse> getAllSalaryAdvances(
      @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "6") int size) {
    Pageable pageable = PageRequest.of(page, size);
    Page<SalaryAdvanceDTO> salaryAdvancesPage = salaryAdvanceService.getAllSalaryAdvances(pageable);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(salaryAdvancesPage.getContent());
    return ResponseEntity.ok(response);
  }
}