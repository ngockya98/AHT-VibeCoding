package com.example.relationmanager.controllers;

import com.example.relationmanager.models.RelationManager;
import com.example.relationmanager.services.RelationManagerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/relation-managers")
public class RelationManagerController {
    private final RelationManagerService service;

    public RelationManagerController(RelationManagerService service) {
        this.service = service;
    }

    @PostMapping
    public RelationManager create(@RequestBody RelationManager rm) {
        return service.create(rm);
    }

    @GetMapping
    public List<RelationManager> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public RelationManager getById(@PathVariable UUID id) {
        return service.getById(id).orElseThrow();
    }

    @PatchMapping("/{id}/status")
    public RelationManager updateStatus(@PathVariable UUID id, @RequestBody String status) {
        return service.updateStatus(id, status);
    }
}
