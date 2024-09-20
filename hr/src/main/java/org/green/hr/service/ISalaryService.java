package org.green.hr.service;

import org.green.hr.dto.SalaryDTO;
import org.green.hr.model.request.ContractSearch;
import org.green.hr.model.request.SalarySearch;
import org.green.hr.model.response.ContractResponse;
import org.green.hr.model.response.SalaryRespons;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ISalaryService {
    // Phương thức để lưu một SalaryDTO
    SalaryDTO saveSalary(SalaryDTO salaryDTO);

    // Phương thức để tìm Salary theo ID
    Optional<SalaryDTO> findById(Long id);

    // Phương thức để xóa một Salary theo ID
    SalaryRespons deleteSalary(Long id);

    // Phương thức để cập nhật Salary
    SalaryDTO updateSalary(Long id, SalaryDTO salaryDTO);

    // Phương thức để lấy tất cả Salary
    Page<SalaryRespons> getAllSalaries(int pageNo, int pageSize);

    SalaryRespons searchSalary(int pageNo, int pageSize, SalarySearch salarySearch);

    Page<SalaryRespons> filterContracts(int pageNo, int pageSize, SalarySearch salarySearch);
}
