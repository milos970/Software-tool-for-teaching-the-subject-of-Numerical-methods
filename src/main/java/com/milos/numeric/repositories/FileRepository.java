package com.milos.numeric.repositories;

import com.milos.numeric.entities.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, Long>
{
    public boolean existsByName(String name);

    public Optional<File> findByName(String name);

    public Optional<File> findById(Long id);

}

