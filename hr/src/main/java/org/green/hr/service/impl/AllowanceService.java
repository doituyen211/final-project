package org.green.hr.service.impl;

import jakarta.transaction.Transactional;
import org.green.hr.converter.AllowanceConverter;
import org.green.hr.dto.AllowanceDTO;
import org.green.hr.entity.Allowance;
import org.green.hr.model.request.AllowanceSearch;
import org.green.hr.model.response.AllowanceResponse;
import org.green.hr.repository.AllowanceRepository;
import org.green.hr.repository.PositionRepository;
import org.green.hr.service.IAllowanceService;
import org.green.hr.util.ExcelHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class AllowanceService implements IAllowanceService {
	
	@Autowired
	private AllowanceRepository allowanceRepository;
	
	@Autowired
	private AllowanceConverter allowanceConverter;

	@Autowired
	private PositionRepository positionRepository;

	@Autowired
	private ExcelHelper excelHelper;

	@Override
	public Page<AllowanceResponse> filterAllwance(int pageNo, int pageSize, AllowanceSearch allowanceSearch) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		
		Page<Allowance> allowances = this.allowanceRepository.findByStatusAndKeyword(allowanceSearch.getStatus(), allowanceSearch.getKeyword(), pageable);
		
		return allowances.map(item -> this.allowanceConverter.convertToResponse(item));
	}

	@Override
	public AllowanceResponse getById(Long id) {
		Allowance allowance = this.allowanceRepository.findById(id).orElse(null);
		return this.allowanceConverter.convertToResponse(allowance);
	}

	@Transactional
	@Override
	public AllowanceResponse handleCreateAllowance(AllowanceDTO allowanceDTO) {
		Allowance allowance = this.allowanceConverter.convertToEntity(allowanceDTO);
		allowance.setCreateAt(new Date());
		
		Allowance newAllowance = this.allowanceRepository.save(allowance);
		return this.allowanceConverter.convertToResponse(newAllowance);
	}

	@Transactional
	@Override
	public AllowanceResponse handleUpdateAllowance(AllowanceDTO allowanceDTO, Long id) {
		Allowance allowance = this.allowanceRepository.findById(id).orElse(null);

		allowance.setId(id);
		allowance.setAllowanceCategory(allowanceDTO.getAllowanceCategory());
		allowance.setAllowanceSalary(allowanceDTO.getAllowanceSalary());
		allowance.setStatus(allowanceDTO.getStatus());
		allowance.setPosition(this.positionRepository.findById(allowanceDTO.getPositionId()).orElse(null));
		allowance.setUpdateAt(new Date());
		
		Allowance updateAllowance = this.allowanceRepository.save(allowance);
		
		return this.allowanceConverter.convertToResponse(updateAllowance);
	}

	@Transactional
	@Override
	public AllowanceResponse handleDeleteAllowance(AllowanceDTO allowanceDTO) {
		Allowance allowance = this.allowanceConverter.convertToEntity(allowanceDTO);
		
		Allowance updateAllowance = this.allowanceRepository.save(allowance);
		
		return this.allowanceConverter.convertToResponse(updateAllowance);
	}

	@Transactional
	@Override
	public void importDataFromExcel(MultipartFile multipartFile) {
		try {
			List<AllowanceDTO> allowanceDTOS = this.excelHelper.excelToAllowanceEntities(multipartFile.getInputStream());

			for (AllowanceDTO it : allowanceDTOS) {
				Allowance allowance = this.allowanceConverter.convertToEntity(it);
				allowance.setCreateAt(new Date());
				this.allowanceRepository.save(allowance);
			}

		} catch (IOException e) {
			throw new RuntimeException("fail to store data: " + e.getMessage());
		}
	}
}
