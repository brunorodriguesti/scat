package com.ltd.sgat.sgat.api.funcionario.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuncionarioDTO {
    private Long id;
    private String cpf;
    private String matricula;
    private String nome;
    private Long projetoId;
    private String projetoNome;
    private Long perfilId;
    private String perfilDescricao;
    private BigDecimal valorHora;
    private String tipoContrato;
    private String territorioSindicato;
}
