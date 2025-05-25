package investigacion.lenguajes.ManejoDeErroresYExepciones.domain;

import java.math.BigDecimal;

public class Producto {
    private int idProducto;
    private String nombre;
    private BigDecimal precio;
    private int stock;
    private Categoria categoria;

    public Producto() {
        this.categoria = new Categoria();
    }

    public Producto(int idProducto, String nombre, BigDecimal precio, int stock, Categoria categoria) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}
