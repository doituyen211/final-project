package org.green.hr.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AllowanceDTO {

    private Long id;
    private String allowanceCategory;
    private Float allowanceSalary;
    private Long positionId;
    private Short status;

}
