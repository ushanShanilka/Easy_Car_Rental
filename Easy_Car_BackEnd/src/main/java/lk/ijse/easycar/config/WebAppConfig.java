package lk.ijse.easycar.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@ComponentScan(basePackages = "lk.ijse.easycar")
@EnableWebMvc
public class WebAppConfig {
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper ();
    }

}
