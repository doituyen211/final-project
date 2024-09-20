package org.green.hr.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RDSearch {
    private String searchTerm;          // Từ khóa tìm kiếm (tên RD, mã RD, v.v.)
    private String category;            // Danh mục RD
    private Double minSalary;           // Lương tối thiểu
    private Double maxSalary;           // Lương tối đa
    private String EmployeeCode;        // Mã nhân viên
}
