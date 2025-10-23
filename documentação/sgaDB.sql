-- -----------------------------------------------------
-- Schema sgat
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS sgat DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE sgat;

-- -----------------------------------------------------
-- Table sgat.Cliente
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Cliente (
  id BIGINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  PRIMARY KEY (id)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table sgat.projeto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS projeto (
  id BIGINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  cliente_id BIGINT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_projeto_cliente_idx (cliente_id),
  CONSTRAINT fk_projeto_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES Cliente(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table sgat.perfil
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS perfil (
  id BIGINT NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(100),
  valor_hora_padrao DECIMAL(10,2),
  horas_padrao TIME,
  PRIMARY KEY (id)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table sgat.funcionario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS funcionario (
  id BIGINT NOT NULL AUTO_INCREMENT,
  cpf VARCHAR(11),
  matricula VARCHAR(11),
  nome VARCHAR(100),
  projeto_id BIGINT NOT NULL,
  perfil_id BIGINT NOT NULL,
  valor_hora DECIMAL(11,2),
  tipo_contrato VARCHAR(45),
  territorio_sindicato VARCHAR(45),
  PRIMARY KEY (id),
  INDEX fk_funcionario_projeto_idx (projeto_id),
  INDEX fk_funcionario_perfil_idx (perfil_id),
  CONSTRAINT fk_funcionario_projeto
    FOREIGN KEY (projeto_id)
    REFERENCES projeto (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_funcionario_perfil
    FOREIGN KEY (perfil_id)
    REFERENCES perfil (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table sgat.feriados
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS feriados (
  id BIGINT NOT NULL AUTO_INCREMENT,
  data DATE,
  tipo_feriado VARCHAR(50),
  territorio VARCHAR(50),
  descricao VARCHAR(100),
  PRIMARY KEY (id)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table sgat.ferias_licencas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ferias_licencas (
  id BIGINT NOT NULL AUTO_INCREMENT,
  data_inicio DATE,
  data_fim DATE,
  descricao VARCHAR(50),
  funcionario_id BIGINT NOT NULL,
  horas_afastadas TIME,
  PRIMARY KEY (id),
  INDEX fk_ferias_licencas_funcionario_idx (funcionario_id),
  CONSTRAINT fk_ferias_licencas_funcionario
    FOREIGN KEY (funcionario_id)
    REFERENCES funcionario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table sgat.horas_trabalhadas
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS horas_trabalhadas (
  id BIGINT NOT NULL AUTO_INCREMENT,
  data_trabalho DATE,
  horas_trabalhadas TIME,
  funcionario_id BIGINT NOT NULL,
  valor DECIMAL(10,2),
  PRIMARY KEY (id),
  INDEX fk_horas_trabalhadas_funcionario_idx (funcionario_id),
  CONSTRAINT fk_horas_trabalhadas_funcionario
    FOREIGN KEY (funcionario_id)
    REFERENCES funcionario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;