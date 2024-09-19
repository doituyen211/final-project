package org.green.education.form;

import lombok.Data;
import java.util.Date;

@Data
public class CustomerFilterForm {
    private String search;       // For text search (e.g., by customer name)
    private String status;       // Filter by status (e.g., active, inactive)
    private Date fromDate;       // Filter by a start date for a date range
    private Date toDate;         // Filter by an end date for a date range
}
