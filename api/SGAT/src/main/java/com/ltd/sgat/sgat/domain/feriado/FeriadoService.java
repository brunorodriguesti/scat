package com.ltd.sgat.sgat.domain.feriado;

import com.ltd.sgat.sgat.api.feriado.dto.FeriadoDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeriadoService {

    @Autowired
    private FeriadoRepository feriadoRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<FeriadoDTO> findAll() {
        return feriadoRepository.findAll().stream()
                .map(feriado -> modelMapper.map(feriado, FeriadoDTO.class))
                .collect(Collectors.toList());
    }

    public Optional<FeriadoDTO> findById(Long id) {
        return feriadoRepository.findById(id)
                .map(feriado -> modelMapper.map(feriado, FeriadoDTO.class));
    }

    public FeriadoDTO save(FeriadoDTO feriadoDTO) {
        Feriado feriado = modelMapper.map(feriadoDTO, Feriado.class);
        Feriado savedFeriado = feriadoRepository.save(feriado);
        return modelMapper.map(savedFeriado, FeriadoDTO.class);
    }

    public Optional<FeriadoDTO> update(Long id, FeriadoDTO feriadoDTO) {
        return feriadoRepository.findById(id)
                .map(existingFeriado -> {
                    existingFeriado.setData(feriadoDTO.getData());
                    existingFeriado.setTipoFeriado(feriadoDTO.getTipoFeriado());
                    existingFeriado.setTerritorio(feriadoDTO.getTerritorio());
                    existingFeriado.setDescricao(feriadoDTO.getDescricao());
                    Feriado updatedFeriado = feriadoRepository.save(existingFeriado);
                    return modelMapper.map(updatedFeriado, FeriadoDTO.class);
                });
    }

    public boolean delete(Long id) {
        if (feriadoRepository.existsById(id)) {
            feriadoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
