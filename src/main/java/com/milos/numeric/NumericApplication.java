package com.milos.numeric;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;


@SpringBootApplication
@EnableScheduling
public class NumericApplication
{
	public static void main(String[] args)
	{
		SpringApplication.run(NumericApplication.class, args);
	}

}



