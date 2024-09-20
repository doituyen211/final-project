package org.green.hr.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContractSearch {
    private String searchTerm;          // Từ khóa tìm kiếm (tên hợp đồng, mã hợp đồng, v.v.)
    private String contractCategory;    // Danh mục hợp đồng
    private Double minSalary;           // Lương tối thiểu
    private Double maxSalary;           // Lương tối đa
    private String EmployeeCode;        // Mã nhân viên
}
