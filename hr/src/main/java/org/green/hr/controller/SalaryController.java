package org.green.hr.controller;

import org.green.core.constant.Constant;
import org.green.core.model.response.CoreResponse;
import org.green.hr.dto.SalaryDTO;
import org.green.hr.model.request.ContractSearch;
import org.green.hr.model.request.SalarySearch;
import org.green.hr.service.ISalaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/hr/salaries")
public class SalaryController {

    @Autowired
    private ISalaryService salaryService;

    // Tạo mới Salary
    @PostMapping("/addSalary")
    public ResponseEntity<CoreResponse> createSalary(@RequestBody SalaryDTO salaryDTO) {
        SalaryDTO savedSalary = salaryService.saveSalary(salaryDTO);
        CoreResponse response = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(savedSalary);
        return ResponseEntity.ok(response);
    }

    // Tìm Salary theo ID
    @GetMapping("/{id}")
    public ResponseEntity<CoreResponse> getSalaryById(@PathVariable Long id) {
        Optional<SalaryDTO> salaryDTO = salaryService.findById(id);
        if (salaryDTO.isPresent()) {
            CoreResponse response = new CoreResponse()
                    .setCode(Constant.SUCCESS)
                    .setMessage(Constant.SUCCESS_MESSAGE)
                    .setData(salaryDTO.get());
            return ResponseEntity.ok(response);
        } else {
            CoreResponse response = new CoreResponse()
                    .setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(response);
        }
    }

    // Tìm kiếm Salary theo tiêu chí
    @GetMapping("/search")
    public ResponseEntity<CoreResponse> searchSalaries(@RequestParam(name = "page", defaultValue = "1", required = false) int pageNo,
                                                       @RequestParam(name = "size", defaultValue = "10", required = false) int pageSize,
                                                       @RequestBody SalarySearch salarySearch) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage("Search success")
                .setData(this.salaryService.searchSalary(pageNo - 1, pageSize, salarySearch));

        return ResponseEntity.ok().body(coreResponse);
    }

    // Xóa Salary (thực chất là cập nhật status thành false)
    @PutMapping("/delete/{id}")
    public ResponseEntity<CoreResponse> deleteSalary(@PathVariable Long id) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage("Salary deleted")
                .setData(this.salaryService.deleteSalary(id));

        return ResponseEntity.ok().body(coreResponse);
    }

    // Cập nhật Salary
    @PutMapping("/{id}")
    public ResponseEntity<CoreResponse> updateSalary(@PathVariable Long id, @RequestBody SalaryDTO salaryDTO) {
        try {
            SalaryDTO updatedSalary = salaryService.updateSalary(id, salaryDTO);
            CoreResponse response = new CoreResponse()
                    .setCode(Constant.SUCCESS)
                    .setMessage(Constant.SUCCESS_MESSAGE)
                    .setData(updatedSalary);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            CoreResponse response = new CoreResponse()
                    .setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(response);
        }
    }

    // Lấy tất cả Salary với phân trang
    @GetMapping
    public ResponseEntity<CoreResponse> getAllSalaries(@RequestParam(name = "page", defaultValue = "1", required = false) int pageNo,
                                                       @RequestParam(name = "size", defaultValue = "10", required = false) int pageSize) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(this.salaryService.getAllSalaries(pageNo - 1, pageSize));

        return ResponseEntity.ok().body(coreResponse);
    }
}
