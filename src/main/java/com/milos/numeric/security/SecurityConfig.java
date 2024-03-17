package com.milos.numeric.security;


import com.milos.numeric.services.MyDatabaseUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.vote.UnanimousBased;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.List;
import java.util.function.Supplier;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

@Configuration
@EnableWebSecurity
public class SecurityConfig
{
    @Autowired
    private AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, HandlerMappingIntrospector introspector) throws Exception {

        MvcRequestMatcher.Builder mvcMatcherBuilderA = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher.Builder mvcMatcherBuilderB = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher.Builder mvcMatcherBuilderC = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher.Builder mvcMatcherBuilderD = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher.Builder mvcMatcherBuilderF = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher.Builder mvcMatcherBuilderG = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher.Builder mvcMatcherBuilderH = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher.Builder mvcMatcherBuilderI = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher.Builder mvcMatcherBuilderJ = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher.Builder mvcMatcherAdmin = new MvcRequestMatcher.Builder(introspector);
        MvcRequestMatcher.Builder mvcMatcherStudent = new MvcRequestMatcher.Builder(introspector);
        http
                .authorizeHttpRequests((authorize) -> authorize.requestMatchers(mvcMatcherBuilderA.pattern("/css/**")).permitAll()
                        .requestMatchers(mvcMatcherBuilderB.pattern("/js/**")).permitAll()
                        .requestMatchers(mvcMatcherBuilderF.pattern("/scss/**")).permitAll()
                        .requestMatchers(mvcMatcherBuilderG.pattern("/vendor/**")).permitAll()
                        .requestMatchers(mvcMatcherBuilderH.pattern("/vendors/**")).permitAll()
                        .requestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**")).permitAll()
                        .requestMatchers(mvcMatcherBuilderJ.pattern("/confirm/sign-up/page"))
                        .access(new WebExpressionAuthorizationManager("isAuthenticated() and principal.enabled == false"))

                        .requestMatchers(toH2Console()).permitAll()
                        .requestMatchers(mvcMatcherBuilderC.pattern("/file/**")).permitAll()
                        .requestMatchers(mvcMatcherBuilderD.pattern("/sign-up-page")).permitAll()
                        .requestMatchers(mvcMatcherBuilderI.pattern("/forget-password-page")).permitAll()
                        .requestMatchers(mvcMatcherAdmin.pattern("/admin/**")).access(new WebExpressionAuthorizationManager("isAuthenticated() and principal.enabled == true and hasAuthority('TEACHER')"))
                        .requestMatchers(mvcMatcherStudent.pattern("/student/**")).access(new WebExpressionAuthorizationManager("isAuthenticated() and principal.enabled == true and hasAuthority('STUDENT')"))
                        .anyRequest().authenticated()
                ).headers(headers -> headers.frameOptions().disable())
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers(AntPathRequestMatcher.antMatcher("/h2-console/**")).disable())
                .httpBasic(hbc -> hbc.authenticationEntryPoint(authenticationEntryPoint()))
                .formLogin(form -> form.successHandler(authenticationSuccessHandler())
                .loginPage("/login")
                .failureHandler(authenticationFailureHandler())
                .permitAll())
                .logout((logout) -> logout.logoutUrl("/logout").logoutSuccessUrl("/login"))
                ;

        return http.build();
    }

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(authProvider);
        return authenticationManagerBuilder.build();
    }



    @Bean
    public UserDetailsService userDetailsService()
    {
        return new MyDatabaseUserDetailsService();
    }

    @Bean
    public PasswordEncoder encoder()
    {
        return new BCryptPasswordEncoder(12, new SecureRandom());
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new CustomAuthenticationFailureHandler();
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new CustomAuthenticationSuccessHandler();
    }

    @Bean
    public BasicAuthenticationEntryPoint authenticationEntryPoint() {
        return new MyBasicAuthenticationEntryPoint();
    }



}
