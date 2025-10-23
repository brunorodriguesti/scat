package com.ltd.sgat.sgat.domain.perfil;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalTime;

@Entity
@Table(name = "perfil")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao", length = 100)
    private String descricao;

    @Column(name = "valor_hora_padrao", precision = 10, scale = 2)
    private BigDecimal valorHoraPadrao;

    @Column(name = "horas_padrao")
    private LocalTime horasPadrao;
}
