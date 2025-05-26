package com.ucr.lenguajes.gestprod.restcontroller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.lenguajes.gestprod.business.CategoriaBusiness;
import com.ucr.lenguajes.gestprod.business.ProductoBusiness;
import com.ucr.lenguajes.gestprod.domain.Categoria;
import com.ucr.lenguajes.gestprod.domain.Producto;
import com.ucr.lenguajes.gestprod.dto.ProductoDTO;
import com.ucr.lenguajes.gestprod.exception.CategoriaInvalidaException;
import com.ucr.lenguajes.gestprod.mapper.ProductoMapper;

import jakarta.validation.Valid;

@RestController
public class ProductoRestController {
	
	@Autowired
	private ProductoBusiness productoBusiness;
	@Autowired
	private CategoriaBusiness categoriaBusiness;
	@Autowired
	private ProductoMapper mapper;
	
	
	@GetMapping("/productos/{id}")
	public Producto buscarPorId(@PathVariable int id) {
	    return productoBusiness.obtenerProductoPorId(id);
	}

	@PostMapping("/productos")
	public void insertarProducto(@Valid @RequestBody ProductoDTO producto) {
		
		Categoria categoria = categoriaBusiness.buscarPorId(producto.getCategoriaId().intValue())
		        .orElseThrow(() -> new CategoriaInvalidaException("La categoría seleccionada no existe"));
		
		

	    productoBusiness.insertarProducto(mapper.toEntity(producto, categoria));
	}


}
		