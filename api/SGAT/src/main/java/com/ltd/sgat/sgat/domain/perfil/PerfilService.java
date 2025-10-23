package com.ltd.sgat.sgat.domain.perfil;

import com.ltd.sgat.sgat.api.perfil.dto.PerfilDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<PerfilDTO> findAll() {
        return perfilRepository.findAll().stream()
                .map(perfil -> modelMapper.map(perfil, PerfilDTO.class))
                .collect(Collectors.toList());
    }

    public Optional<PerfilDTO> findById(Long id) {
        return perfilRepository.findById(id)
                .map(perfil -> modelMapper.map(perfil, PerfilDTO.class));
    }

    public PerfilDTO save(PerfilDTO perfilDTO) {
        Perfil perfil = modelMapper.map(perfilDTO, Perfil.class);
        Perfil savedPerfil = perfilRepository.save(perfil);
        return modelMapper.map(savedPerfil, PerfilDTO.class);
    }

    public Optional<PerfilDTO> update(Long id, PerfilDTO perfilDTO) {
        return perfilRepository.findById(id)
                .map(existingPerfil -> {
                    existingPerfil.setDescricao(perfilDTO.getDescricao());
                    existingPerfil.setValorHoraPadrao(perfilDTO.getValorHoraPadrao());
                    existingPerfil.setHorasPadrao(perfilDTO.getHorasPadrao());
                    Perfil updatedPerfil = perfilRepository.save(existingPerfil);
                    return modelMapper.map(updatedPerfil, PerfilDTO.class);
                });
    }

    public boolean delete(Long id) {
        if (perfilRepository.existsById(id)) {
            perfilRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
