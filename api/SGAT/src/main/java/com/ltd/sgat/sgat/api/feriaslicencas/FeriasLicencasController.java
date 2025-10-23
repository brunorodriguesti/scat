package com.ltd.sgat.sgat.api.feriaslicencas;

import com.ltd.sgat.sgat.api.feriaslicencas.dto.FeriasLicencasDTO;
import com.ltd.sgat.sgat.domain.feriaslicencas.FeriasLicencasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ferias-licencas")
public class FeriasLicencasController {

    @Autowired
    private FeriasLicencasService feriasLicencasService;

    @GetMapping
    public ResponseEntity<List<FeriasLicencasDTO>> getAllFeriasLicencas() {
        List<FeriasLicencasDTO> feriasLicencas = feriasLicencasService.findAll();
        return ResponseEntity.ok(feriasLicencas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeriasLicencasDTO> getFeriasLicencasById(@PathVariable Long id) {
        return feriasLicencasService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FeriasLicencasDTO> createFeriasLicencas(@RequestBody FeriasLicencasDTO feriasLicencasDTO) {
        try {
            FeriasLicencasDTO savedFeriasLicencas = feriasLicencasService.save(feriasLicencasDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedFeriasLicencas);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeriasLicencasDTO> updateFeriasLicencas(@PathVariable Long id, @RequestBody FeriasLicencasDTO feriasLicencasDTO) {
        try {
            return feriasLicencasService.update(id, feriasLicencasDTO)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeriasLicencas(@PathVariable Long id) {
        if (feriasLicencasService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
