package com.example.backend.controller;

import com.example.backend.entity.OdorReceptor;
import com.example.backend.entity.TasteReceptor;
import com.example.backend.service.ReceptorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("receptors")
@RequiredArgsConstructor
public class ReceptorController {

    private final ReceptorService receptorService;

    @GetMapping("/taste")
    public ResponseEntity<List<TasteReceptor>> getAllTasteReceptors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {

        Pageable pageable = PageRequest.of(page, limit);
        return ResponseEntity.ok(receptorService.getAllTasteReceptors(pageable));
    }

    @GetMapping("/odor")
    public ResponseEntity<List<OdorReceptor>> getAllOdorReceptors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return ResponseEntity.ok(receptorService.getAllOdorReceptors(pageable));
    }

}
