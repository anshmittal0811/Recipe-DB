package com.example.backend.receptor;

import com.example.backend.receptor.entity.TasteReceptor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasteReceptorRepository extends JpaRepository<TasteReceptor,Long> {
}
