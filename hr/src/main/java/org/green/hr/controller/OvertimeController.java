package org.green.hr.controller;


import static org.green.core.constant.Constant.SUCCESS;
import static org.green.core.constant.Constant.SUCCESS_MESSAGE;

import jakarta.validation.Valid;
import org.green.core.model.response.CoreResponse;
import org.green.hr.dto.OvertimeDTO;
import org.green.hr.repository.OverTimeRepository;
import org.green.hr.service.IOverTimeService;
import org.green.hr.service.impl.OverTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hr/overtime")

public class OvertimeController {

  @Autowired
  private OverTimeRepository overTimeRepository;
  @Autowired
  private IOverTimeService iOverTimeService;
  @Autowired
  private OverTimeService overTimeService;

  @PostMapping("/addOvertime")
  ResponseEntity<CoreResponse> addOvertime(@RequestBody @Valid OvertimeDTO overtimeDTO) {
    OvertimeDTO addOvertime = overTimeService.addOverTime(overtimeDTO);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(addOvertime);
    return ResponseEntity.ok(response);
  }
  @PostMapping("/updateOvertime/{overtimeId}")
  ResponseEntity<CoreResponse> updateOvertime(@PathVariable("overtimeId") @Valid long overtimeId,
      @RequestBody @Valid OvertimeDTO overtimeDTO) {
    OvertimeDTO updateOvertime = overTimeService.updateOvertime(overtimeId,overtimeDTO);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(updateOvertime);
    return ResponseEntity.ok(response);
  }
  @DeleteMapping("deleteOvertime/{overtimeId}")
  ResponseEntity<CoreResponse> deleteOvertime(@PathVariable("overtimeId") long overtimeId) {
    OvertimeDTO deletedOvertime = overTimeService.deleteOvertime(overtimeId);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(deletedOvertime);
    return ResponseEntity.ok(response);
  }
  @GetMapping("/getAllOvertime")
  ResponseEntity<CoreResponse> getAllOvertime() {
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(iOverTimeService.getAllOvertimes());
    return ResponseEntity.ok(response);
  }
  @GetMapping("/getOvertimeById/{overtimeId}")
  ResponseEntity<CoreResponse> getOvertimeById(@PathVariable("overtimeId") long overtimeId) {
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(iOverTimeService.getOvertimeById(overtimeId));
    return ResponseEntity.ok(response);
  }
}
