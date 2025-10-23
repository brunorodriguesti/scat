package com.ltd.sgat.sgat.domain.cliente;

import com.ltd.sgat.sgat.api.cliente.dto.ClienteDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<ClienteDTO> findAll() {
        return clienteRepository.findAll().stream()
                .map(cliente -> modelMapper.map(cliente, ClienteDTO.class))
                .collect(Collectors.toList());
    }

    public Optional<ClienteDTO> findById(Long id) {
        return clienteRepository.findById(id)
                .map(cliente -> modelMapper.map(cliente, ClienteDTO.class));
    }

    public ClienteDTO save(ClienteDTO clienteDTO) {
        Cliente cliente = modelMapper.map(clienteDTO, Cliente.class);
        Cliente savedCliente = clienteRepository.save(cliente);
        return modelMapper.map(savedCliente, ClienteDTO.class);
    }

    public Optional<ClienteDTO> update(Long id, ClienteDTO clienteDTO) {
        return clienteRepository.findById(id)
                .map(existingCliente -> {
                    existingCliente.setNome(clienteDTO.getNome());
                    Cliente updatedCliente = clienteRepository.save(existingCliente);
                    return modelMapper.map(updatedCliente, ClienteDTO.class);
                });
    }

    public boolean delete(Long id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
