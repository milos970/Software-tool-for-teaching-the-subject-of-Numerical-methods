package com.milos.numeric.services;

import com.milos.numeric.entities.Pdf;
import com.milos.numeric.entities.PersonalInfo;
import com.milos.numeric.repositories.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FileService
{
    private final FileRepository fileRepository;


    @Autowired
    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;

    }

    public Pdf store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Pdf pdf = new Pdf(file.getBytes(), fileName);

        return this.fileRepository.save(pdf);
    }


    public List<PersonalInfo> convert(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Pdf pdf = new Pdf(file.getBytes(), fileName);

        return null;
    }

    public Pdf getFile(int id) {
        return this.fileRepository.findById(id).get();
    }

    public List<Pdf> getAllFiles() {
        return this.fileRepository.findAll();
    }


    public void remove(int id)
    {
        this.fileRepository.deleteById(id);
    }
}
