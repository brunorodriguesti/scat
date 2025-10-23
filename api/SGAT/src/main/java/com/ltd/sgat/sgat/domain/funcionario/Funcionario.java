package com.ltd.sgat.sgat.domain.funcionario;

import com.ltd.sgat.sgat.domain.perfil.Perfil;
import com.ltd.sgat.sgat.domain.projeto.Projeto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "funcionario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cpf", length = 11)
    private String cpf;

    @Column(name = "matricula", length = 11)
    private String matricula;

    @Column(name = "nome", length = 100)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "projeto_id", nullable = false)
    private Projeto projeto;

    @ManyToOne
    @JoinColumn(name = "perfil_id", nullable = false)
    private Perfil perfil;

    @Column(name = "valor_hora", precision = 11, scale = 2)
    private BigDecimal valorHora;

    @Column(name = "tipo_contrato", length = 45)
    private String tipoContrato;

    @Column(name = "territorio_sindicato", length = 45)
    private String territorioSindicato;
}
