package com.ltd.sgat.sgat.api.perfil.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PerfilDTO {
    private Long id;
    private String descricao;
    private BigDecimal valorHoraPadrao;
    private LocalTime horasPadrao;
}
