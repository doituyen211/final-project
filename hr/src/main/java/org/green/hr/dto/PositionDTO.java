package org.green.hr.dto;

import lombok.Data;

@Data
public class PositionDTO {
	
	private Long id;
	private String positionName;
	private String departmentName;
	private Long departmentId;
	private Short status;
}
