package com.ltd.sgat.sgat.domain.horastrabalhadas;

import com.ltd.sgat.sgat.api.horastrabalhadas.dto.HorasTrabalhadasDTO;
import com.ltd.sgat.sgat.domain.funcionario.Funcionario;
import com.ltd.sgat.sgat.domain.funcionario.FuncionarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HorasTrabalhadasService {

    @Autowired
    private HorasTrabalhadasRepository horasTrabalhadasRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<HorasTrabalhadasDTO> findAll() {
        return horasTrabalhadasRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<HorasTrabalhadasDTO> findById(Long id) {
        return horasTrabalhadasRepository.findById(id)
                .map(this::convertToDto);
    }

    public HorasTrabalhadasDTO save(HorasTrabalhadasDTO horasTrabalhadasDTO) {
        HorasTrabalhadas horasTrabalhadas = convertToEntity(horasTrabalhadasDTO);
        HorasTrabalhadas savedHorasTrabalhadas = horasTrabalhadasRepository.save(horasTrabalhadas);
        return convertToDto(savedHorasTrabalhadas);
    }

    public Optional<HorasTrabalhadasDTO> update(Long id, HorasTrabalhadasDTO horasTrabalhadasDTO) {
        return horasTrabalhadasRepository.findById(id)
                .map(existingHorasTrabalhadas -> {
                    existingHorasTrabalhadas.setDataTrabalho(horasTrabalhadasDTO.getDataTrabalho());
                    existingHorasTrabalhadas.setHorasTrabalhadas(horasTrabalhadasDTO.getHorasTrabalhadas());
                    existingHorasTrabalhadas.setValor(horasTrabalhadasDTO.getValor());

                    funcionarioRepository.findById(horasTrabalhadasDTO.getFuncionarioId()).ifPresent(existingHorasTrabalhadas::setFuncionario);

                    HorasTrabalhadas updatedHorasTrabalhadas = horasTrabalhadasRepository.save(existingHorasTrabalhadas);
                    return convertToDto(updatedHorasTrabalhadas);
                });
    }

    public boolean delete(Long id) {
        if (horasTrabalhadasRepository.existsById(id)) {
            horasTrabalhadasRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private HorasTrabalhadasDTO convertToDto(HorasTrabalhadas horasTrabalhadas) {
        HorasTrabalhadasDTO horasTrabalhadasDTO = modelMapper.map(horasTrabalhadas, HorasTrabalhadasDTO.class);
        if (horasTrabalhadas.getFuncionario() != null) {
            horasTrabalhadasDTO.setFuncionarioId(horasTrabalhadas.getFuncionario().getId());
            horasTrabalhadasDTO.setFuncionarioNome(horasTrabalhadas.getFuncionario().getNome());
        }
        return horasTrabalhadasDTO;
    }

    private HorasTrabalhadas convertToEntity(HorasTrabalhadasDTO horasTrabalhadasDTO) {
        HorasTrabalhadas horasTrabalhadas = modelMapper.map(horasTrabalhadasDTO, HorasTrabalhadas.class);
        if (horasTrabalhadasDTO.getFuncionarioId() != null) {
            Funcionario funcionario = funcionarioRepository.findById(horasTrabalhadasDTO.getFuncionarioId())
                    .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));
            horasTrabalhadas.setFuncionario(funcionario);
        }
        return horasTrabalhadas;
    }
}
