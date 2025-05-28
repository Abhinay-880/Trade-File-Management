package com.mph.tradefilemanagement.api;

import java.io.File;
import java.io.IOException;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
@CrossOrigin(origins ="http://localhost:4200",methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class BatchController {
	@Autowired
	private JobLauncher jobLauncher;
	@Autowired
	private Job job;
	@Value("${batch.path}")
	private String TEMP_STORAGE;

	@PostMapping("/importfile")
	public void importCsvToDBJob(@RequestParam("file") MultipartFile multipartFile)
			throws IllegalStateException, IOException {

		try {
			String originalFileName = multipartFile.getOriginalFilename().toUpperCase();
			if(originalFileName.endsWith(".CSV")) {
				File fileToImport = new File(TEMP_STORAGE + originalFileName);
				multipartFile.transferTo(fileToImport);

				JobParameters jobParameters = new JobParametersBuilder()
						.addString("fullPathFileName", TEMP_STORAGE + originalFileName)
						.addLong("startAt", System.currentTimeMillis()).toJobParameters();
				@SuppressWarnings("unused")
				JobExecution execution = jobLauncher.run(job, jobParameters);
			}else {
				throw new IllegalArgumentException("FileName should be .csv");
			}
			
		} catch (JobExecutionAlreadyRunningException | JobRestartException | JobInstanceAlreadyCompleteException
				| JobParametersInvalidException e) {
			e.printStackTrace();
		}
	}
}
