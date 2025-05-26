package com.ucr.lenguajes.gestprod.business;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.ucr.lenguajes.gestprod.data.*;
import com.ucr.lenguajes.gestprod.domain.Categoria;

@Service
public class CategoriaBusiness {

	@Autowired
	private CategoriaData categoriaData;
	
	public  List<Categoria> obtenerCategorias(){
		 return this.categoriaData.obtenerCategorias();
	}
	
	public Optional<Categoria> buscarPorId(int id){
		return this.categoriaData.buscarPorId(id);
	}
		
}
