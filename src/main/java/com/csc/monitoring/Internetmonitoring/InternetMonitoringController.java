package com.csc.monitoring.Internetmonitoring;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("uploadRequestFileDetails")
public class InternetMonitoringController {
	
	@GetMapping(produces="application/json")
	public List<UploadFilesDetail> getUploadFilesDetail() {
		List<UploadFilesDetail> listDetails = new ArrayList<UploadFilesDetail>();
		try {
			byte[] jsonData = Files.readAllBytes(Paths.get("urls.json"));
			ObjectMapper objectMapper = new ObjectMapper();
			TypeReference<List<UploadFilesDetail>> mapType = new TypeReference<List<UploadFilesDetail>>() {};
			listDetails = objectMapper.readValue(jsonData, mapType);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return listDetails;
	}
	
	@GetMapping(value="uploadFile/{requestId}" ,produces="application/json")	
	public @ResponseBody List<UploadFileResult> getUploadFileResult(@PathVariable long requestId) {
		List<UploadFileResult> resultDetails = new ArrayList<UploadFileResult>();
		try {
			byte[] jsonData = Files.readAllBytes(Paths.get("result.json"));
			ObjectMapper objectMapper = new ObjectMapper();
			TypeReference<List<UploadFileResult>> mapType = new TypeReference<List<UploadFileResult>>() {};
			resultDetails = getResult(objectMapper.readValue(jsonData, mapType),requestId);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return resultDetails;
		
	}
	
	private List<UploadFileResult> getResult(List<UploadFileResult> results, long requestId){
		List<UploadFileResult> resultDetails = new ArrayList<UploadFileResult>();
		for (UploadFileResult uploadFileResult : results) {
			if(uploadFileResult.getRequestno()==requestId){
				resultDetails.add(uploadFileResult);
			}
		}
		return resultDetails;
	}
}
