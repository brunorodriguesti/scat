package com.ltd.sgat.sgat.domain.service;

import com.ltd.sgat.sgat.domain.model.Cliente;
import com.ltd.sgat.sgat.domain.repository.ClienteRepository;
import org.springframework.transaction.annotation.Transactional;

public class RegistroClienteService {

    private ClienteRepository clienteRepository;
    @Transactional
    public Cliente salvar(Cliente cliente){
        return clienteRepository.save(cliente);
    }
}
