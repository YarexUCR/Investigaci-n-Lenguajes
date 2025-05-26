package com.ucr.lenguajes.gestprod.data;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.ucr.lenguajes.gestprod.domain.Categoria;
@Repository
public class CategoriaData {
	  @Autowired
	  private  JdbcTemplate jdbcTemplate;
	  
	  
	  public List<Categoria> obtenerCategorias() {
		    SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
		        .withProcedureName("sp_ObtenerCategorias")
		        .returningResultSet("categorias", 
		            (rs, rowNum) -> new Categoria(
		                rs.getInt("id_categoria"),
		                rs.getString("nombre")
		            )
		        );

		    Map<String, Object> result = jdbcCall.execute();
		    return (List<Categoria>) result.get("categorias");
		}
	  
	  public Optional<Categoria> buscarPorId(int idCategoria) {
	        SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
	                .withProcedureName("sp_BuscarCategoriaPorId")
	                .returningResultSet("categoria",
	                        (rs, rowNum) -> {
	                            Categoria c = new Categoria();
	                            c.setIdCategoria(rs.getInt("id_categoria"));
	                            c.setNombre(rs.getString("nombre"));
	                            return c;
	                        });

	        Map<String, Object> result = jdbcCall.execute(Collections.singletonMap("id_categoria", idCategoria));

	        List<Categoria> categorias = (List<Categoria>) result.get("categoria");

	        return categorias.isEmpty() ? Optional.empty() : Optional.of(categorias.get(0));
	    }

}
