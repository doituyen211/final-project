package org.green.hr.service.impl;

import jakarta.transaction.Transactional;
import org.green.hr.converter.ContractConverter;
import org.green.hr.dto.ContractDTO;
import org.green.hr.entity.Contract;
import org.green.hr.exception.ResourceNotFoundException;
import org.green.hr.model.request.ContractSearch;
import org.green.hr.model.response.ContractResponse;
import org.green.hr.repository.ContractRepository;
import org.green.hr.service.IContractService;
import org.green.hr.util.ExcelHelper;
import org.green.hr.util.UploadFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ContractService implements IContractService {

    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private ContractConverter contractConverter;

    @Autowired
    private UploadFile uploadFile;

    @Transactional
    @Override
    public ContractDTO handleSaveContract(ContractDTO contractDTO, MultipartFile contractContent) {
        // Chuyển đổi DTO sang entity
        Contract contract = contractConverter.convertToEntity(contractDTO);

        // Xử lý file contractContent (nếu cần lưu hoặc thao tác với file)
        if (contractContent != null && !contractContent.isEmpty()) {
            // Lấy nội dung file dưới dạng chuỗi
            String content = this.uploadFile.uploadFileContract(contractContent);

            // Lưu nội dung file vào trường contentContract của entity Contract
            contract.setContentContract(content);
        }
        else contract.setContentContract(null);

        // Lưu entity vào database
        contract = contractRepository.save(contract);

        // Chuyển đổi entity sang DTO và trả về kết quả
        return contractConverter.convertToDTO(contract);
    }

    @Override
    public Page<ContractResponse> getAllContracts(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Contract> contractsPage = contractRepository.findAll(pageable);
        return contractsPage.map(contract -> contractConverter.convertToResponse(contract));
    }

    @Override
    public ContractDTO getContractById(Long id) {
        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id: " + id));
        return contractConverter.convertToDTO(contract);
    }

    @Override
    @Transactional
    public ContractResponse updateContract(ContractDTO contractDTO, MultipartFile contractContent, Long id) {
        // Find the existing contract
        Contract existingContract = contractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id: " + id));

        Contract updatedContract = contractConverter.updateEntityFromDTO(contractDTO, existingContract);

        if (contractContent != null && !contractContent.isEmpty()) {
            // Upload the new file and get the content
            String content = this.uploadFile.uploadFileContract(contractContent);
            updatedContract.setContentContract(content);
        }
        updatedContract = contractRepository.save(updatedContract);

        return contractConverter.convertToResponse(updatedContract);
    }


    @Override
    public ContractResponse searchContracts(int pageNo, int pageSize, ContractSearch contractSearch) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Contract> contractsPage = contractRepository.findByCriteria(
                contractSearch.getSearchTerm(),
                contractSearch.getContractCategory(),
                contractSearch.getMinSalary(),
                contractSearch.getMaxSalary(),
                contractSearch.getEmployeeCode(),
                pageable
        );
        return (ContractResponse) contractsPage.map(contract -> contractConverter.convertToResponse(contract));
    }

    @Override
    public ContractResponse deleteContract(Long id) {
        // Tìm hợp đồng theo ID
        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id: " + id));

        // Cập nhật trạng thái thành false (hoặc giá trị tương ứng)
        contract.setStatus((short) 0);
        contractRepository.save(contract);
        return new ContractResponse("Contract status updated successfully");
    }



    @Override
    public Page<ContractResponse> filterContracts(int pageNo, int pageSize, ContractSearch contractSearch) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Contract> contractsPage = contractRepository.findByCriteria(
                contractSearch.getSearchTerm(),
                contractSearch.getContractCategory(),
                contractSearch.getMinSalary(),
                contractSearch.getMaxSalary(),
                contractSearch.getEmployeeCode(),
                pageable
        );
        return contractsPage.map(contract -> contractConverter.convertToResponse(contract));
    }

    @Override
    public void importDataFromExcel(MultipartFile multipartFile) {

    }
}
