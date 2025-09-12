package com.example.backend.receptor.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "odor_receptors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OdorReceptor {

    @Id
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "uniprot_id")
    private String uniprot_id;

    @Column(name = "entry_name")
    private String entry_name;

    @Column(name = "organism")
    private String organism;

    @Column(name = "receptor_type")
    private String receptor_type;

    @Column(name = "url")
    private String url;

}