package com.csc.monitoring.Internetmonitoring;

public class UploadFilesDetail {
	private long requestno;
	private boolean status;
	private String inputFileName;
	private String fileSubmittedDate;
	
	public long getRequestno() {
		return requestno;
	}
	public void setRequestno(long requestno) {
		this.requestno = requestno;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getInputFileName() {
		return inputFileName;
	}
	public void setInputFileName(String inputFileName) {
		this.inputFileName = inputFileName;
	}
	public String getFileSubmittedDate() {
		return fileSubmittedDate;
	}
	public void setFileSubmittedDate(String fileSubmittedDate) {
		this.fileSubmittedDate = fileSubmittedDate;
	}
	
	
	
}
