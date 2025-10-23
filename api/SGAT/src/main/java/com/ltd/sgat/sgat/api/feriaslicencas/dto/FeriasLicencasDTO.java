package com.ltd.sgat.sgat.api.feriaslicencas.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeriasLicencasDTO {
    private Long id;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private String descricao;
    private Long funcionarioId;
    private String funcionarioNome; // Para exibir o nome do funcionário
    private LocalTime horasAfastadas;
}
