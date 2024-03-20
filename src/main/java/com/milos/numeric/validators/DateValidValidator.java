package com.milos.numeric.validators;

import com.milos.numeric.Authority;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;
import java.util.Arrays;
import java.util.Date;

public class DateValidValidator implements ConstraintValidator<DateValid, String>
{

    @Override
    public void initialize(DateValid constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext)
    {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter
                .ofPattern("dd.MM.uuuu HH:mm")
                .withResolverStyle(ResolverStyle.STRICT);
        LocalDateTime receivedDate = null;
        try {
            receivedDate = LocalDateTime.parse(value, dateTimeFormatter);

        } catch (DateTimeParseException e) {
            // Throw invalid date message
            System.out.println("Exception was thrown");
            return false;
        }


        String formattedString = LocalDateTime.now().format(dateTimeFormatter);

        LocalDateTime now = LocalDateTime.parse(formattedString, dateTimeFormatter);

        if (receivedDate.isAfter(now))
        {
            System.out.println("OK!");
            return true;
        }

        System.out.println("NOT!");
        return false;
    }
}
