package com.milos.numeric.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(min = 5, max = 100, message = "{validation.name.size.too_long}")
    @Column(unique = true)
    private String path;

    @Column(name = "name", unique = true)
    @Size(min = 1, max = 15, message = "{validation.name.size.too_long}")
    private String name;

    @Column(name = "mime_type")
    private String mimeType;

    @Size(max = 100, message = "{validation.name.size.too_long}")
    private String description;

    @Column(name = "uploaded_by")
    private String uploadedBy;


    private Long size;


}