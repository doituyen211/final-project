package org.green.education.form;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class CustomerFilterForm {
    private String search;       // For text search (e.g., by customer name)
    private String status;       // Filter by status (e.g., active, inactive)

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date fromDate;       // Filter by a start date for a date range

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date toDate;         // Filter by an end date for a date range
}
