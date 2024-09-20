package org.green.hr.controller;

import static org.green.core.constant.Constant.SUCCESS;
import static org.green.core.constant.Constant.SUCCESS_MESSAGE;

import jakarta.validation.Valid;
import org.green.core.model.response.CoreResponse;
import org.green.hr.dto.TimeOffDTO;
import org.green.hr.repository.TimeOffRepository;
import org.green.hr.service.ITimeOffService;
import org.green.hr.service.impl.TimeOffService;
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
@RequestMapping("/hr/timeOff")
public class TimeOffController {

  @Autowired
  private TimeOffRepository timeOffRepository;
  @Autowired
  private ITimeOffService iTimeOffService;
  @Autowired
  private TimeOffService timeOffService;

  @PostMapping("/addTimeOff")
  ResponseEntity<CoreResponse> addTimeOff(@RequestBody @Valid TimeOffDTO timeOffDTO) {
    TimeOffDTO addTimeOff = timeOffService.addTimeOff(timeOffDTO);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(addTimeOff);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/updateTimeOff/{timeOffId}")
  ResponseEntity<CoreResponse> updateTimeOff(@PathVariable("timeOffId") long timeOffId,
      @RequestBody @Valid TimeOffDTO timeOffDTO) {
    TimeOffDTO updateTimeOff = timeOffService.updateTimeOff(timeOffId, timeOffDTO);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(updateTimeOff);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/deleteTimeOff/{timeOffId}")
  ResponseEntity<CoreResponse> deleteTimeOff(@PathVariable("timeOffId") long timeOffId) {
    TimeOffDTO deletedTimeOff = timeOffService.deleteTimeOff(timeOffId);
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(deletedTimeOff);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/getTimeOff")
  ResponseEntity<CoreResponse> getAllTimeOff() {
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(iTimeOffService.getTimeOff());
    return ResponseEntity.ok(response);
  }

  @GetMapping("/getTimeOff/{timeOffId}")
  ResponseEntity<CoreResponse> getTimeOffById(@PathVariable("timeOffId") long timeOffId) {
    CoreResponse response = new CoreResponse()
        .setCode(SUCCESS)
        .setMessage(SUCCESS_MESSAGE)
        .setData(iTimeOffService.getTimeOffById(timeOffId));
    return ResponseEntity.ok(response);
  }
}
