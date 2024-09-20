package org.green.hr.util;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.green.hr.dto.AllowanceDTO;
import org.green.hr.dto.PositionDTO;
import org.green.hr.dto.QualificationDTO;
import org.green.hr.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
public class ExcelHelper {

    @Autowired
    private PositionRepository positionRepository;


    public static List<QualificationDTO> excelToQualificationEntities(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            List<QualificationDTO> qualificationDTOs = new ArrayList<>();
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

            rows.next();

            while (rows.hasNext()) {
                Row row = rows.next();
                QualificationDTO dto = new QualificationDTO();

                dto.setQualificationName(row.getCell(0).getStringCellValue());
                dto.setEmployeeName(row.getCell(1).getStringCellValue());

                String expiryDateString = row.getCell(2).getStringCellValue();
                Date expiryDate = dateFormat.parse(expiryDateString);
                dto.setExpiryDate(expiryDate);
                dto.setStatus((short) 1);

                qualificationDTOs.add(dto);
            }

            workbook.close();
            return qualificationDTOs;
        } catch (Exception e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }

    public static List<PositionDTO> excelToPositionEntities(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            List<PositionDTO> positionDTOs = new ArrayList<>();

            rows.next();

            while (rows.hasNext()) {
                Row row = rows.next();
                PositionDTO dto = new PositionDTO();

                dto.setPositionName(row.getCell(0).getStringCellValue());
                dto.setDepartmentName(row.getCell(1).getStringCellValue());
                dto.setStatus((short) 1);

                positionDTOs.add(dto);
            }

            workbook.close();
            return positionDTOs;
        } catch (Exception e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }

    public List<AllowanceDTO> excelToAllowanceEntities(InputStream inputStream) {
        List<AllowanceDTO> allowanceDTOS = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            // Skip header row
            if (rows.hasNext()) {
                rows.next();
            }

            while (rows.hasNext()) {
                Row row = rows.next();
                AllowanceDTO dto = new AllowanceDTO();

                Cell cell = row.getCell(0);
                if (cell != null) {
                    dto.setAllowanceCategory(cell.getStringCellValue());
                }

                cell = row.getCell(1);
                if (cell != null && cell.getCellType() == CellType.NUMERIC) {
                    dto.setAllowanceSalary((float) cell.getNumericCellValue());
                }

                cell = row.getCell(2);
                if (cell != null) {
                    String positionName = cell.getStringCellValue();
                    Long positionId = this.positionRepository.findByPositionName(positionName).getId();
                    dto.setPositionId(positionId);
                }

                dto.setStatus((short) 1);

                allowanceDTOS.add(dto);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the stack trace for debugging
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }

        return allowanceDTOS;
    }

}
