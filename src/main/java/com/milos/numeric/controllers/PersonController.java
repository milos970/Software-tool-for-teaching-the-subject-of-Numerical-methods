package com.milos.numeric.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.milos.numeric.dtos.NewPasswordDTO;
import com.milos.numeric.dtos.NewPersonDTO;
import com.milos.numeric.dtos.NewAuthorityDTO;
import com.milos.numeric.entities.Person;
import com.milos.numeric.services.PersonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class PersonController
{
    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping("/user/create")
    public void createUser(@Valid @RequestBody NewPersonDTO NewPersonDTO)
    {
        //this.personService.create(NewPersonDTO);
    }

    @PatchMapping("/user/{id}/update-password")
    public void updatePassword(@PathVariable int id, @Valid @RequestBody NewPasswordDTO newPasswordDTO)
    {
        this.personService.updatePassword(id, newPasswordDTO);
    }

    @PatchMapping("admin/user/{id}/update-role")
    public void updateAuthority(@PathVariable int id, @Valid @RequestBody NewAuthorityDTO newAuthorityDTO)
    {
        this.personService.updateAuthority(id, newAuthorityDTO);
    }

    @GetMapping("/check-username")
    @ResponseBody
    public boolean checkUsername(@RequestParam("username") String username)
    {
        return this.personService.findByUsername(username);
    }

    @GetMapping("/check-personal-number")
    @ResponseBody
    public boolean checkPersonalNumber(@RequestParam("pin") String pin)
    {
        return this.personService.findByPIN(pin);
    }


    @PatchMapping("admin/user/{id}")
    public void deleteUser(@PathVariable int id)
    {
        this.personService.delete(id);
    }



    @PostMapping("/file/upload-csv")
    public void addCSV(@RequestParam("csv") MultipartFile file)
    {
        this.personService.createMultiple(file);
    }

    @PostMapping("/registrate")
    public void registratePerson(@Valid @RequestBody NewPersonDTO newPersonDTO)
    {
        this.personService.create(newPersonDTO, "sd");
    }


    @GetMapping("/admin/user")
    public ModelAndView getUsers()
    {
        List<Person> persons = this.personService.getAll();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("persons", persons);
        modelAndView.setViewName("users-list");
        return modelAndView;
    }


    @GetMapping("/admin/determine-gender/{name}")
    @ResponseBody
    private String determineGender(@PathVariable String name) {
        String uri = "https://api.genderize.io?name=" + name;
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode newNode = null;
        try {
             newNode = mapper.readTree(result);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return newNode.get("gender").asText();
    }


    @GetMapping("/admin/hi")
    @ResponseBody
    public String get() {
        System.out.println(54);
        return "665";
    }












}
