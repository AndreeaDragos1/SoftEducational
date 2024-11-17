package com.example.backend.Service;

import com.example.backend.Model.MaterialDidactic;
import com.example.backend.Repository.MaterialDidacticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialDidacticService {

    @Autowired
    private MaterialDidacticRepository repository;

    public List<MaterialDidactic> getAllMaterials() {
        return repository.findAll();
    }

    public MaterialDidactic getMaterialById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found with id: " + id));
    }

    public MaterialDidactic saveMaterial(MaterialDidactic material) {
        return repository.save(material);
    }

    public void deleteMaterial(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Material not found with id: " + id);
        }
        repository.deleteById(id);
    }

    public MaterialDidactic updateMaterial(Long id, MaterialDidactic updatedMaterial) {
        MaterialDidactic existingMaterial = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found with id: " + id));
        existingMaterial.setTitlu(updatedMaterial.getTitlu());
        existingMaterial.setDescriere(updatedMaterial.getDescriere());
        existingMaterial.setLink(updatedMaterial.getLink());
        return repository.save(existingMaterial);
    }
}
