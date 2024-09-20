package org.green.hr.model.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PositionResponse {
	
	private Long id;
	private String positionName;
	private String departmentName;
	private Short status;
	private Date createdAt;
	private Date updatedAt;
	
}
