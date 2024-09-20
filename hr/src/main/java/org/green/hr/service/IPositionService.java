package org.green.hr.service;

import org.green.hr.dto.PositionDTO;
import org.green.hr.model.request.PositionSearch;
import org.green.hr.model.response.PositionResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IPositionService {

    Page<PositionResponse> filterPosition(int pageNo, int pageSize, PositionSearch positionSearch);
    PositionResponse handleUpdatePosition(PositionDTO positionDTO, Long id);
    PositionResponse handleAddPosition(PositionDTO positionDTO);
    PositionResponse handleDeletePosition(Long id);
    PositionResponse handelGetPosition(Long id);
	void importDataFromExcel(MultipartFile file);
    List<PositionResponse> getAllPositions();
}
