package com.ucr.lenguajes.gestprod.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String mensaje) {
        super(mensaje);
    }
}