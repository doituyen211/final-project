package org.green.hr.controller;

import org.green.core.constant.Constant;
import org.green.core.model.response.CoreResponse;
import org.green.hr.dto.PositionDTO;
import org.green.hr.model.request.PositionSearch;
import org.green.hr.service.IPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
@RequestMapping("/hr/positions")
public class PositionController {

    @Autowired
    private IPositionService iPositionService;

    @GetMapping("/all")
    public ResponseEntity<CoreResponse> getAllPositions() {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage("Get all positions success")
                .setData(this.iPositionService.getAllPositions());
        return ResponseEntity.ok().body(coreResponse);
    }
    
    @GetMapping("/search")
    public ResponseEntity<CoreResponse> searchPositions(@RequestParam(name = "pageNo", defaultValue = "1", required = false) int pageNo,
                                                             @RequestParam(name = "pageSize", defaultValue = "10", required = false) int pageSize,
                                                             @RequestParam(name = "status", required = false) Short status,
                                                             @RequestParam(name = "keyword", required = false) String keyword) {

        PositionSearch positionSearch = new PositionSearch(status, keyword);

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage("Filter success")
                .setData(this.iPositionService.filterPosition(pageNo - 1, pageSize, positionSearch));
        return ResponseEntity.ok().body(coreResponse);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CoreResponse> getPosition(@PathVariable("id") Long id) {
    	
    	CoreResponse coreResponse = new CoreResponse()
    			.setCode(Constant.SUCCESS)
    			.setMessage(Constant.SUCCESS_MESSAGE)
    			.setData(this.iPositionService.handelGetPosition(id));
    	
    	return ResponseEntity.ok().body(coreResponse);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<CoreResponse> updatePosition(@PathVariable("id") Long id, @RequestBody(required = false) PositionDTO positionDTO) {
        
    	CoreResponse coreResponse = new CoreResponse()
    			.setCode(Constant.SUCCESS)
    			.setMessage("Update position success")
    			.setData(this.iPositionService.handleUpdatePosition(positionDTO, id));
    	
        return ResponseEntity.ok().body(coreResponse);
    }
    
    @PostMapping("/create")
    public ResponseEntity<CoreResponse> createPosition(@RequestBody(required = false) PositionDTO positionDTO) {
        
    	CoreResponse coreResponse = new CoreResponse()
    			.setCode(Constant.SUCCESS)
    			.setMessage(Constant.SUCCESS_MESSAGE)
    			.setData(this.iPositionService.handleAddPosition(positionDTO));
    	
        return ResponseEntity.ok().body(coreResponse);
    }
    
    @PutMapping("/delete/{id}")
    public ResponseEntity<CoreResponse> deletePosition(@PathVariable("id") Long id) {
    	
    	CoreResponse coreResponse = new CoreResponse()
    			.setCode(Constant.SUCCESS)
    			.setMessage(Constant.SUCCESS_MESSAGE)
    			.setData(this.iPositionService.handleDeletePosition(id));
    	
    	return ResponseEntity.ok().body(coreResponse);
    }
    
    @PostMapping("/upload/excel")
    public ResponseEntity<CoreResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
        	
        	CoreResponse coreResponse = new CoreResponse()
        			.setCode(Constant.NO_CONTENT)
        			.setMessage(Constant.NO_CONTENT_MESSAGE);
        	
            return ResponseEntity.status(Constant.NO_CONTENT).body(coreResponse);
        }

        try {
            this.iPositionService.importDataFromExcel(file);
            
            CoreResponse coreResponse = new CoreResponse()
        			.setCode(Constant.SUCCESS)
        			.setMessage(Constant.SUCCESS_MESSAGE);
        	
            return ResponseEntity.status(Constant.NO_CONTENT).body(coreResponse);
        } catch (Exception e) {
        	
        	CoreResponse coreResponse = new CoreResponse()
        			.setCode(HttpStatus.EXPECTATION_FAILED.value())
        			.setMessage("Failed to upload and process file: " + e.getMessage());
        	
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(coreResponse);
        }
    }
    

}
