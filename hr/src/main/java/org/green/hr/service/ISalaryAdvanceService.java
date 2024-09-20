package org.green.hr.service;

import java.util.List;
import org.green.hr.dto.SalaryAdvanceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ISalaryAdvanceService {

  SalaryAdvanceDTO addSalaryAdvance(SalaryAdvanceDTO salaryAdvanceDTO);

  SalaryAdvanceDTO updateSalaryAdvance(long salaryAdvanceId, SalaryAdvanceDTO salaryAdvanceDTO);

  SalaryAdvanceDTO deleteSalaryAdvance(long salaryAdvanceId);

  List<SalaryAdvanceDTO> getSalaryAdvances();

  Page<SalaryAdvanceDTO> getAllSalaryAdvances(Pageable pageable);

  List<SalaryAdvanceDTO> getSalaryAdvanceById(long salaryAdvanceId);
}
