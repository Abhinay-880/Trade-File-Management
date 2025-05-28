package com.mph.tradefilemanagement.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;

public class FileLoadRequestDTO {
	@NotNull(message = "please upload file")
	@Pattern(regexp = ".*\\.csv$", message = "file should be .csv extention")
	private String filename;
	@Pattern(regexp = "NEW|FAILED|PROCESSED", message = "status must be new,processed,failed")
	private String status;
	@PositiveOrZero(message = "value must be positive or zero")
	private Double recordcount;
	private String errors;

	public String getFilename() {
		return filename;
	}

	public void setFilename(String fileName) {
		this.filename = fileName;
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
