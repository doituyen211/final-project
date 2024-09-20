package org.green.education.service;

import org.green.core.model.CoreResponse;
import org.green.education.dto.DashboardDTO;
import org.green.education.repository.ILeaveOfAbsenceRepository;
import org.green.education.response.DashboardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService implements IDashboardService {
    @Autowired
    private ILeaveOfAbsenceRepository repository;

    @Override
    public CoreResponse<?> getListWithMonth() {
        List<Date> dateList = repository.getListWithMonth();

        // Chuyển đổi danh sách các Date thành LocalDate
        Map<Integer, Map<Integer, Long>> yearMonthCountMap = dateList.stream()
                .map(date -> date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate())
                .collect(Collectors.groupingBy(
                        LocalDate::getYear, // Nhóm theo năm
                        Collectors.groupingBy(
                                LocalDate::getMonthValue, // Nhóm theo tháng
                                Collectors.counting() // Đếm số lượng phần tử
                        )
                ));

        // Tạo danh sách DashboardResponse
        List<DashboardResponse> dashboardResponses = yearMonthCountMap.entrySet().stream()
                .map(yearEntry -> {
                    int year = yearEntry.getKey();
                    List<DashboardDTO> dashboardData = new ArrayList<>();

                    // Tạo DashboardDTO cho từng tháng từ 1 đến 12
                    for (int month = 1; month <= 12; month++) {
                        long total = yearEntry.getValue().getOrDefault(month, 0L); // Lấy tổng số phần tử của tháng, mặc định là 0 nếu không có
                        dashboardData.add(new DashboardDTO(month, (int) total));
                    }

                    return new DashboardResponse(year, dashboardData);
                })
                .collect(Collectors.toList());

        return CoreResponse.builder()
                .code(HttpStatus.OK.value())
                .message("")
                .data(dashboardResponses)
                .build();
    }

}
