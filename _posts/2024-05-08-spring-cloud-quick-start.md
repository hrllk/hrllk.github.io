---
 title: spring cloud getting started 
 categories: 
     - spring
---



### spring cloud config 
spring cloud config server === 설정값들을 저장하고 있는 서버<br>
추후 여러 애플리케이션에서 해당 서버로 저장되어있는 설정값들을 요청시, 저장되어있는 설정값들을 서빙하는 용도로 활용됨<br>
spring 애플리케이션에 매우 적합하지만 다른 종류 언어기반의 애플리케이션과도 활용됨<br>

### dependencies 
- spring-cloud-config-server
- spring-boot-starter-web


### configuration 
#### @EnableConfigServer 
``` java 
@SpringBootApplication
@EnableConfigServer
public class ConfigServer {
    
    public static void main(String[] arguments) {
        SpringApplication.run(ConfigServer.class, arguments);
    }
}
```

### 구성방법 
git을 이용해 설정값을 구성할 수 있고, <br>
http 프로토콜 or ssh 프로토콜 or 파일시스템을 이용해 설정값들을 구성할 수 있다.<br>
~~#### 구성방법 1: http or ssh protocol or file system~~
생략


#### 구성방법 2: git protocol 
전자의 경우, git기반의 서버 구성을 위해 repo를 초기화해준뒤 환경설정값이 파일을 생성하고, 환경설정 값을 채워주어야함.<br>
환경설정값이 담겨있는 파일명은 대개 "application.properties" 를 사용<br>

##### authentication issue 
인증 이슈를 만날 수 있음.<br>
git authkey를 인증서버가 구동되고있는 서버쪽에 등록해주어야함 (~/.ssh/authorized_keys)<br>







### references 
[https://www.baeldung.com/spring-cloud-configuration](https://www.baeldung.com/spring-cloud-configuration)
