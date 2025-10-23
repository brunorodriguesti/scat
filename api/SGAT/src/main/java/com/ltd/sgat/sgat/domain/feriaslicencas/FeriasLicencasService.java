package com.ltd.sgat.sgat.domain.feriaslicencas;

import com.ltd.sgat.sgat.api.feriaslicencas.dto.FeriasLicencasDTO;
import com.ltd.sgat.sgat.domain.funcionario.Funcionario;
import com.ltd.sgat.sgat.domain.funcionario.FuncionarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FeriasLicencasService {

    @Autowired
    private FeriasLicencasRepository feriasLicencasRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<FeriasLicencasDTO> findAll() {
        return feriasLicencasRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<FeriasLicencasDTO> findById(Long id) {
        return feriasLicencasRepository.findById(id)
                .map(this::convertToDto);
    }

    public FeriasLicencasDTO save(FeriasLicencasDTO feriasLicencasDTO) {
        FeriasLicencas feriasLicencas = convertToEntity(feriasLicencasDTO);
        FeriasLicencas savedFeriasLicencas = feriasLicencasRepository.save(feriasLicencas);
        return convertToDto(savedFeriasLicencas);
    }

    public Optional<FeriasLicencasDTO> update(Long id, FeriasLicencasDTO feriasLicencasDTO) {
        return feriasLicencasRepository.findById(id)
                .map(existingFeriasLicencas -> {
                    existingFeriasLicencas.setDataInicio(feriasLicencasDTO.getDataInicio());
                    existingFeriasLicencas.setDataFim(feriasLicencasDTO.getDataFim());
                    existingFeriasLicencas.setDescricao(feriasLicencasDTO.getDescricao());
                    existingFeriasLicencas.setHorasAfastadas(feriasLicencasDTO.getHorasAfastadas());

                    funcionarioRepository.findById(feriasLicencasDTO.getFuncionarioId()).ifPresent(existingFeriasLicencas::setFuncionario);

                    FeriasLicencas updatedFeriasLicencas = feriasLicencasRepository.save(existingFeriasLicencas);
                    return convertToDto(updatedFeriasLicencas);
                });
    }

    public boolean delete(Long id) {
        if (feriasLicencasRepository.existsById(id)) {
            feriasLicencasRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private FeriasLicencasDTO convertToDto(FeriasLicencas feriasLicencas) {
        FeriasLicencasDTO feriasLicencasDTO = modelMapper.map(feriasLicencas, FeriasLicencasDTO.class);
        if (feriasLicencas.getFuncionario() != null) {
            feriasLicencasDTO.setFuncionarioId(feriasLicencas.getFuncionario().getId());
            feriasLicencasDTO.setFuncionarioNome(feriasLicencas.getFuncionario().getNome());
        }
        return feriasLicencasDTO;
    }

    private FeriasLicencas convertToEntity(FeriasLicencasDTO feriasLicencasDTO) {
        FeriasLicencas feriasLicencas = modelMapper.map(feriasLicencasDTO, FeriasLicencas.class);
        if (feriasLicencasDTO.getFuncionarioId() != null) {
            Funcionario funcionario = funcionarioRepository.findById(feriasLicencasDTO.getFuncionarioId())
                    .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
            feriasLicencas.setFuncionario(funcionario);
        }
        return feriasLicencas;
    }
}
