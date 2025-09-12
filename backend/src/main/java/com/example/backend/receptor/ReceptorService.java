package com.example.backend.receptor;

import com.example.backend.receptor.entity.OdorReceptor;
import com.example.backend.receptor.entity.TasteReceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceptorService {

    private final TasteReceptorRepository tasteReceptorRepository;
    private final OdorReceptorRepository odorReceptorRepository;

    public List<TasteReceptor> getAllTasteReceptors(Pageable pageable)
    {
        return tasteReceptorRepository.findAll(pageable).getContent();
    }

    public List<OdorReceptor> getAllOdorReceptors(Pageable pageable)
    {
        return odorReceptorRepository.findAll(pageable).getContent();
    }
}
