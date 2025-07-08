package com.example.relationmanager.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "relation_manager")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RelationManager {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    private String name;
    private String avatar;
    private String company;
    private String password;
    private String ccid;
    private String status = "active";

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
    private UUID createdBy;
    private UUID updatedBy;
}
