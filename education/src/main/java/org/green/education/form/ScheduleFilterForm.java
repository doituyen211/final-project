package org.green.education.form;

import lombok.Data;
import org.w3c.dom.Text;

@Data
public class ScheduleFilterForm {
    String search ;
    Integer classID ;
    Integer staffID;
    String classRoom;
}
