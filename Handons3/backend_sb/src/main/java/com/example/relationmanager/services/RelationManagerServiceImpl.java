package com.example.relationmanager.services;

import com.example.relationmanager.models.RelationManager;
import com.example.relationmanager.repositories.RelationManagerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RelationManagerServiceImpl implements RelationManagerService {
    private final RelationManagerRepository repository;

    public RelationManagerServiceImpl(RelationManagerRepository repository) {
        this.repository = repository;
    }

    @Override
    public RelationManager create(RelationManager rm) {
        // Validate, check unique, hash password, etc.
        return repository.save(rm);
    }

    @Override
    public List<RelationManager> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<RelationManager> getById(UUID id) {
        return repository.findById(id);
    }

    @Override
    public RelationManager updateStatus(UUID id, String status) {
        RelationManager rm = repository.findById(id).orElseThrow();
        rm.setStatus(status);
        return repository.save(rm);
    }
}
