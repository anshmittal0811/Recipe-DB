package com.example.backend.repository;

import com.example.backend.entity.OdorReceptor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OdorReceptorRepository extends JpaRepository<OdorReceptor,Long> {
}
