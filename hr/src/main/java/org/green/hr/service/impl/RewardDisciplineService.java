package org.green.hr.service.impl;

import jakarta.transaction.Transactional;
import org.green.hr.converter.RDConverter;
import org.green.hr.dto.RewardDisciplineDTO;
import org.green.hr.entity.Contract;
import org.green.hr.entity.RewardDiscipline;
import org.green.hr.exception.ResourceNotFoundException;
import org.green.hr.model.request.RDSearch;
import org.green.hr.model.response.ContractResponse;
import org.green.hr.model.response.RDResponse;
import org.green.hr.repository.RewardDisciplineRepository;
import org.green.hr.service.IRewardDisciplineService;
import org.green.hr.util.UploadFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class RewardDisciplineService implements IRewardDisciplineService {

    @Autowired
    private RewardDisciplineRepository rewardDisciplineRepository;

    @Autowired
    private RDConverter rdcConverter;

    @Autowired
    private UploadFile uploadFile;


    @Transactional
    @Override
    public RewardDisciplineDTO handleSaveRewardDiscipline(RewardDisciplineDTO rewardDisciplineDTO, MultipartFile rdImages) {
        // Chuyển đổi DTO sang entity
        RewardDiscipline rewardDiscipline = rdcConverter.convertToEntity(rewardDisciplineDTO);

        // Xử lý file contractContent (nếu cần lưu hoặc thao tác với file)
        if (rdImages != null && ! rdImages.isEmpty()) {
            // Lấy nội dung file dưới dạng chuỗi
            String content = this.uploadFile.uploadFileRD(rdImages);

            // Lưu nội dung file vào trường contentContract của entity Contract
            rewardDiscipline.setRdImages(content);
        }
        else rewardDiscipline.setRdImages(null);

        // Lưu entity vào database
        rewardDiscipline = rewardDisciplineRepository.save(rewardDiscipline);

        // Chuyển đổi entity sang DTO và trả về kết quả
        return rdcConverter.convertToDTO(rewardDiscipline);

    }

    @Override
    public Page<RDResponse> getAllRewardDisciplines(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<RewardDiscipline> contractsPage = rewardDisciplineRepository.findAll(pageable);
        return contractsPage.map(rewardDiscipline -> rdcConverter.convertToResponse(rewardDiscipline));
    }

    @Override
    public RewardDisciplineDTO getRewardDisciplineById(Long id) {
        RewardDiscipline rewardDiscipline = rewardDisciplineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id: " + id));
        return rdcConverter.convertToDTO(rewardDiscipline);
    }

    @Override
    public RDResponse updateRewardDiscipline(RewardDisciplineDTO rewardDisciplineDTO, MultipartFile rdImages, Long id) {
        // Find the existing contract
        RewardDiscipline existingRD = rewardDisciplineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id: " + id));

        RewardDiscipline updatedRD = rdcConverter.updateEntityFromDTO(rewardDisciplineDTO, existingRD);

        if (rdImages != null && !rdImages.isEmpty()) {
            // Upload the new file and get the content
            String content = this.uploadFile.uploadFileContract(rdImages);
            updatedRD.setRdImages(content);
        }
        updatedRD = rewardDisciplineRepository.save(updatedRD);

        return rdcConverter.convertToResponse(updatedRD);
    }

    @Override
    public RDResponse searchRewardDisciplines(int pageNo, int pageSize, RDSearch rewardDisciplineSearch) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<RewardDiscipline> RDsPage = rewardDisciplineRepository.findByCriteria(
                rewardDisciplineSearch.getSearchTerm(),
                rewardDisciplineSearch.getCategory(),
                rewardDisciplineSearch.getMinSalary(),
                rewardDisciplineSearch.getMaxSalary(),
                rewardDisciplineSearch.getEmployeeCode(),
                pageable
        );
        return (RDResponse) RDsPage.map(rewardDiscipline -> rdcConverter.convertToResponse(rewardDiscipline));
    }

    @Override
    public RDResponse deleteRewardDiscipline(Long id) {
        // Tìm hợp đồng theo ID
        RewardDiscipline rewardDiscipline = rewardDisciplineRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id: " + id));

        // Cập nhật trạng thái thành false (hoặc giá trị tương ứng)
        rewardDiscipline.setStatus((short) 0);
        rewardDisciplineRepository.save(rewardDiscipline);
        return new RDResponse("Contract status updated successfully");
    }

    @Override
    public Page<RDResponse> filterRewardDisciplines(int pageNo, int pageSize, RDSearch rewardDisciplineSearch) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<RewardDiscipline> RDsPage = rewardDisciplineRepository.findByCriteria(
                rewardDisciplineSearch.getSearchTerm(),
                rewardDisciplineSearch.getCategory(),
                rewardDisciplineSearch.getMinSalary(),
                rewardDisciplineSearch.getMaxSalary(),
                rewardDisciplineSearch.getEmployeeCode(),
                pageable
        );
        return RDsPage.map(rewardDiscipline -> rdcConverter.convertToResponse(rewardDiscipline));
    }

    @Override
    public void importDataFromExcel(MultipartFile multipartFile) {

    }
}
