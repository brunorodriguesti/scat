-- -----------------------------------------------------
-- Schema sgat
-- -----------------------------------------------------
 CREATE SCHEMA IF NOT EXISTS `sgat` DEFAULT CHARACTER SET utf8 ;
 USE `sgat` ;

-- -----------------------------------------------------
-- Table `sgat`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgat`.`Cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgat`.`projeto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgat`.`projeto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  `id_cliente` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_projeto_Cliente_idx` (`id_cliente` ASC) VISIBLE,
  CONSTRAINT `fk_projeto_Cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `sgat`.`Cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgat`.`perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgat`.`perfil` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NULL,
  `valor_hora_padrao` DECIMAL(10,2) NULL,
  `horas_padrao` TIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgat`.`funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgat`.`funcionario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cpf` VARCHAR(11) NULL,
  `matricula` VARCHAR(11) NULL,
  `nome` VARCHAR(100) NULL,
  `id_projeto` INT NOT NULL,
  `id_perfil` INT NOT NULL,
  `valor_hora` DECIMAL(11,2) NULL,
  `tipo_contrato` VARCHAR(45) NULL,
  `territorio_sindicato` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_funcionario_projeto1_idx` (`id_projeto` ASC) VISIBLE,
  INDEX `fk_funcionario_perfil1_idx` (`id_perfil` ASC) VISIBLE,
  CONSTRAINT `fk_funcionario_projeto1`
    FOREIGN KEY (`id_projeto`)
    REFERENCES `sgat`.`projeto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_funcionario_perfil1`
    FOREIGN KEY (`id_perfil`)
    REFERENCES `sgat`.`perfil` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgat`.`feriados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgat`.`feriados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` DATE NULL,
  `tipo_feriado` VARCHAR(50) NULL,
  `territorio` VARCHAR(50) NULL,
  `descricao` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgat`.`ferias_licencas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgat`.`ferias_licencas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dt_inicio` DATE NULL,
  `data_fim` DATE NULL,
  `descricao` VARCHAR(50) NULL,
  `id_funcionario` INT NOT NULL,
  `horas_afastadas` TIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ferias_licencas_funcionario1_idx` (`id_funcionario` ASC) VISIBLE,
  CONSTRAINT `fk_ferias_licencas_funcionario1`
    FOREIGN KEY (`id_funcionario`)
    REFERENCES `sgat`.`funcionario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sgat`.`horas_trabalhadas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sgat`.`horas_trabalhadas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_trabalho` DATE NULL,
  `horas_trabalhadas` TIME NULL,
  `id_funcionario` INT NOT NULL,
  `valor` DECIMAL NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_horas_trabalhadas_mes_funcionario1_idx` (`id_funcionario` ASC) VISIBLE,
  CONSTRAINT `fk_horas_trabalhadas_mes_funcionario1`
    FOREIGN KEY (`id_funcionario`)
    REFERENCES `sgat`.`funcionario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;