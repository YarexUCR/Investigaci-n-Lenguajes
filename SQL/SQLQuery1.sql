CREATE DATABASE InvestigacionLenguajes_2025_ErroresYExepciones
USE InvestigacionLenguajes_2025_ErroresYExepciones

CREATE TABLE Categoria (
    id_categoria INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL
);


CREATE TABLE Producto (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE,
    precio DECIMAL(10, 2) NOT NULL CHECK (precio > 0),
    stock INT NOT NULL CHECK (stock >= 0),
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);

INSERT INTO Categoria (nombre) VALUES 
('Electrónica'),
('Ropa'),
('Alimentos'),
('Juguetes'),
('Hogar'),
('Deportes'),
('Libros'),
('Salud y Belleza'),
('Automotriz'),
('Tecnología');

CREATE PROCEDURE sp_ObtenerCategorias
AS
BEGIN
    SELECT id_categoria, nombre
    FROM Categoria
    ORDER BY nombre;
END;

CREATE PROCEDURE sp_InsertarProducto
    @nombre NVARCHAR(100),
    @precio DECIMAL(10,2),
    @stock INT,
    @id_categoria INT
AS
BEGIN
    -- Verificar existencia de categoría
    IF NOT EXISTS (SELECT 1 FROM Categoria WHERE id_categoria = @id_categoria)
    BEGIN
        RAISERROR('La categoría especificada no existe.', 16, 1);
        RETURN;
    END;

    -- Verificar nombre duplicado
    IF EXISTS (SELECT 1 FROM Producto WHERE nombre = @nombre)
    BEGIN
        RAISERROR('El nombre del producto ya existe.', 16, 1);
        RETURN;
    END;

    -- Insertar producto
    INSERT INTO Producto (nombre, precio, stock, id_categoria)
    VALUES (@nombre, @precio, @stock, @id_categoria);
END;

CREATE PROCEDURE sp_ObtenerProductoPorId
    @id_producto INT
AS
BEGIN
    SELECT 
        p.id_producto,
        p.nombre AS nombre_producto,
        p.precio,
        p.stock,
        c.id_categoria,
        c.nombre AS nombre_categoria
    FROM Producto p
    INNER JOIN Categoria c ON p.id_categoria = c.id_categoria
    WHERE p.id_producto = @id_producto;
END;


