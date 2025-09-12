package com.example.backend.receptor;

import com.example.backend.receptor.entity.OdorReceptor;
import com.example.backend.receptor.entity.TasteReceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/receptors")
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
