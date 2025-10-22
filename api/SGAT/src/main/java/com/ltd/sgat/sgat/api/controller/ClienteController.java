package com.ltd.sgat.sgat.api.controller;

import com.ltd.sgat.sgat.domain.model.Cliente;
import com.ltd.sgat.sgat.domain.repository.ClienteRepository;
import com.ltd.sgat.sgat.domain.service.RegistroClienteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteRepository clienteRepository;
    private final RegistroClienteService clienteService;
   @GetMapping
   public List<Cliente> listar(){
       return clienteRepository.findAll();
   }

   @PostMapping
   @ResponseStatus(HttpStatus.CREATED)
   public Cliente cadastrar(@RequestBody Cliente cliente){
       return clienteService.salvar(cliente);
   }
}
