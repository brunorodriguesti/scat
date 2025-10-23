package com.ltd.sgat.sgat.api.feriado.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeriadoDTO {
    private Long id;
    private LocalDate data;
    private String tipoFeriado;
    private String territorio;
    private String descricao;
}
