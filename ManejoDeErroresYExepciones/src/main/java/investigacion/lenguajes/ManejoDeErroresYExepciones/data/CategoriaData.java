package investigacion.lenguajes.ManejoDeErroresYExepciones.data;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import investigacion.lenguajes.ManejoDeErroresYExepciones.domain.Categoria;
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

}
