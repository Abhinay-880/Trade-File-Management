package com.mph.tradefilemanagement.model;

import java.sql.Date;

public class SearchCriteriaDTO {
	private Long id;
	private String filename;
	private String status;
	private Date fromDate;
	private Date toDate;

	public SearchCriteriaDTO(Long id2, String fileName2, String status2, Date fromDate2, Date toDate2) {
		this.id = id2;
		this.filename = fileName2;
		this.status = status2;
		this.fromDate = fromDate2;
		this.toDate = toDate2;

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFileName() {
		return filename;
	}

	public void setFileName(String fileName) {
		this.filename = fileName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

}
