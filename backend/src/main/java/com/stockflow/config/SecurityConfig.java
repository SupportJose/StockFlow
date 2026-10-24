package com.stockflow.config;
import org.springframework.context.annotation.*; import org.springframework.security.config.annotation.web.builders.HttpSecurity; import org.springframework.security.web.SecurityFilterChain;
@Configuration public class SecurityConfig { @Bean SecurityFilterChain chain(HttpSecurity h) throws Exception { return h.csrf(c->c.disable()).cors(c->{}).authorizeHttpRequests(a->a.requestMatchers("/actuator/health","/swagger-ui/**","/v3/api-docs/**").permitAll().anyRequest().authenticated()).oauth2ResourceServer(o->o.jwt(j->{})).build(); } }
