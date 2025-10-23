package com.ltd.sgat.sgat.api.feriado;

import com.ltd.sgat.sgat.api.feriado.dto.FeriadoDTO;
import com.ltd.sgat.sgat.domain.feriado.FeriadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feriados")
public class FeriadoController {

    @Autowired
    private FeriadoService feriadoService;

    @GetMapping
    public ResponseEntity<List<FeriadoDTO>> getAllFeriados() {
        List<FeriadoDTO> feriados = feriadoService.findAll();
        return ResponseEntity.ok(feriados);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeriadoDTO> getFeriadoById(@PathVariable Long id) {
        return feriadoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FeriadoDTO> createFeriado(@RequestBody FeriadoDTO feriadoDTO) {
        FeriadoDTO savedFeriado = feriadoService.save(feriadoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFeriado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeriadoDTO> updateFeriado(@PathVariable Long id, @RequestBody FeriadoDTO feriadoDTO) {
        return feriadoService.update(id, feriadoDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeriado(@PathVariable Long id) {
        if (feriadoService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
