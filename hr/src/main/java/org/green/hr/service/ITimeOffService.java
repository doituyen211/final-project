package org.green.hr.service;

import java.util.List;
import org.green.hr.dto.TimeOffDTO;

public interface ITimeOffService {
  TimeOffDTO addTimeOff(TimeOffDTO timeOffDTO);
  TimeOffDTO updateTimeOff(long timeOffId,TimeOffDTO timeOffDTO);
  TimeOffDTO deleteTimeOff(long timeOffId);
  List<TimeOffDTO> getTimeOff();
  List<TimeOffDTO> getTimeOffById(long timeOffId);
}
