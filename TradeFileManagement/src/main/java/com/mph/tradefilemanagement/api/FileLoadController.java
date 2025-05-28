package com.mph.tradefilemanagement.api;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mph.tradefilemanagement.model.FileLoad;
import com.mph.tradefilemanagement.model.FileLoadRequestDTO;
import com.mph.tradefilemanagement.model.FileLoadResponseDTO;
import com.mph.tradefilemanagement.model.SearchCriteriaDTO;
import com.mph.tradefilemanagement.service.FileLoadService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/file-loads")
@CrossOrigin(origins ="http://localhost:4200",methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class FileLoadController {

	@Autowired
	FileLoadService fileloadservice;

	@PostMapping("/create")
	public void saveDetails(@RequestBody @Valid FileLoadRequestDTO fileloadrequestdto) {
		fileloadservice.createFileLoad(fileloadrequestdto);
	}

	@GetMapping("/{id}")
	public ResponseEntity<FileLoadResponseDTO> displayById(@PathVariable Long id) {
		return ResponseEntity.ok(fileloadservice.getFileLoadById(id));
	}

	@GetMapping("/searchFileLoads")
	public ResponseEntity<List<FileLoad>> displayAllDetails(@RequestParam(required = false) Long id,
			@RequestParam(required = false) String fileName, @RequestParam(required = false) String status,
			@RequestParam(required = false) Date fromDate, @RequestParam(required = false) Date toDate) {
		SearchCriteriaDTO searchCriteriaDTO = new SearchCriteriaDTO(id, fileName, status, fromDate, toDate);
		List<FileLoad> search = fileloadservice.searchFileLoads(searchCriteriaDTO);
		return ResponseEntity.ok(search);
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<FileLoadResponseDTO> updateDetails(@PathVariable Long id, @RequestBody String status) {
		return ResponseEntity.ok(fileloadservice.updateFileLoadStatus(id, status));
	}

	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable Long id) {
		fileloadservice.deleteFileLoad(id);
	}

}
