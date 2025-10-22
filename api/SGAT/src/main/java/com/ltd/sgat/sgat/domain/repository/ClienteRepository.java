package com.ltd.sgat.sgat.domain.repository;

import com.ltd.sgat.sgat.domain.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
