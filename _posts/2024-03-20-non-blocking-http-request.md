---
 title: what is non-blocking http
 categories: 
    - cs
---


### non-blocking http
non-bloking http == 동시에 여러 요청을 수행하기위한 통신처리 스타일 <br>

?? > HTTP 통신에서 쓰레드가 요청을 수행하는데 이 요청에대한 응답을 기다리지않고, <br>
<b>비동기</b>식으로 동시에 다른쓰레드를 계속 이용해 요청을 동시에 수행할 수 있음을 의미한다.<br>
HTTP 통신을 핸들링 하기위해 사용 쓰레드가 기다리지 않게 사용<br>



> In traditional blocking I/O, when a thread makes an HTTP request, it waits until the response is received before moving on to the next instruction. This approach can lead to inefficiencies, especially in scenarios where the response time is unpredictable or when multiple requests need to be made concurrently
전통적인 블로킹 IO 방식은 쓰레드가 HTTP <b>동기식으로</b> 요청을 만들고 요청에대해 응답을 기다린다.<br>
이런 방식은 여러 요청을 동시에 수행할 수 없어 비효율성을 초래<br>


이를 위해 스프링에서는 Spring WebFlux를 제공한다. (for building non-blocking applications in java) <br>
추상적으로 제공하고, WebClient를 통해 non-blokcing HTTP request를 만든다. <br>



### 요약
비동기 통신


### 예제




``` java
    // 의존성 필요
    public Mono<User> selectUser(String token) {
        WebClient client = WebClient.create(autUrl);
        return client
                .get()
                .uri(uriBuilder -> uriBuilder.path("/token/access/user")
                        .queryParam("token", token)
                        .build())
                .retrieve()
                .bodyToMono(User.class);
    }

```
