//package com.huiguan.web.config;
//
//import io.swagger.jaxrs.config.BeanConfig;
//import io.swagger.jaxrs.json.JacksonJsonProvider;
//import org.apache.cxf.Bus;
//import org.apache.cxf.endpoint.Server;
//import org.apache.cxf.jaxrs.JAXRSServerFactoryBean;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.Arrays;
//
//@Configuration
//public class SwaggerConfig{
//    @Autowired
//    private Bus bus;
//
//
//
//
//    @Bean
//    public Server rsServer() {
//        final JAXRSServerFactoryBean endpoint = new JAXRSServerFactoryBean();
//        endpoint.setProvider(new JacksonJsonProvider());
//        endpoint.setBus(bus);
//        endpoint.setAddress("/");
//        endpoint.setServiceBeans(Arrays.<Object>asList(userController()));
//        endpoint.setFeatures(Arrays.asList(new Swagger2Feature()));
//        return endpoint.create();
//    }
//
//    @Bean
//    public UserController userController() {
//        return new UserController();
//    }
//}