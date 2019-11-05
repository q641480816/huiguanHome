//package blog.configs;
//import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.thymeleaf.spring4.SpringTemplateEngine;
//import org.thymeleaf.spring4.view.ThymeleafViewResolver;
//import org.thymeleaf.templateresolver.ServletContextTemplateResolver;
//
//import java.io.IOException;
//
//@Configuration
//@ComponentScan
//@EnableAutoConfiguration
//public class ThymeleafConfig {
//    @Bean
//    ServletContextTemplateResolver templateResolver(){
//        ServletContextTemplateResolver resolver=new ServletContextTemplateResolver();
//        resolver.setSuffix(".html");
//        resolver.setPrefix("classpath:/templates/");
//        resolver.setTemplateMode("HTML5");
//        String current = null;
//        try {
//            current = new java.io.File( "." ).getCanonicalPath();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        System.out.println("Current dir:"+current);
//        String currentDir = System.getProperty("user.dir");
//        System.out.println("Current dir using System:" +currentDir);
//        System.out.println("hahahaha");
//        return resolver;
//    }
//
//    @Bean
//    SpringTemplateEngine engine(){
//        SpringTemplateEngine engine=new SpringTemplateEngine();
//        engine.setTemplateResolver(templateResolver());
//        return engine;
//    }
//
//    @Bean
//    ThymeleafViewResolver viewResolver(){
//        ThymeleafViewResolver viewResolver=new ThymeleafViewResolver();
//        viewResolver.setTemplateEngine(engine());
//        return viewResolver;
//    }
//}
////
////import nz.net.ultraq.thymeleaf.LayoutDialect;
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.thymeleaf.spring4.SpringTemplateEngine;
////import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;
////import org.thymeleaf.spring4.view.ThymeleafViewResolver;
////import org.thymeleaf.templatemode.StandardTemplateModeHandlers;
////import org.thymeleaf.templateresolver.ServletContextTemplateResolver;
////
////import java.nio.charset.StandardCharsets;
////
////@Configuration
////public class ThymeleafConfig {
////
////    @Bean
////    public SpringTemplateEngine springTemplateEngine()
////    {
////        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
////        templateEngine.addTemplateResolver(htmlTemplateResolver());
////        return templateEngine;
////    }
////
////    @Bean
////    public SpringResourceTemplateResolver htmlTemplateResolver()
////    {
////        SpringResourceTemplateResolver emailTemplateResolver = new SpringResourceTemplateResolver();
////        emailTemplateResolver.setPrefix("classpath:/templates/");
////        emailTemplateResolver.setSuffix(".html");
////        emailTemplateResolver.setTemplateMode(StandardTemplateModeHandlers.HTML5.getTemplateModeName());
////        emailTemplateResolver.setCharacterEncoding(StandardCharsets.UTF_8.name());
////        return emailTemplateResolver;
////    }
////}