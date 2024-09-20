package org.green.hr.service.impl;

import java.util.List;
import org.green.hr.dto.WorkProcessDTO;
import org.green.hr.service.IWorkProcessService;
import org.springframework.stereotype.Service;

@Service
public class WorkProcessService implements IWorkProcessService {

  @Override
  public WorkProcessDTO addWorkProcess(WorkProcessDTO workProcessDTO) {
    return null;
  }

  @Override
  public WorkProcessDTO updateWorkProcess(long id, WorkProcessDTO workProcessDTO) {
    return null;
  }

  @Override
  public WorkProcessDTO deleteWorkProcess(long id) {
    return null;
  }

  @Override
  public List<WorkProcessDTO> getWorkProcess() {
    return List.of();
  }

  @Override
  public List<WorkProcessDTO> getWorkProcessById(long id) {
    return List.of();
  }
}
