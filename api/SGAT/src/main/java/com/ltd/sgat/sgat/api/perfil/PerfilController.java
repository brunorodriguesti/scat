package com.ltd.sgat.sgat.api.perfil;

import com.ltd.sgat.sgat.api.perfil.dto.PerfilDTO;
import com.ltd.sgat.sgat.domain.perfil.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/perfis")
public class PerfilController {

    @Autowired
    private PerfilService perfilService;

    @GetMapping
    public ResponseEntity<List<PerfilDTO>> getAllPerfis() {
        List<PerfilDTO> perfis = perfilService.findAll();
        return ResponseEntity.ok(perfis);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerfilDTO> getPerfilById(@PathVariable Long id) {
        return perfilService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PerfilDTO> createPerfil(@RequestBody PerfilDTO perfilDTO) {
        PerfilDTO savedPerfil = perfilService.save(perfilDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPerfil);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PerfilDTO> updatePerfil(@PathVariable Long id, @RequestBody PerfilDTO perfilDTO) {
        return perfilService.update(id, perfilDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerfil(@PathVariable Long id) {
        if (perfilService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
