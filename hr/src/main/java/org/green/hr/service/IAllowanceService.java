package org.green.hr.service;

import org.green.hr.dto.AllowanceDTO;
import org.green.hr.model.request.AllowanceSearch;
import org.green.hr.model.response.AllowanceResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface IAllowanceService {
	
	Page<AllowanceResponse> filterAllwance(int pageNo, int pageSize, AllowanceSearch allowanceSearch);
	AllowanceResponse getById(Long id);
	AllowanceResponse handleCreateAllowance(AllowanceDTO allowanceDTO);
	AllowanceResponse handleUpdateAllowance(AllowanceDTO allowanceDTO, Long id);
	AllowanceResponse handleDeleteAllowance(AllowanceDTO allowanceDTO);

	void importDataFromExcel(MultipartFile file);
}
