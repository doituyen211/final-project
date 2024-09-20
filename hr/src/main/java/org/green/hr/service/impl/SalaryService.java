package org.green.hr.service.impl;

import org.green.hr.dto.SalaryDTO;
import org.green.hr.entity.Contract;
import org.green.hr.entity.Salary;
import org.green.hr.model.request.SalarySearch;
import org.green.hr.model.response.ContractResponse;
import org.green.hr.model.response.SalaryRespons;
import org.green.hr.repository.SalaryRepository;
import org.green.hr.service.ISalaryService;
import org.green.hr.converter.SalaryConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SalaryService implements ISalaryService {

    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private SalaryConverter salaryConverter;

    @Override
    public SalaryDTO saveSalary(SalaryDTO salaryDTO) {
        Salary salary = salaryConverter.convertToEntity(salaryDTO);
        Salary savedSalary = salaryRepository.save(salary);
        return salaryConverter.convertToDTO(savedSalary);
    }

    @Override
    public Optional<SalaryDTO> findById(Long id) {
        Optional<Salary> salary = salaryRepository.findById(id);
        return salary.map(salaryConverter::convertToDTO);
    }

    @Override
    public SalaryRespons deleteSalary(Long id) {
        // Tìm bảng lương theo id :
        Salary salary = salaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary not found with id " + id));
        // Cập nhật trạng thái thành false
        salary.setStatus((short) 0);
        salaryRepository.save(salary);
        return new SalaryRespons("Salary status updated successfully");
    }

    @Override
    public SalaryDTO updateSalary(Long id, SalaryDTO salaryDTO) {
        Optional<Salary> existingSalary = salaryRepository.findById(id);
        if (existingSalary.isPresent()) {
            Salary updatedSalary = salaryConverter.updateEntityFromDTO(salaryDTO, existingSalary.get());
            salaryRepository.save(updatedSalary);
            return salaryConverter.convertToDTO(updatedSalary);
        } else {
            throw new RuntimeException("Salary not found with id " + id);
        }
    }

    @Override
    public Page<SalaryRespons> getAllSalaries(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Salary> salariesPage = salaryRepository.findAll(pageable);
        return salariesPage.map(salary -> salaryConverter.convertToResponse(salary));
    }

    @Override
    public SalaryRespons searchSalary(int pageNo, int pageSize, SalarySearch salarySearch) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Salary> salariesPage = salaryRepository.findByCriteria(
                salarySearch.getMinSalary(),
                salarySearch.getMaxSalary(),
                salarySearch.getEmployeeCode(),
                pageable
        );
        return (SalaryRespons) salariesPage.map(salary -> salaryConverter.convertToResponse(salary));
    }

    @Override
    public Page<SalaryRespons> filterContracts(int pageNo, int pageSize, SalarySearch salarySearch) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Salary> salariesPage = salaryRepository.findByCriteria(
                salarySearch.getMinSalary(),
                salarySearch.getMaxSalary(),
                salarySearch.getEmployeeCode(),
                pageable
        );
        return salariesPage.map(salary -> salaryConverter.convertToResponse(salary));
    }

}
