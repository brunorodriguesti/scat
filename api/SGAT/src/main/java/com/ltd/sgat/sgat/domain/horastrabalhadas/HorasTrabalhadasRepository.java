package com.ltd.sgat.sgat.domain.horastrabalhadas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorasTrabalhadasRepository extends JpaRepository<HorasTrabalhadas, Long> {
}
