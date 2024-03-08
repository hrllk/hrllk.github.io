---
 title: troubleShooting getReader has already been called
 categories: 
    - troubleShooting 
---




### error 
``` log
2024-03-04 15:03:33 [INFO] [http-nio-8080-exec-3] o.o.tps.api.config.InterceptorConfig - Request URL: [http://localhost:8080/post-test] || Method: [POST] || Data: [{"name": "hhh","age": "18"}]
2024-03-04 15:03:33 [ERROR] [http-nio-8080-exec-3] o.a.c.c.C.[.[.[.[dispatcherServlet] - Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed: java.lang.IllegalStateException: getReader() has already been called for this request] with root cause
java.lang.IllegalStateException: getReader() has already been called for this request
	at org.apache.catalina.connector.Request.getInputStream(Request.java:1026)
	at org.apache.catalina.connector.RequestFacade.getInputStream(RequestFacade.java:298)
	at org.springframework.http.server.ServletServerHttpRequest.getBody(ServletServerHttpRequest.java:216)
	at org.springframework.web.servlet.mvc.method.annotation.AbstractMessageConverterMethodArgumentResolver$EmptyBodyCheckingHttpInputMessage.<init>(AbstractMessageConverterMethodArgumentResolver.java:327)
	at org.springframework.web.servlet.mvc.method.annotation.AbstractMessageConverterMethodArgumentResolver.readWithMessageConverters(AbstractMessageConverterMethodArgumentResolver.java:174)
	at org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor.readWithMessageConverters(RequestResponseBodyMethodProcessor.java:159)
	at org.springframework.web.servlet.mvc.method.annotation.RequestResponseBodyMethodProcessor.resolveArgument(RequestResponseBodyMethodProcessor.java:134)
	at org.springframework.web.method.support.HandlerMethodArgumentResolverComposite.resolveArgument(HandlerMethodArgumentResolverComposite.java:122)
	at org.springframework.web.method.support.InvocableHandlerMethod.getMethodArgumentValues(InvocableHandlerMethod.java:228)
	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:182)
	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:920)
	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:830)
	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
    ...
```
filter 단에서 요청에 대한 payload 출력중 위와 같은 오류 발생 <br>



### why?
> this exception typically occurs when there's an attempt to read the request body (using getReader() or getInputStream()) after it has already been consumed or read earlier in the request processing flow.

클라이언트부터 요청이 WAS로 넘어갈때 한번만 읽을 수 있는데 필터에서 이미 getReader() 메소드를 통해 페이로드를 읽어버렸기때문에, Controller 단에서 다시 읽으려고 하니 오류가 발생한것.. 



### how to solve?
아래 재정의된 두개의 커스텀 클래스를 이용해 incoming 된 request에대해 위에서 발생한 오류없이 로깅할 수 있음.

#### CustomServletRequestWrapper (extends HttpServletRequestWrapper)
<b>HttpServletRequestWrapper</b> 클래스를 통해 incoming 된 request에대해 위에서 발생한 오류없이 로깅.

##### Override getInputStream()
아래 CustomServletInputStream 객체(ServletInputStream 객체를 상속받은 커스텀 객체)와 cachedPayload를 반환.<br>

##### Override getReader()
해당 메소드를 재정의하여, BufferedReader객체를 응답한다. ( new BufferedReader(new ByteArrayInputStream(new ByteArrayInputStream(cachedPayload))); )<br>
BufferedReader객체는 요청의 payload를 read할 때 사용된다. <br>




#### CustomServletInputStream (extends ServletInputStream)
ServletInputStream 클래스를 상속받아 커스텀클래스를 생성하고, <br>
InputStream 클래스를 멤버변수로 등록하고. (추후 해당클래스의 Override된 메소드 내에서 사용하기 위함) <br>
아래 메소드를 재정의한다. <br>

##### Override isReady()
데이터를 읽을 가능 여부 체크하기 위한 용도 및 데이터를 읽을 때 사용(without blocking) <br>

##### Override read()
cachedInputStream 객체를 읽는데 사용. <br>

##### Override isFinished()
stream에서 모든 데이터가 읽혔을 때 호출되며, true 반환 그 외 false<br>
true를 반환하게끔 재설정한다. <br>




### references: 
https://www.baeldung.com/spring-http-logging<br>


