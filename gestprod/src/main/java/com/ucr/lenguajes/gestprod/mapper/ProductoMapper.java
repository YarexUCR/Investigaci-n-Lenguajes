package com.ucr.lenguajes.gestprod.mapper;

import com.ucr.lenguajes.gestprod.dto.ProductoDTO;
import com.ucr.lenguajes.gestprod.domain.Producto;

import org.springframework.stereotype.Component;

import com.ucr.lenguajes.gestprod.domain.Categoria;
@Component
public class ProductoMapper {

    public static Producto toEntity(ProductoDTO dto, Categoria categoria) {
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setPrecio(dto.getPrecio());
        producto.setStock(dto.getStock());
        producto.setCategoria(categoria);
        return producto;
    }
}
