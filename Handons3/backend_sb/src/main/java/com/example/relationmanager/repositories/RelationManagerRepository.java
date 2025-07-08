package com.example.relationmanager.repositories;

import com.example.relationmanager.models.RelationManager;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface RelationManagerRepository extends JpaRepository<RelationManager, UUID> {
    Optional<RelationManager> findByEmail(String email);
    Optional<RelationManager> findByUsername(String username);
}
