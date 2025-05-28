package com.mph.tradefilemanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mph.tradefilemanagement.dao.FileLoadRepository;
import com.mph.tradefilemanagement.model.FileLoad;
import com.mph.tradefilemanagement.model.FileLoadRequestDTO;
import com.mph.tradefilemanagement.model.FileLoadResponseDTO;
import com.mph.tradefilemanagement.model.SearchCriteriaDTO;

@Service
public class FileLoadService {
	@Autowired
	FileLoadRepository fileLoadRepository;

	// PostMapping
	public FileLoadResponseDTO createFileLoad(FileLoadRequestDTO fileLoadRequestDTO) {
		if (fileLoadRepository.existsByFilename(fileLoadRequestDTO.getFilename().toUpperCase())) {
			throw new IllegalArgumentException("File Already Exists");
		}
		if (fileLoadRequestDTO.getRecordCount() % 1 != 0) {
			throw new IllegalArgumentException("RecordCount should be integer");
		}
		FileLoad fileLoad = new FileLoad();
		fileLoad.setLocalDate(LocalDate.now());
		fileLoad.setFileName(fileLoadRequestDTO.getFilename().toUpperCase());
		fileLoad.setStatus(fileLoadRequestDTO.getStatus());
		fileLoad.setRecordCount(fileLoadRequestDTO.getRecordCount());
		fileLoad.setErrors(fileLoadRequestDTO.getErrors());
		fileLoad = fileLoadRepository.save(fileLoad);

		FileLoadResponseDTO responseDTO = new FileLoadResponseDTO();
		responseDTO.setId(fileLoad.getId());
		responseDTO.setFilename(fileLoad.getFileName());
		responseDTO.setLocalDate(fileLoad.getLocalDate());
		responseDTO.setStatus(fileLoad.getStatus());
		responseDTO.setRecordCount(fileLoad.getRecordCount());
		responseDTO.setErrors(fileLoad.getErrors());
		return responseDTO;

	}

	// GetMapping By Id
	public FileLoadResponseDTO getFileLoadById(Long id) {

		Optional<FileLoad> fileLoad = fileLoadRepository.findById(id);
		if (fileLoad.isPresent()) {
			FileLoad filePresent = fileLoad.get();
			FileLoadResponseDTO responseDTO = new FileLoadResponseDTO();
			responseDTO.setId(id);
			responseDTO.setFilename(filePresent.getFileName());
			responseDTO.setLocalDate(filePresent.getLocalDate());
			responseDTO.setStatus(filePresent.getStatus());
			responseDTO.setRecordCount(filePresent.getRecordCount());
			responseDTO.setErrors(filePresent.getErrors());
			return responseDTO;
		} else {
			throw new IllegalArgumentException("Resource Not Avilable");

		}

	}

	// GetMapping By Query parameters
	public List<FileLoad> searchFileLoads(SearchCriteriaDTO searchCriteria) {
		return fileLoadRepository.getSearchDetails(searchCriteria.getId(), searchCriteria.getFileName(),
				searchCriteria.getFromDate(), searchCriteria.getToDate(), searchCriteria.getStatus());
	}

	// PutMapping
	public FileLoadResponseDTO updateFileLoadStatus(Long id, String status) {
		if (status.matches("NEW|PROCESSED|FAILED")) {
			FileLoadResponseDTO fileLoadResponseDTO = getFileLoadById(id);
			FileLoad fileLoad = new FileLoad();
			fileLoad.setId(id);
			fileLoad.setFileName(fileLoadResponseDTO.getFilename());
			fileLoad.setLocalDate(fileLoadResponseDTO.getLocalDate());
			fileLoad.setStatus(status);
			fileLoad.setRecordCount(fileLoadResponseDTO.getRecordCount());
			fileLoad.setErrors(fileLoadResponseDTO.getErrors());

			FileLoad updatedFileLoad = fileLoadRepository.save(fileLoad);

			FileLoadResponseDTO updateResponseDTO = new FileLoadResponseDTO();
			updateResponseDTO.setId(id);
			updateResponseDTO.setFilename(updatedFileLoad.getFileName());
			updateResponseDTO.setLocalDate(updatedFileLoad.getLocalDate());
			updateResponseDTO.setStatus(updatedFileLoad.getStatus());
			updateResponseDTO.setRecordCount(updatedFileLoad.getRecordCount());
			updateResponseDTO.setErrors(updatedFileLoad.getErrors());

			return updateResponseDTO;
		} else {
			throw new IllegalArgumentException("The status should be NEW|PROCESSED|FAILED");
		}

	}

	// DeleteMapping
	public void deleteFileLoad(Long id) {

		FileLoadResponseDTO fileLoadResponseDTO = getFileLoadById(id);
		fileLoadRepository.deleteById(fileLoadResponseDTO.getId());

	}
}
