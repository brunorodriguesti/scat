package com.ltd.sgat.sgat.api.projeto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjetoDTO {
    private Long id;
    private String nome;
    private Long clienteId;
    private String clienteNome; // Para exibir o nome do cliente no frontend
}
