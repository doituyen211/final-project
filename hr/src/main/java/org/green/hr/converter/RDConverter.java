package org.green.hr.converter;

import org.green.hr.dto.RewardDisciplineDTO;
import org.green.hr.entity.Employee;
import org.green.hr.entity.RewardDiscipline;
import org.green.hr.model.response.RDResponse;
import org.green.hr.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RDConverter {

    @Autowired
    private EmployeeRepository employeeRepository;

    public RewardDiscipline convertToEntity(RewardDisciplineDTO rewardDisciplineDTO) {
        RewardDiscipline rewardDiscipline = new RewardDiscipline();

        if (rewardDisciplineDTO.getId() != null) {
            rewardDiscipline.setId(rewardDisciplineDTO.getId());
        }
        rewardDiscipline.setContent(rewardDisciplineDTO.getContent());
        rewardDiscipline.setDecisionDate(rewardDisciplineDTO.getDecisionDate());
        rewardDiscipline.setMoney(rewardDisciplineDTO.getMoney());
        rewardDiscipline.setCategory(rewardDisciplineDTO.getCategory());
        rewardDiscipline.setRdImages(rewardDisciplineDTO.getRdImages());
        rewardDiscipline.setStatus(rewardDisciplineDTO.getStatus());
        rewardDiscipline.setCreateAt(rewardDisciplineDTO.getCreateAt());
        rewardDiscipline.setUpdateAt(rewardDisciplineDTO.getUpdateAt());
        rewardDiscipline.setRdCode(rewardDisciplineDTO.getRdCode());

        if (rewardDisciplineDTO.getEmployeeCode() != null) {
            Employee employee = employeeRepository.findEmployeeByCode(rewardDisciplineDTO.getEmployeeCode());
            rewardDiscipline.setEmployee(employee);
        }

        return rewardDiscipline;
    }

    public RDResponse convertToResponse(RewardDiscipline rewardDiscipline) {
        RDResponse rdResponse = new RDResponse();

        rdResponse.setId(rewardDiscipline.getId());
        rdResponse.setContent(rewardDiscipline.getContent());
        rdResponse.setDecisionDate(rewardDiscipline.getDecisionDate());
        rdResponse.setRdImages(rewardDiscipline.getRdImages());
        rdResponse.setMoney(rewardDiscipline.getMoney());
        rdResponse.setCategory(rewardDiscipline.getCategory());
        rdResponse.setRdCode(rewardDiscipline.getRdCode());
        rdResponse.setStatus(rewardDiscipline.getStatus());
        rdResponse.setCreateAt(rewardDiscipline.getCreateAt());
        rdResponse.setUpdateAt(rewardDiscipline.getUpdateAt());
        if (rewardDiscipline.getEmployee() != null) {
            rdResponse.setEmployeeCode(rewardDiscipline.getEmployee().getEmployeeCode());
        }

        return rdResponse;
    }

    public RewardDisciplineDTO convertToDTO(RewardDiscipline rewardDiscipline) {
        RewardDisciplineDTO rewardDisciplineDTO = new RewardDisciplineDTO();

        rewardDisciplineDTO.setId(rewardDiscipline.getId());
        rewardDisciplineDTO.setContent(rewardDiscipline.getContent());
        rewardDisciplineDTO.setDecisionDate(rewardDiscipline.getDecisionDate());
        rewardDisciplineDTO.setMoney(rewardDiscipline.getMoney());
        rewardDisciplineDTO.setCategory(rewardDiscipline.getCategory());
        rewardDisciplineDTO.setRdImages(rewardDiscipline.getRdImages());
        rewardDisciplineDTO.setStatus(rewardDiscipline.getStatus());
        rewardDisciplineDTO.setCreateAt(rewardDiscipline.getCreateAt());
        rewardDisciplineDTO.setUpdateAt(rewardDiscipline.getUpdateAt());
        rewardDisciplineDTO.setRdCode(rewardDiscipline.getRdCode());

        if (rewardDiscipline.getEmployee() != null) {
            rewardDisciplineDTO.setEmployeeCode(rewardDiscipline.getEmployee().getEmployeeCode());
        }

        return rewardDisciplineDTO;
    }

    public RewardDiscipline updateEntityFromDTO(RewardDisciplineDTO rewardDisciplineDTO, RewardDiscipline existingRewardDiscipline) {
        existingRewardDiscipline.setContent(rewardDisciplineDTO.getContent());
        existingRewardDiscipline.setDecisionDate(rewardDisciplineDTO.getDecisionDate());
        existingRewardDiscipline.setMoney(rewardDisciplineDTO.getMoney());
        existingRewardDiscipline.setCategory(rewardDisciplineDTO.getCategory());
        existingRewardDiscipline.setRdImages(rewardDisciplineDTO.getRdImages());
        existingRewardDiscipline.setStatus(rewardDisciplineDTO.getStatus());
        existingRewardDiscipline.setCreateAt(rewardDisciplineDTO.getCreateAt());
        existingRewardDiscipline.setUpdateAt(rewardDisciplineDTO.getUpdateAt());
        existingRewardDiscipline.setRdCode(rewardDisciplineDTO.getRdCode());

        if (rewardDisciplineDTO.getEmployeeCode() != null) {
            Employee employee = employeeRepository.findEmployeeByCode(rewardDisciplineDTO.getEmployeeCode());
            if (employee != null) {
                existingRewardDiscipline.setEmployee(employee);
            } else {
                // Handle the case where the employee is not found if needed
                // e.g., throw an exception or log a warning
            }
        }

        return existingRewardDiscipline;
    }
}
