package com.ucr.lenguajes.gestprod.restcontroller;

import com.ucr.lenguajes.gestprod.data.CategoriaData;
import com.ucr.lenguajes.gestprod.domain.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaRestController {

    @Autowired
    private CategoriaData categoriaData;

    @GetMapping
    public List<Categoria> obtenerCategorias() {
        return categoriaData.obtenerCategorias();
    }
}
