package org.green.education.controller;

import org.green.core.model.CoreResponse;
import org.green.education.service.IDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {
    @Autowired
    public IDashboardService dashboardService;

    @GetMapping("")
    public CoreResponse<?> getReserveList() {
        return dashboardService.getListWithMonth();
    }
}
