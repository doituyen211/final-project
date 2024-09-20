package org.green.hr.converter;

import org.green.hr.dto.ContractDTO;
import org.green.hr.entity.Contract;
import org.green.hr.model.response.ContractResponse;
import org.green.hr.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ContractConverter {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Contract convertToEntity(ContractDTO contractDTO) {
        Contract contract = new Contract();

        if(contractDTO.getId() != null) contract.setId(contractDTO.getId());
        contract.setContractCode(contractDTO.getContractCode());
        contract.setContractCategory(contractDTO.getContractCategory());
        contract.setSalary(contractDTO.getSalary());
        contract.setDateStart(contractDTO.getDateStart());
        contract.setDateEnd(contractDTO.getDateEnd());
        contract.setStatus(contractDTO.getStatus());
        contract.setCreateAt(contractDTO.getCreateAt());
        contract.setUpdateAt(contractDTO.getUpdateAt());

        if (contractDTO.getEmployeeCode() != null) {
            contract.setEmployee(employeeRepository.findEmployeeByCode(contractDTO.getEmployeeCode()));
        }

        return contract;
    }

    public ContractResponse convertToResponse(Contract contract) {
        ContractResponse contractResponse = new ContractResponse();

        contractResponse.setId(contract.getId());
        contractResponse.setContractCode(contract.getContractCode());
        contractResponse.setContractCategory(contract.getContractCategory());
        contractResponse.setContentContract(contract.getContentContract());
        contractResponse.setSalary(contract.getSalary());
        contractResponse.setDateStart(contract.getDateStart());
        contractResponse.setDateEnd(contract.getDateEnd());
        contractResponse.setStatus(contract.getStatus());
        contractResponse.setCreateAt(contract.getCreateAt());
        contractResponse.setUpdateAt(contract.getUpdateAt());
        if (contract.getEmployee() != null) {
            contractResponse.setEmployeeCode(contract.getEmployee().getEmployeeCode());
        }

        return contractResponse;
    }

    public ContractDTO convertToDTO(Contract contract) {
        ContractDTO contractDTO = new ContractDTO();

        contractDTO.setId(contract.getId());
        contractDTO.setContractCode(contract.getContractCode());
        contractDTO.setContractCategory(contract.getContractCategory());
        contractDTO.setContentContractPath(contract.getContentContract());
        contractDTO.setSalary(contract.getSalary());
        contractDTO.setDateStart(contract.getDateStart());
        contractDTO.setDateEnd(contract.getDateEnd());
        contractDTO.setStatus(contract.getStatus());
        contractDTO.setCreateAt(contract.getCreateAt());
        contractDTO.setUpdateAt(contract.getUpdateAt());
        if (contract.getEmployee() != null) {
            contractDTO.setEmployeeCode(contract.getEmployee().getEmployeeCode());
        }

        return contractDTO;
    }

    // Thêm phương thức này
    public Contract updateEntityFromDTO(ContractDTO contractDTO, Contract existingContract) {
        existingContract.setContractCode(contractDTO.getContractCode());
        existingContract.setContractCategory(contractDTO.getContractCategory());
        existingContract.setContentContract(contractDTO.getContentContractPath());
        existingContract.setSalary(contractDTO.getSalary());
        existingContract.setDateStart(contractDTO.getDateStart());
        existingContract.setDateEnd(contractDTO.getDateEnd());
        existingContract.setStatus(contractDTO.getStatus());
        existingContract.setCreateAt(contractDTO.getCreateAt());
        existingContract.setUpdateAt(contractDTO.getUpdateAt());

        if (contractDTO.getEmployeeCode() != null) {
            existingContract.setEmployee(employeeRepository.findEmployeeByCode(contractDTO.getEmployeeCode()));
        }

        return existingContract;
    }
}
