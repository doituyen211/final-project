package org.green.hr.converter;

import org.green.hr.dto.PositionDTO;
import org.green.hr.entity.Position;
import org.green.hr.model.response.PositionResponse;
import org.green.hr.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PositionConverter {
	
	@Autowired
	private DepartmentRepository departmentRepository;

	
	public Position convertToEntity(PositionDTO positionDTO) {
		
		Position position = new Position();
		
		position.setId(positionDTO.getId());
		position.setPositionName(positionDTO.getPositionName());
		if(positionDTO.getDepartmentId() != null) position.setDepartment(this.departmentRepository.findById(positionDTO.getDepartmentId()).orElse(null));
		if(positionDTO.getDepartmentName() != null) position.setDepartment(this.departmentRepository.findByDepartmentName(positionDTO.getDepartmentName()));
		position.setStatus(positionDTO.getStatus());
		
		return position;
	}
	
	public PositionResponse convertToResponse(Position position) {
		PositionResponse positionResponse = new PositionResponse();
		
		positionResponse.setId(position.getId());
		positionResponse.setDepartmentName(position.getDepartment().getDepartmentName());
		positionResponse.setPositionName(position.getPositionName());
		positionResponse.setStatus(position.getStatus());
		positionResponse.setCreatedAt(position.getCreateAt());
		positionResponse.setUpdatedAt(position.getUpdateAt());
		
		return positionResponse;
	}
}
