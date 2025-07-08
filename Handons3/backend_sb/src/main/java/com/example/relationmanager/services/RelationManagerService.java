package com.example.relationmanager.services;

import com.example.relationmanager.models.RelationManager;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RelationManagerService {
    RelationManager create(RelationManager rm);
    List<RelationManager> getAll();
    Optional<RelationManager> getById(UUID id);
    RelationManager updateStatus(UUID id, String status);
}
