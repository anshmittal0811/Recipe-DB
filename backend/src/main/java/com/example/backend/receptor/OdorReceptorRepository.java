package com.example.backend.receptor;

import com.example.backend.receptor.entity.OdorReceptor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OdorReceptorRepository extends JpaRepository<OdorReceptor,Long> {
}
