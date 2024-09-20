package org.green.hr.service.impl;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.green.hr.converter.PositionConverter;
import org.green.hr.dto.PositionDTO;
import org.green.hr.entity.Position;
import org.green.hr.model.request.PositionSearch;
import org.green.hr.model.response.PositionResponse;
import org.green.hr.repository.DepartmentRepository;
import org.green.hr.repository.PositionRepository;
import org.green.hr.service.IPositionService;
import org.green.hr.util.ExcelHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;

@Service
public class PositionService implements IPositionService {

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PositionConverter positionConverter;

    @Override
    public Page<PositionResponse> filterPosition(int pageNo, int pageSize, PositionSearch positionSearch) {

        Pageable pageable = PageRequest.of(pageNo, pageSize);

        Page<Position> prositionPage = this.positionRepository.findByStatusAndKeyword(positionSearch.getStatus(), positionSearch.getKeyword(), pageable);

        return prositionPage.map(item -> this.positionConverter.convertToResponse(item));
    }

    @Transactional
    @Override
    public PositionResponse handleUpdatePosition(PositionDTO positionDTO, Long id) {

        Position position = this.positionRepository.findById(id).orElse(null);

        if (position != null) {
            position.setId(id);
            position.setPositionName(positionDTO.getPositionName());
            position.setStatus(positionDTO.getStatus());
            position.setDepartment(this.departmentRepository.findByDepartmentName(positionDTO.getDepartmentName()));
            position.setUpdateAt(new Date());
        }

        Position updatedPosition = this.positionRepository.save(position);

        return this.positionConverter.convertToResponse(updatedPosition);
    }

    @Transactional
    @Override
    public PositionResponse handleAddPosition(PositionDTO positionDTO) {

        Position position = this.positionConverter.convertToEntity(positionDTO);
        position.setCreateAt(new Date());

        Position newPosition = this.positionRepository.save(position);

        return this.positionConverter.convertToResponse(newPosition);
    }

    @Transactional
    @Override
    public PositionResponse handleDeletePosition(Long id) {

        Position position = this.positionRepository.findById(id).orElse(null);

        position.setStatus((short) 0);

        Position deletePosition = this.positionRepository.save(position);

        return this.positionConverter.convertToResponse(deletePosition);
    }

    @Override
    public PositionResponse handelGetPosition(Long id) {
        Position position = this.positionRepository.findById(id).orElse(null);

        return this.positionConverter.convertToResponse(position);
    }

    @Transactional
    @Override
    public void importDataFromExcel(MultipartFile multipartFile) {
        try {
            List<PositionDTO> positionDTOs = ExcelHelper.excelToPositionEntities(multipartFile.getInputStream());

            for (PositionDTO it : positionDTOs) {
                Position position = this.positionConverter.convertToEntity(it);
                position.setCreateAt(new Date());
                this.positionRepository.save(position);
            }

        } catch (IOException e) {
            throw new RuntimeException("fail to store data: " + e.getMessage());
        }
    }

    @Override
    public List<PositionResponse> getAllPositions() {
        List<Position> positions = this.positionRepository.findAll();
        return positions
                .stream()
                .map(item -> this.positionConverter.convertToResponse(item))
                .toList();
    }


}
