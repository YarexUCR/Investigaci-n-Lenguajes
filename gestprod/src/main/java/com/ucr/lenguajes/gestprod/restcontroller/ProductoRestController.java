package com.ucr.lenguajes.gestprod.restcontroller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.lenguajes.gestprod.business.ProductoBusiness;
import com.ucr.lenguajes.gestprod.domain.Producto;

@RestController
public class ProductoRestController {
	
	@Autowired
	private ProductoBusiness productoBusiness;
	
	
	@GetMapping("/productos/{id}")
	public Producto buscarPorId(@PathVariable int id) {
	    return productoBusiness.obtenerProductoPorId(id);
	}

	@PostMapping("/productos")
	public void insertarProducto(@RequestBody Producto producto) {
	    productoBusiness.insertarProducto(producto);
	}


}
