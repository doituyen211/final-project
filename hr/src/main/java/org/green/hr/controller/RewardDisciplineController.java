package org.green.hr.controller;

import org.green.core.constant.Constant;
import org.green.core.model.response.CoreResponse;
import org.green.hr.dto.ContractDTO;
import org.green.hr.dto.RewardDisciplineDTO;
import org.green.hr.model.request.ContractSearch;
import org.green.hr.model.request.RDSearch;
import org.green.hr.service.IContractService;
import org.green.hr.service.IRewardDisciplineService;
import org.green.hr.util.UploadFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/hr/reward-disciplines")
@CrossOrigin
public class RewardDisciplineController {
    @Autowired
    private IRewardDisciplineService rewardDisciplineService;

    @Autowired
    private UploadFile uploadFile;

    @GetMapping("")
    public ResponseEntity<CoreResponse> getAllRewardDisciplines(@RequestParam(name = "page", defaultValue = "1", required = false) int pageNo,
                                                        @RequestParam(name = "size", defaultValue = "10", required = false) int pageSize) {

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(this.rewardDisciplineService.getAllRewardDisciplines(pageNo - 1, pageSize));

        return ResponseEntity.ok().body(coreResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoreResponse> getRewardDisciplineId(@PathVariable Long id) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage("Contract found")
                .setData(this.rewardDisciplineService.getRewardDisciplineById(id));

        return ResponseEntity.ok().body(coreResponse);
    }

    @PostMapping("/search")
    public ResponseEntity<CoreResponse> searchRewardDisciplines(@RequestParam(name = "page", defaultValue = "1", required = false) int pageNo,
                                                        @RequestParam(name = "size", defaultValue = "10", required = false) int pageSize,
                                                        @RequestBody RDSearch rdSearch) {

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage("Search success")
                .setData(this.rewardDisciplineService.searchRewardDisciplines(pageNo - 1, pageSize, rdSearch));

        return ResponseEntity.ok().body(coreResponse);
    }

    @GetMapping("/filter")
    public ResponseEntity<CoreResponse> filterRewardDisciplines(@RequestParam(name = "page", defaultValue = "1", required = false) int pageNo,
                                                        @RequestParam(name = "size", defaultValue = "10", required = false) int pageSize,
                                                        @RequestBody RDSearch rdSearch) {

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage("Filter success")
                .setData(this.rewardDisciplineService.filterRewardDisciplines(pageNo - 1, pageSize, rdSearch));

        return ResponseEntity.ok().body(coreResponse);
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CoreResponse> createRewardDiscipline(
            @RequestPart(value = "decisionDTO", required = false) RewardDisciplineDTO rewardDisciplineDTO,
            @RequestPart(value = "rdImages", required = false) MultipartFile rdImages) {

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage("Contract created")
                .setData(this.rewardDisciplineService.handleSaveRewardDiscipline(rewardDisciplineDTO, rdImages));

        return ResponseEntity.status(HttpStatus.CREATED).body(coreResponse);
    }

    @PutMapping(value = "/{id}" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CoreResponse> updateContract(
            @PathVariable(value = "id") Long id,
            @RequestPart(value = "decisionDTO", required = true) RewardDisciplineDTO rewardDisciplineDTO,
            @RequestPart(value = "rdImages", required = false) MultipartFile rdImages) {

        if (rewardDisciplineDTO == null) {
            return ResponseEntity.status(Constant.BAD_REQUEST)
                    .body(new CoreResponse()
                            .setCode(Constant.BAD_REQUEST)
                            .setMessage(Constant.BAD_REQUEST_MESSAGE));
        }

        try {
            CoreResponse coreResponse = new CoreResponse()
                    .setCode(Constant.SUCCESS)
                    .setMessage("Contract updated")
                    .setData(this.rewardDisciplineService.updateRewardDiscipline(rewardDisciplineDTO, rdImages, id));

            return ResponseEntity.ok().body(coreResponse);
        } catch (Exception e) {
            return ResponseEntity.status(Constant.INTERNAL_SERVER_ERROR)
                    .body(new CoreResponse()
                            .setCode(Constant.INTERNAL_SERVER_ERROR)
                            .setMessage(Constant.INTERNAL_SERVER_ERROR_MESSAGE));
        }
    }



    @PutMapping("/delete/{id}")
    public ResponseEntity<CoreResponse> deleteContract(@PathVariable Long id) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage("Contract deleted")
                .setData(this.rewardDisciplineService.deleteRewardDiscipline(id));

        return ResponseEntity.ok().body(coreResponse);
    }

    @PostMapping("/import")
    public ResponseEntity<CoreResponse> importDataFromExcel(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            CoreResponse coreResponse = new CoreResponse()
                    .setCode(Constant.NO_CONTENT)
                    .setMessage(Constant.NO_CONTENT_MESSAGE);

            return ResponseEntity.status(Constant.NO_CONTENT).body(coreResponse);
        }

        try {
            this.rewardDisciplineService.importDataFromExcel(file);

            CoreResponse coreResponse = new CoreResponse()
                    .setCode(Constant.SUCCESS)
                    .setMessage(Constant.SUCCESS_MESSAGE);

            return ResponseEntity.ok().body(coreResponse);
        } catch (Exception e) {
            CoreResponse coreResponse = new CoreResponse()
                    .setCode(HttpStatus.EXPECTATION_FAILED.value())
                    .setMessage("Failed to upload and process file: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(coreResponse);
        }
    }
}
