package com.csc.monitoring.upload;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.csc.monitoring.Internetmonitoring.UploadFilesDetail;


@Controller
public class UploadController { 

	List<String> files = new ArrayList<String>();

	@GetMapping("/upload")
	public String listUploadedFiles(Model model) {
		System.out.println("In Controller");
		return "uploadForm";
	}
	@PostMapping("/uploadFile")
	public @ResponseBody List<UploadFilesDetail> handleFileUpload(@RequestParam("file") MultipartFile file, Model model) {
		List<UploadFilesDetail> details = new ArrayList<UploadFilesDetail>();
		try {
			//Call Rest Api to save the file in DB
			//Calling rest api for monitoring (Mock)
			RestTemplate restTemplate = new RestTemplate();
			//details = (List<UploadFilesDetail>) restTemplate.getForObject("http://localhost:8080/uploadRequestFileDetails", UploadFilesDetail.class);
			ResponseEntity<UploadFilesDetail[]> response = restTemplate.getForEntity("http://localhost:8080/uploadRequestFileDetails", UploadFilesDetail[].class);
			details = Arrays.asList(response.getBody());
			model.addAttribute("message", "You successfully uploaded " + file.getOriginalFilename() + "!" +"Hit refresh button to get the status of the upload file");
			/*model.addAttribute("uploadFileDetails",details);*/
		} catch (Exception e) {
			model.addAttribute("message", "Failed to uploaded " + file.getOriginalFilename() + "!" +"Hit refresh button to get the status of the upload file");
			UploadFilesDetail uploadFile = new UploadFilesDetail();
			uploadFile.setStatus(false);
			details.add(uploadFile);
			return details;
		}
		return details;
	}
}