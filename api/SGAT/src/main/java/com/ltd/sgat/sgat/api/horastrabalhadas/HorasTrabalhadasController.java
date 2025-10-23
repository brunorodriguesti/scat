package com.ltd.sgat.sgat.api.horastrabalhadas;

import com.ltd.sgat.sgat.api.horastrabalhadas.dto.HorasTrabalhadasDTO;
import com.ltd.sgat.sgat.domain.horastrabalhadas.HorasTrabalhadasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/horas-trabalhadas")
public class HorasTrabalhadasController {

    @Autowired
    private HorasTrabalhadasService horasTrabalhadasService;

    @GetMapping
    public ResponseEntity<List<HorasTrabalhadasDTO>> getAllHorasTrabalhadas() {
        List<HorasTrabalhadasDTO> horasTrabalhadas = horasTrabalhadasService.findAll();
        return ResponseEntity.ok(horasTrabalhadas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HorasTrabalhadasDTO> getHorasTrabalhadasById(@PathVariable Long id) {
        return horasTrabalhadasService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<HorasTrabalhadasDTO> createHorasTrabalhadas(@RequestBody HorasTrabalhadasDTO horasTrabalhadasDTO) {
        try {
            HorasTrabalhadasDTO savedHorasTrabalhadas = horasTrabalhadasService.save(horasTrabalhadasDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedHorasTrabalhadas);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HorasTrabalhadasDTO> updateHorasTrabalhadas(@PathVariable Long id, @RequestBody HorasTrabalhadasDTO horasTrabalhadasDTO) {
        try {
            return horasTrabalhadasService.update(id, horasTrabalhadasDTO)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHorasTrabalhadas(@PathVariable Long id) {
        if (horasTrabalhadasService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
