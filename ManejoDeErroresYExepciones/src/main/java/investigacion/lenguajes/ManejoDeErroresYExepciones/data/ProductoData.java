package investigacion.lenguajes.ManejoDeErroresYExepciones.data;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import investigacion.lenguajes.ManejoDeErroresYExepciones.domain.Categoria;
import investigacion.lenguajes.ManejoDeErroresYExepciones.domain.Producto;
@Repository
public class ProductoData {
	  @Autowired
	  private  JdbcTemplate jdbcTemplate;

	  public void insertarProducto(Producto producto) {
		    SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
		        .withProcedureName("sp_InsertarProducto");

		    Map<String, Object> params = new HashMap<>();
		    params.put("nombre", producto.getNombre());
		    params.put("precio", producto.getPrecio());
		    params.put("stock", producto.getStock());
		    params.put("id_categoria", producto.getCategoria().getIdCategoria());

		    jdbcCall.execute(params);
		}
	  
	  public Optional<Producto> obtenerProductoPorId(int idProducto) {
		    SimpleJdbcCall jdbcCall = new SimpleJdbcCall(jdbcTemplate)
		        .withProcedureName("sp_ObtenerProductoPorId")
		        .returningResultSet("producto",
		            (rs, rowNum) -> {
		                Categoria cat = new Categoria(
		                    rs.getInt("id_categoria"),
		                    rs.getString("nombre_categoria")
		                );
		                Producto prod = new Producto(
		                    rs.getInt("id_producto"),
		                    rs.getString("nombre_producto"),
		                    rs.getBigDecimal("precio"),
		                    rs.getInt("stock"),
		                    cat
		                );
		                return prod;
		            }
		        );

		    Map<String, Object> result = jdbcCall.execute(Collections.singletonMap("id_producto", idProducto));
		    List<Producto> productos = (List<Producto>) result.get("producto");
		    return productos.isEmpty() ? Optional.empty() : Optional.of(productos.get(0));
		}

  
	  
}
