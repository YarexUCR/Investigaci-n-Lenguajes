package com.ucr.lenguajes.gestprod.business;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.ucr.lenguajes.gestprod.data.ProductoData;
import com.ucr.lenguajes.gestprod.domain.Producto;
import com.ucr.lenguajes.gestprod.exception.NotFoundException;
import com.ucr.lenguajes.gestprod.exception.BadRequestException;


@Service
public class ProductoBusiness {
@Autowired
private ProductoData productoData;

//NotFoundException
public Producto obtenerProductoPorId(int id) {
 return productoData.obtenerProductoPorId(id)
     .orElseThrow(() -> new NotFoundException("Producto con ID " + id + " no encontrado"));
}

//BadRequestException
public void insertarProducto(Producto producto) {
    try {
        productoData.insertarProducto(producto);
    } catch (Exception ex) {
        // Detectar error por nombre duplicado
        if (ex.getMessage() != null && ex.getMessage().contains("ya existe")) {
            throw new BadRequestException("El nombre del producto ya está registrado.");
        }
        throw ex; // Si no es un error controlado, relanza el original
    }
}




}
