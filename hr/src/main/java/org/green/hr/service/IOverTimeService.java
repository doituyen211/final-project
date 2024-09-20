package org.green.hr.service;

import java.util.List;
import org.green.hr.dto.OvertimeDTO;

public interface IOverTimeService {

  OvertimeDTO addOverTime(OvertimeDTO overtimeDTO);

  OvertimeDTO updateOvertime(long overtimeId, OvertimeDTO overtimeDTO);

  OvertimeDTO deleteOvertime(long overtimeId);

  List<OvertimeDTO> getAllOvertimes();

  List<OvertimeDTO> getOvertimeById(long overtimeId);
}
