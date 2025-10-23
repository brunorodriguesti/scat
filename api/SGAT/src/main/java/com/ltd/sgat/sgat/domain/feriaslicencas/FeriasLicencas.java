package com.ltd.sgat.sgat.domain.feriaslicencas;

import com.ltd.sgat.sgat.domain.funcionario.Funcionario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "ferias_licencas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeriasLicencas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(name = "descricao", length = 50)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario funcionario;

    @Column(name = "horas_afastadas")
    private LocalTime horasAfastadas;
}
