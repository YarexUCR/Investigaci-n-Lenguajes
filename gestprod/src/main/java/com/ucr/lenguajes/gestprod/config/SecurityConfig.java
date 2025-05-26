package com.ucr.lenguajes.gestprod.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()  // habilita CORS
            .and()
            .csrf().disable()  // desactiva protección CSRF
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()  // permite todo sin autenticación
            );

        return http.build();
    }
}
