package com.ltd.sgat.sgat.domain.feriado;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "feriados")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feriado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "tipo_feriado", length = 50)
    private String tipoFeriado;

    @Column(name = "territorio", length = 50)
    private String territorio;

    @Column(name = "descricao", length = 100)
    private String descricao;
}
