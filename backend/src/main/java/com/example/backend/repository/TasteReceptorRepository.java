package com.example.backend.repository;

import com.example.backend.entity.TasteReceptor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TasteReceptorRepository extends JpaRepository<TasteReceptor,Long> {
}
