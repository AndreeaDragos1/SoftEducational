package com.example.backend.Controller;

import com.example.backend.Model.MaterialDidactic;
import com.example.backend.Service.MaterialDidacticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // permite accesul de la acest origin
@RequestMapping("/api/materiale")
public class MaterialDidacticController {
    @Autowired
    private MaterialDidacticService service;


    @GetMapping
    public List<MaterialDidactic> getAllMaterials() {
        return service.getAllMaterials();
    }

    @GetMapping("/{id}")
    public MaterialDidactic getMaterial(@PathVariable Long id) {
        return service.getMaterialById(id);
    }

    @PostMapping
    public MaterialDidactic createMaterial(@RequestBody MaterialDidactic material) {
        return service.saveMaterial(material);
    }
    @PutMapping("/{id}")
    public MaterialDidactic updateMaterial(@PathVariable Long id, @RequestBody MaterialDidactic updatedMaterial) {
        return service.updateMaterial(id, updatedMaterial);
    }

    @DeleteMapping("/{id}")
    public void deleteMaterial(@PathVariable Long id) {
        service.deleteMaterial(id);
    }

}
