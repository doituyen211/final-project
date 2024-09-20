package org.green.hr.service.impl;

import jakarta.transaction.Transactional;
import org.green.hr.converter.QualificationConverter;
import org.green.hr.dto.QualificationDTO;
import org.green.hr.entity.Qualification;
import org.green.hr.model.request.QualificationSearch;
import org.green.hr.model.response.QualificationResponse;
import org.green.hr.repository.EmployeeRepository;
import org.green.hr.repository.QualificationRepository;
import org.green.hr.service.IQualificationService;
import org.green.hr.util.ExcelHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class QualificationService implements IQualificationService {

    @Autowired
    private QualificationRepository qualificationRepository;

    @Autowired
    private QualificationConverter qualificationConverter;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    @Override
    public QualificationDTO handldeSaveQualification(QualificationDTO qualificationDTO) {
        Qualification qualification = this.qualificationConverter.convertToEntity(qualificationDTO);
        qualification.setCreateAt(new Date());
        this.qualificationRepository.save(qualification);
        return qualificationDTO;
    }

    @Override
    public Page<QualificationResponse> getAllQualifications(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Page<Qualification> qualifications = this.qualificationRepository.findAll(pageable);

        return qualifications.map((qualification) -> this.qualificationConverter.convertToResponse(qualification));
    }

    @Override
    public QualificationDTO getQualificationById(Long id) {
        return this.qualificationConverter.convertToDTO(this.qualificationRepository.findById(id).get());
    }

    @Transactional
    @Override
    public QualificationResponse updateQualification(QualificationDTO qualificationDTO, Long id) {

        Qualification qualification = this.qualificationRepository.findById(id).orElse(null);

        if (qualification != null) {
            qualification.setQualificationName(qualificationDTO.getQualificationName());
            qualification.setEmployee(this.employeeRepository.findByEmployeeName(qualificationDTO.getEmployeeName()));
            if(qualificationDTO.getImagePath() != null){
                if(!qualificationDTO.getImagePath().isEmpty()) qualification.setImage(qualificationDTO.getImagePath());
            }
            qualification.setStatus(qualificationDTO.getStatus());
            qualification.setExpiryDate(qualificationDTO.getExpiryDate());
            qualification.setUpdateAt(new Date());
        }

        assert qualification != null : "Qualification cannot be null";
        return qualificationConverter.convertToResponse(this.qualificationRepository.saveAndFlush(qualification));
    }

    @Override
    public QualificationResponse searchQualifications(int pageNo, int pageSize, QualificationSearch qualificationSearch) {
        return null;
    }

    @Transactional
    @Override
    public QualificationResponse deleteQualification(Long id) {

        Qualification qualification = this.qualificationRepository.findById(id).orElse(null);

        if(qualification != null) qualification.setStatus((short) 0);

        assert qualification != null;
        return this.qualificationConverter.convertToResponse(this.qualificationRepository.saveAndFlush(qualification));
    }

    @Override
    public Page<QualificationResponse> filterQualification(int pageNo, int pageSize, QualificationSearch qualificationSearch) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Qualification> qualifications = this.qualificationRepository.findByStatusAndKeyword(qualificationSearch.getStatus(), qualificationSearch.getKeyword(), pageable);
        return qualifications.map((qualification) -> this.qualificationConverter.convertToResponse(qualification));
    }

    @Transactional
	@Override
	public void importDataFromExcel(MultipartFile multipartFile) {
		try {
            List<QualificationDTO> qualifications = ExcelHelper.excelToQualificationEntities(multipartFile.getInputStream());

            for(QualificationDTO it : qualifications) {
            	Qualification qualification = this.qualificationConverter.convertToEntity(it);
            	this.qualificationRepository.save(qualification);
            }
            
        } catch (IOException e) {
            throw new RuntimeException("fail to store data: " + e.getMessage());
        }
	}
}
