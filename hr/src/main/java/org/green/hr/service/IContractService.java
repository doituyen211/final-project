package org.green.hr.service;

import org.green.hr.dto.ContractDTO;
import org.green.hr.entity.Contract;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.green.hr.model.request.ContractSearch;
import org.green.hr.model.response.ContractResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface IContractService {
    ContractDTO handleSaveContract(ContractDTO contractDTO, MultipartFile contractContent);

    Page<ContractResponse> getAllContracts(int pageNo, int pageSize);

    ContractDTO getContractById(Long id);

    ContractResponse updateContract(ContractDTO contractDTO, MultipartFile contractContent, Long id);

    ContractResponse searchContracts(int pageNo, int pageSize, ContractSearch contractSearch);

    ContractResponse deleteContract(Long id);

    Page<ContractResponse> filterContracts(int pageNo, int pageSize, ContractSearch contractSearch);

    void importDataFromExcel(MultipartFile multipartFile);
}