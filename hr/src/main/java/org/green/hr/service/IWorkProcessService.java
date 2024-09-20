package org.green.hr.service;

import java.util.List;
import org.green.hr.dto.WorkProcessDTO;

public interface IWorkProcessService {
  WorkProcessDTO addWorkProcess(WorkProcessDTO workProcessDTO);
  WorkProcessDTO updateWorkProcess(long id,WorkProcessDTO workProcessDTO);
  WorkProcessDTO deleteWorkProcess(long id);
  List<WorkProcessDTO> getWorkProcess();
  List<WorkProcessDTO> getWorkProcessById(long id);
}
