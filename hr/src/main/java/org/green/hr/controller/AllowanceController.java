package org.green.hr.controller;

import org.green.core.constant.Constant;
import org.green.core.model.response.CoreResponse;
import org.green.hr.dto.AllowanceDTO;
import org.green.hr.model.request.AllowanceSearch;
import org.green.hr.model.response.AllowanceResponse;
import org.green.hr.service.IAllowanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/hr/allowances")
public class AllowanceController {

	@Autowired
	private IAllowanceService iAllowanceService;

	@GetMapping("/search")
	public ResponseEntity<CoreResponse> getAllAllowances(
			@RequestParam(name = "pageNo", defaultValue = "1", required = false) int pageNo,
			@RequestParam(name = "pageSize", defaultValue = "10", required = false) int pageSize,
			@RequestParam(name = "status", required = false) Short status,
			@RequestParam(name = "keyword", required = false) String keyword) {
		AllowanceSearch allowanceSearch = new AllowanceSearch(status, keyword);

		CoreResponse coreResponse = new CoreResponse().setCode(Constant.SUCCESS).setMessage(Constant.SUCCESS_MESSAGE)
				.setData(this.iAllowanceService.filterAllwance(pageNo - 1, pageSize, allowanceSearch));

		return ResponseEntity.ok().body(coreResponse);
	}

	@GetMapping("/{id}")
	public ResponseEntity<CoreResponse> getAllwanceById(@PathVariable("id") Long id) {

		AllowanceResponse allowanceResponse = this.iAllowanceService.getById(id);

		CoreResponse coreResponse = new CoreResponse().setCode(Constant.SUCCESS).setMessage(Constant.SUCCESS_MESSAGE)
				.setData(allowanceResponse);

		return ResponseEntity.ok().body(coreResponse);
	}

	@PostMapping("/create")
	public ResponseEntity<CoreResponse> createAllowance(@RequestBody(required = false) AllowanceDTO allowanceDTO) {

		AllowanceResponse allowanceResponse = this.iAllowanceService.handleCreateAllowance(allowanceDTO);

		CoreResponse coreResponse = new CoreResponse().setCode(Constant.SUCCESS).setMessage("Create successfuly")
				.setData(allowanceResponse);
		return ResponseEntity.ok().body(coreResponse);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<CoreResponse> updateAllwance(@PathVariable("id") Long id, @RequestBody(required = false) AllowanceDTO allowanceDTO) {
		AllowanceResponse allowanceResponse = this.iAllowanceService.handleUpdateAllowance(allowanceDTO, id);

		CoreResponse coreResponse = new CoreResponse().setCode(Constant.SUCCESS).setMessage("Update successfuly")
				.setData(allowanceResponse);
		return ResponseEntity.ok().body(coreResponse);
	}
	
	@PutMapping("/delete/{id}")
	public ResponseEntity<CoreResponse> deleteAllowance(@PathVariable("id") Long id, @RequestBody(required = false) AllowanceDTO allowanceDTO){
		AllowanceResponse allowanceResponse = this.iAllowanceService.handleDeleteAllowance(allowanceDTO);
		CoreResponse coreResponse = new CoreResponse().setCode(Constant.SUCCESS).setMessage("Delete successfuly")
				.setData(allowanceResponse);
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
			this.iAllowanceService.importDataFromExcel(file);

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
