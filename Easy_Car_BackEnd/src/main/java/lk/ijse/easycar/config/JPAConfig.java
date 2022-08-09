package lk.ijse.easycar.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "lk.ijse.easycar.repo")
@PropertySource ( "classpath:application.properties" )
public class JPAConfig {

    @Autowired
    Environment environment;
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource ds,JpaVendorAdapter va){
        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean ( );
        factoryBean.setDataSource ( ds );
        factoryBean.setJpaVendorAdapter ( va );
        factoryBean.setPackagesToScan ( environment.getRequiredProperty ( "entity.package" ) );
        return factoryBean;
    }
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource ( );
        dataSource.setDriverClassName ( environment.getRequiredProperty ("my.driver") );
        dataSource.setUrl ( environment.getRequiredProperty ( "db.url" ) );
        dataSource.setUsername ( environment.getRequiredProperty ( "db.userName" ) );
        dataSource.setPassword ( environment.getRequiredProperty ( "db.password" ));
        return dataSource;
    }
    @Bean
    public JpaVendorAdapter vendorAdapter(){
        HibernateJpaVendorAdapter va = new HibernateJpaVendorAdapter ( );
        va.setDatabasePlatform ( environment.getRequiredProperty ( "db.dialect" ) );
        va.setDatabase ( Database.MYSQL );
        va.setGenerateDdl ( true );
        va.setShowSql ( true );
        return va;
    }
    @Bean
    public PlatformTransactionManager transactionManager( EntityManagerFactory emf ){
        return new JpaTransactionManager ( emf );
    }

}
