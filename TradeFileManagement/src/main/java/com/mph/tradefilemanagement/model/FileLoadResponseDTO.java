package com.mph.tradefilemanagement.model;

import java.time.LocalDate;

public class FileLoadResponseDTO {
	private Long id;
	private String filename;
	private LocalDate localDate;
	private String status;
	private Double recordcount;
	private String errors;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public LocalDate getLocalDate() {
		return localDate;
	}

	public void setLocalDate(LocalDate localDate) {
		this.localDate = localDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public double getRecordCount() {
		return recordcount;
	}

	public void setRecordCount(double recordCount) {
		this.recordcount = recordCount;
	}

	public String getErrors() {
		return errors;
	}

	public void setErrors(String errors) {
		this.errors = errors;
	}

}
