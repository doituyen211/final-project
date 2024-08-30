package org.green.education.config;


import org.green.education.converter.StringToLocalDateConverter;
import org.green.education.converter.LocalDateToStringConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class GradeConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToLocalDateConverter());
        registry.addConverter(new LocalDateToStringConverter());
    }
}
