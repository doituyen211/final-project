package org.green.hr.service;

import org.green.hr.dto.RewardDisciplineDTO;
import org.green.hr.model.request.RDSearch;
import org.green.hr.model.response.RDResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface IRewardDisciplineService {
    RewardDisciplineDTO handleSaveRewardDiscipline(RewardDisciplineDTO rewardDisciplineDTO, MultipartFile rdImages);

    Page<RDResponse> getAllRewardDisciplines(int pageNo, int pageSize);

    RewardDisciplineDTO getRewardDisciplineById(Long id);

    RDResponse updateRewardDiscipline(RewardDisciplineDTO rewardDisciplineDTO, MultipartFile rdImages, Long id);


    RDResponse searchRewardDisciplines(int pageNo, int pageSize, RDSearch rewardDisciplineSearch);

    RDResponse deleteRewardDiscipline(Long id);


    Page<RDResponse> filterRewardDisciplines(int pageNo, int pageSize, RDSearch rewardDisciplineSearch);


    void importDataFromExcel(MultipartFile multipartFile);
}
