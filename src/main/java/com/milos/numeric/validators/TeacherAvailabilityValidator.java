package com.milos.numeric.validators;

import com.milos.numeric.Authority;
import com.milos.numeric.entities.Employee;
import com.milos.numeric.services.EmployeeService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class TeacherAvailabilityValidator implements ConstraintValidator<TeacherAvailability, String>
{
    @Autowired
    private EmployeeService employeeService;

    @Override
    public void initialize(TeacherAvailability constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);

    }

    @Override
    public boolean isValid(String username, ConstraintValidatorContext constraintValidatorContext)
    {
        Optional< Employee> optional = this.employeeService.findByUsername(username);

        if (optional.isEmpty())
        {
            return false;
        }

        Employee employee = optional.get();

        return employee.getPersonalInfo().isEnabled();
    }


}

