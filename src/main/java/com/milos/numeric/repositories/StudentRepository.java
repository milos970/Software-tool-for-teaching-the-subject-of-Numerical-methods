package com.milos.numeric.repositories;

import com.milos.numeric.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>
{
    public List<Student> findAllByOrderByPointsDesc();


}