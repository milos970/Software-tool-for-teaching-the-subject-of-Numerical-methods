package com.milos.numeric.controllers;

import com.milos.numeric.dtos.NewPasswordDTO;
import com.milos.numeric.security.MyUserDetails;
import com.milos.numeric.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @Autowired
    private PersonService personService;



    @GetMapping("/login")
    public String login()
    {
        return "login";
    }



    @GetMapping("/admin")
    public String admin(@AuthenticationPrincipal MyUserDetails myUserDetails, Model model)
    {
        String username = myUserDetails.getUsername();
        model.addAttribute("username", username);
        return "admin";
    }

    @GetMapping("/student")
    public String student(@AuthenticationPrincipal MyUserDetails myUserDetails, Model model)
    {
        String username = myUserDetails.getUsername();
        model.addAttribute("username", username);
        model.addAttribute("newPasswordDTO", new NewPasswordDTO());
        return "student";
    }


    @GetMapping("/registration")
    public String registration(Model model)
    {
        return "registration";
    }


    @GetMapping("/file/upload-csv-page")
    public String uploadCSV(Model model)
    {
        return "upload-csv";
    }


















//tu spraviť generovanie metod
    @GetMapping("/newton")
    public String newton() {
        return "newton-nonlinear";
    }

    @GetMapping("/simple")
    public String simple() {
        return "simple-iteration";
    }

    @GetMapping("/bisection")
    public String bisection() {
        return "bisection";
    }


    @GetMapping("/regula-falsi")
    public String regula() {
        return "regula-falsi";
    }
}
