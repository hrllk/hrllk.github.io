---
 title: getting started logging aspect 
 categories: 
     - spring
---



### what's AOP?
> AOP stands for Aspect-Oriented Programming. It is a programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns. In AOP, cross-cutting concerns are aspects of a program that affect multiple parts of the codebase and are difficult to modularize using traditional object-oriented programming techniques.
AOP achieves this separation by defining aspects, which are reusable modules that encapsulate cross-cutting concerns. These aspects can then be applied to different parts of the codebase without modifying the core logic of the program. AOP is often used to address concerns such as logging, security, transaction management, and error handling.


Aspect == 관점<br>

AOP == Aspect-Oriented Programming <br>
관점 측면에서 코드를 구성하는 방법론<br>
모듈성을 높이기위해 관심사를 분리하여 캡슐화 후 재사용<br>
주로 logging, transaction 관리, 오류처리와 같은 관심사를 다루는데 사용됨<br>


### logging aspect 
> As the name suggests, Aspect-Oriented Programming focuses on aspects rather than objects and classes. We use AOP to implement additional functionality for specific application parts without modifying their current implementations.

AOP를 통해 현재 구현된 기능을 변경하지 않고 기능을 추가 할 수 있음


### concepts 
    - Aspect: 애플리케이션 전체혹은 교차구간에 적용하기 위한 기능들
    - Join Point: 반영하고자 하는 애플리케이션 흐름의 지점
    - Advice: 특정 지점에서 실행되어야 할 작업
    - Pointcut: 후킹(intercept) 할 지점을 지정하기 위한 용도의 애노테이션


### usage
#### 1. @Aspect (with @Component)
``` java
@Aspect
@Component
public class LoggingAspect {
}
```

(@Component 필요!!) @Aspect 애노테이션만 선언하는 경우 스프링이 컴포넌트 스캔하지 못함(빈등록 X) <br>
Spring 컨테이너에 등록되기위해 @Component 애노테이션 추가 선언이 필요. <br>


#### 2. @Pointcut 
용도: 후킹intercept 할 지점을 지정하기 위한 용도의 애노테이션 <br>
정규식과 함께 사용되며, access modifier 설정이 가능함 (private or public) <br>
``` java
    @Pointcut("execution(* org.ok.product.api.domain..*.*(..))")
    public void allService(){

    };
```


#### 3. @Around
> it allows us to implement custom behavior before and after the method invocation. 
Moreover, with this advice, we can decide whether to proceed with the specific join point, return a custom result, or throw an exception.

용도: 메소드 시작전후에 custom 행위를 하기 위한 용도 <br>
+ 결정할 수 있음 특정 결과를 응답할지 or 예외를던질지 or 혹은 특정 조인 포인트를 실행할지 결정할 수 있음 <br>

``` java
    @Around(value = "allService()")
    public Object logTrace(ProceedingJoinPoint joinPoint) throws Throwable {

        TraceStatus status = null;

        try{
            status = logTrace.begin(joinPoint.getSignature().toShortString());
            Object result = joinPoint.proceed();

            logTrace.end(status);

            return result;
        }catch (Throwable e){
            e.fillInStackTrace();
            logTrace.exception(status, e);
            throw e;
        }
    }
```

위의 value prop에는 @Pointcut에서 선언한 메소드명을 명시, <br>
결과로 명시된 method명과 matched 되는 method 중심으로 실행됨<br>

@Around 애노테이션과 선언된 메소드는 ProceedingJoinPoint라는 파라미터를 허용한다. (해당 파라미터는 JoinPoint를 확장받은 클래스)<br>
proceed() method를 보유하고 있으며, 해당 메소드는 다음 advice를 실행해주는 용도이다 (if it exists) (dofilterChain의 느낌?)<br>


##### getArgs() 
joinPoint에서 getArgs() method 를 호출한다. 메소드의 인자 배열을 되찾기 위해
``` java
    /**
     * @return the arguments at this join point
     */
    Object[] getArgs();
```

##### getSignature(), getName()
또한 현재 후킹intercept하고있는 method명을 알기 위해 getSignature(), getName() method 사용. 

##### proceed()
target method를 실행하기위해, 그리고 그 결과를 응답받기위해 proceed() method 사용







### references 
[https://www.baeldung.com/spring-aspect-oriented-programming-logging] (https://www.baeldung.com/spring-aspect-oriented-programming-logging)
