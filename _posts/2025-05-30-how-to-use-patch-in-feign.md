---
 title: how to use PATCH method in feign client
 categories:
    - java
    - troubleShooting
---

### overview
---
> 2025-05-27 17:30:17 [ERROR] [http-nio-8082-exec-1] o.o.t.c.c.GlobalExceptionHandler - occur an exception: 
  feign.RetryableException: Invalid HTTP method: PATCH executing PATCH http://localhost:8085/users/1


외부 어플리케이션과 연계중 오류 발생



### why?
---

외부 호출하기위한 클라이언트로 FeignClient 사용하였고, 예외의 원인은 FeignClient가 내부적으로 사용하는 HttpClient(HttpUrlConnection)의 메소드 미지원 함<br>
해당클래스는 기본적으로 PATCH 메소드를 지원하지 않음, Http1.1 이전에 설계되었지만 설계 당시에 PATCH가 널리 사용되지 않아 해당기능이 포함되지 않았고,  PATCH요청 전송에 제약 따라서 Feign 사용시 PATCH 메소드를 지원하는 HttpClient를 사용하도록 설정이 필요<br>



### how to solve
---

#### 1. 의존성 추가

``` groovy
implementation 'io.github.openfeign:feign-okhttp'
```

#### 2. Feign 설정

``` java
@Configuration
public class FeignConfig {

    // ...

    @Bean
    public OkHttpClient okHttpClient() {
        return new OkHttpClient();
    }

    // ...

}

```














### reference
[https://www.baeldung.com/openfeign-http-patch-request](https://www.baeldung.com/openfeign-http-patch-request)

