package com.ltd.sgat.sgat.domain.funcionario;

import com.ltd.sgat.sgat.api.funcionario.dto.FuncionarioDTO;
import com.ltd.sgat.sgat.domain.perfil.Perfil;
import com.ltd.sgat.sgat.domain.perfil.PerfilRepository;
import com.ltd.sgat.sgat.domain.projeto.Projeto;
import com.ltd.sgat.sgat.domain.projeto.ProjetoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private PerfilRepository perfilRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<FuncionarioDTO> findAll() {
        return funcionarioRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<FuncionarioDTO> findById(Long id) {
        return funcionarioRepository.findById(id)
                .map(this::convertToDto);
    }

    public FuncionarioDTO save(FuncionarioDTO funcionarioDTO) {
        Funcionario funcionario = convertToEntity(funcionarioDTO);
        Funcionario savedFuncionario = funcionarioRepository.save(funcionario);
        return convertToDto(savedFuncionario);
    }

    public Optional<FuncionarioDTO> update(Long id, FuncionarioDTO funcionarioDTO) {
        return funcionarioRepository.findById(id)
                .map(existingFuncionario -> {
                    existingFuncionario.setCpf(funcionarioDTO.getCpf());
                    existingFuncionario.setMatricula(funcionarioDTO.getMatricula());
                    existingFuncionario.setNome(funcionarioDTO.getNome());
                    existingFuncionario.setValorHora(funcionarioDTO.getValorHora());
                    existingFuncionario.setTipoContrato(funcionarioDTO.getTipoContrato());
                    existingFuncionario.setTerritorioSindicato(funcionarioDTO.getTerritorioSindicato());

                    projetoRepository.findById(funcionarioDTO.getProjetoId()).ifPresent(existingFuncionario::setProjeto);
                    perfilRepository.findById(funcionarioDTO.getPerfilId()).ifPresent(existingFuncionario::setPerfil);

                    Funcionario updatedFuncionario = funcionarioRepository.save(existingFuncionario);
                    return convertToDto(updatedFuncionario);
                });
    }

    public boolean delete(Long id) {
        if (funcionarioRepository.existsById(id)) {
            funcionarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private FuncionarioDTO convertToDto(Funcionario funcionario) {
        FuncionarioDTO funcionarioDTO = modelMapper.map(funcionario, FuncionarioDTO.class);
        if (funcionario.getProjeto() != null) {
            funcionarioDTO.setProjetoId(funcionario.getProjeto().getId());
            funcionarioDTO.setProjetoNome(funcionario.getProjeto().getNome());
        }
        if (funcionario.getPerfil() != null) {
            funcionarioDTO.setPerfilId(funcionario.getPerfil().getId());
            funcionarioDTO.setPerfilDescricao(funcionario.getPerfil().getDescricao());
        }
        return funcionarioDTO;
    }

    private Funcionario convertToEntity(FuncionarioDTO funcionarioDTO) {
        Funcionario funcionario = modelMapper.map(funcionarioDTO, Funcionario.class);
        if (funcionarioDTO.getProjetoId() != null) {
            Projeto projeto = projetoRepository.findById(funcionarioDTO.getProjetoId())
                    .orElseThrow(() -> new RuntimeException("Projeto não encontrado"));
            funcionario.setProjeto(projeto);
        }
        if (funcionarioDTO.getPerfilId() != null) {
            Perfil perfil = perfilRepository.findById(funcionarioDTO.getPerfilId())
                    .orElseThrow(() -> new RuntimeException("Perfil não encontrado"));
            funcionario.setPerfil(perfil);
        }
        return funcionario;
    }
}
