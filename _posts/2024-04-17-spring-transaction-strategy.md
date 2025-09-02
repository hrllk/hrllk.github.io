---
 title: Spring Transaction Strategy
 categories: 
     - spring
     - troubleShooting 
---




### Overview
---

Spring의 `@Transactional` 어노테이션은 매우 유용하지만, 기본 동작 방식에 대한 오해는 종종 데이터 정합성 문제로 이어질 수 있음. 해당 포스트에서는 핵심적인 두 가지 질문에 대해 명확히 짚으려 함


#### 롤백(Rollback)의 기본 규칙: `Unchecked Exception` vs `Checked Exception`

가장 흔한 오해는 "예외가 발생하면(모든) 롤백을 일으킨다." 이는 오해

| 예외 종류 | 기본 동작 | 예시 | Spring의 의도 |
| :--- | :--- | :--- | :--- |
| **`Unchecked Exception`** | **⭕️ 롤백 (Rollback)** | `RuntimeException` 및 그 하위 클래스들 (`NullPointerException`, `IllegalArgumentException`, `FeignException` 등) | "복구 불가능한 시스템 오류/버그". 데이터 정합성이 깨졌을 가능성이 높으므로 즉시 롤백하여 작업을 되돌린다. |
| **`Checked Exception`** | **❌ 커밋 (Commit)** | `IOException`, `SQLException`, `JsonProcessingException` 등 `Exception`을 상속하지만 `RuntimeException`이 아닌 클래스들 | "복구 가능한 예외". 개발자가 `try-catch`로 처리하여 비즈니스 로직을 이어갈 수 있다고 간주한다. 따라서 예외가 처리될 것을 기대하고 트랜잭션을 커밋한다. |

> **결론**: 질문하신 내용과 달리, Spring은 기본적으로 **`Checked Exception`에 대해서는 롤백을 수행하지 않습니다.**

#### 롤백 정책 제어하기: `@Transactional` 속성

Spring은 개발자가 이 기본 동작을 제어할 수 있도록 강력한 옵션을 제공함
-   **`rollbackFor`**: 특정 `Checked Exception`이 발생했을 때도 롤백을 강제하고 싶을 때 사용함
    ```java
    // JsonProcessingException (Checked Exception)이 발생해도 롤백하도록 설정
    @Transactional(rollbackFor = JsonProcessingException.class)
    public void processJson() throws JsonProcessingException {
        // ...
    }
    ```

-   **`noRollbackFor`**: 특정 `Unchecked Exception`이 발생했을 때 예외적으로 롤백을 막을 수 도 있음
    ```java
    // MyBusinessAlertException (RuntimeException)이 발생해도 롤백하지 않도록 설정
    @Transactional(noRollbackFor = MyBusinessAlertException.class)
    public void processWithAlert() {
        // ...
    }
    ```

### 아키텍처 시나리오별 트랜잭션 전략
---

#### 시나리오 A: 단일 데이터베이스 트랜잭션

가장 일반적인 경우로, 하나의 비즈니스 유스케이스가 **단일 데이터베이스** 내의 여러 테이블을 변경하는 상황

-   **전략**: 유스케이스가 시작되는 가장 바깥쪽의 **애플리케이션 서비스** 메소드에 `@Transactional`을 선언함
-   **예시**: `TicketEventHandleSampleService.issue()`
-   **동작**: 이 메소드에서 시작된 트랜잭션은 내부적으로 호출되는 모든 Repository 메소드에 전파(propagation)되어, 모든 DB 작업이 하나의 원자적인 단위로 묶이며, 중간에 `RuntimeException`이 발생하면 모든 작업이 롤백됨










<!-- #### 시나리오 B: 분산 환경과 Saga 패턴 -->
<!---->
<!-- `ticketPreparationFeignClient.publishEvent()`처럼 **외부 시스템을 네트워크로 호출**하는 작업이 포함된 경우, 단일 DB 트랜잭션으로 묶을 수 없습니다. 이때 **Saga 패턴**이 필요합니다. -->
<!---->
<!-- -   **Saga 패턴이란?**: 하나의 거대한 분산 트랜잭션 대신, 여러 개의 **로컬 트랜잭션(Local Transaction)**과 **보상 트랜잭션(Compensating Transaction)**으로 이루어진 비즈니스 프로세스입니다. -->
<!---->
<!-- -   **`TicketEventHandleSampleService`의 흐름 (Orchestration Saga)**: -->
<!--     1.  **[Local Transaction 1]** `ticketEventCommandComponent.generateTicketEvents()`: 이벤트들을 생성하고 DB에 저장 후 **커밋**. -->
<!--     2.  **[외부 시스템 호출]** `ticketPreparationFeignClient.publishEvent()`: 외부 메시지 브로커로 이벤트 발행. -->
<!--     3.  **[Local Transaction 2]** `ticketEventCommandComponent.leftSentEventHistory()`: 발행 결과를 DB에 저장 후 **커밋**. -->
<!---->
<!-- -   **실패 시나리오**: 만약 2번 단계(외부 호출)에서 실패하면 어떻게 될까요? 1번 단계는 이미 커밋되었으므로 되돌릴 수 없습니다. 이때 **보상 트랜잭션**이 필요합니다. -->
<!--     -   **보상 트랜잭션**: 1번 단계의 작업을 취소하는 로직(예: `cancelTicketEvents()`)을 명시적으로 호출하여 데이터의 최종 일관성을 맞춰줍니다. -->
<!---->
<!-- ### 3. 문제 해결: FeignException 발생 시 롤백 회피 전략 -->
<!---->
<!-- 이제 현재 겪고 계신 문제에 대한 구체적인 해결책입니다. -->
<!---->
<!-- #### 3-1. 문제 분석 -->
<!---->
<!-- -   **상황**: `publishAndRecordHistory` 메소드를 호출하는 상위 서비스(`TicketEventPublisher`)에 `@Transactional`이 걸려있다고 가정해 보겠습니다. -->
<!-- -   **흐름**: -->
<!--     1.  트랜잭션이 시작됩니다. -->
<!--     2.  `try` 블록에서 `FeignException` (`RuntimeException`)이 발생합니다. -->
<!--     3.  Spring 트랜잭션 관리자는 이 트랜잭션을 **"롤백 전용(rollback-only)"**으로 표시합니다. -->
<!--     4.  `catch` 블록이 실행됩니다. -->
<!--     5.  `finally` 블록에서 `leftSentEventHistory`가 호출되어 DB에 히스토리를 **INSERT/UPDATE** 하려고 시도합니다. -->
<!--     6.  메소드가 종료되는 시점에, 트랜잭션이 "롤백 전용"으로 표시되었기 때문에 **`leftSentEventHistory`가 수행한 DB 작업까지 포함하여 모든 것이 롤백됩니다.** -->
<!---->
<!-- 결과적으로, 히스토리 기록이 DB에 남지 않게 됩니다. -->
<!---->
<!-- #### 3-2. 해결책: 트랜잭션 분리 (`Propagation.REQUIRES_NEW`) -->
<!---->
<!-- 이 문제를 해결하려면 **"히스토리 기록"** 작업을 **기존 트랜잭션과 완전히 분리된 새로운 트랜잭션**에서 실행해야 합니다. -->
<!---->
<!-- -   **`@Transactional(propagation = Propagation.REQUIRES_NEW)`**: 이 옵션은 다음과 같이 동작합니다. -->
<!--     1.  메소드가 호출되면, **기존에 진행 중이던 트랜잭션을 잠시 보류(suspend)**합니다. -->
<!--     2.  **완전히 새로운 트랜잭션을 시작**합니다. -->
<!--     3.  메소드 로직을 실행합니다. 성공하면 **새로운 트랜잭션만 커밋**합니다. 실패하면 롤백합니다. -->
<!--     4.  메소드가 종료되면, 보류했던 **원래 트랜잭션을 다시 재개(resume)**합니다. -->
<!---->
<!-- 이를 통해, 원래 트랜잭션이 롤백되더라도, 히스토리 기록을 위한 새로운 트랜잭션은 독립적으로 커밋될 수 있습니다. -->
<!---->
<!-- #### 3-3. 구현 방법 -->
<!---->
<!-- 이 로직을 구현하려면 **반드시 별도의 Bean으로 분리**해야 합니다. Spring의 트랜잭션은 AOP 프록시를 통해 동작하므로, 같은 클래스 내의 메소드를 호출하면 트랜잭션 전파가 적용되지 않기 때문입니다. -->
<!---->
<!-- 1.  **히스토리 기록을 전담하는 새로운 컴포넌트 생성** -->
<!--     ```java -->
<!--     // TicketEventHistoryCommandComponent.java -->
<!--     @Component -->
<!--     @RequiredArgsConstructor -->
<!--     public class TicketEventHistoryCommandComponent { -->
<!--         private final TicketEventRepository ticketEventRepository; -->
<!---->
<!--         @Transactional(propagation = Propagation.REQUIRES_NEW) // <-- 핵심! -->
<!--         public void recordEventHistory(String eventNo, String status, String errorMessage) { -->
<!--             // 이 로직은 항상 새로운 트랜잭션에서 실행됩니다. -->
<!--             ticketEventRepository.createEventRotateDetail(..., status, errorMessage); -->
<!--         } -->
<!--     } -->
<!--     ``` -->
<!---->
<!-- 2.  **`TicketEventPublisher` 수정** -->
<!--     ```java -->
<!--     // TicketEventPublisher.java -->
<!--     @Component -->
<!--     @RequiredArgsConstructor -->
<!--     public class TicketEventPublisher { -->
<!--         // ... 기존 의존성 -->
<!--         private final TicketEventHistoryCommandComponent historyCommandComponent; // 새로운 의존성 주입 -->
<!---->
<!--         private void publishAndRecordHistory(AsyncMessageRequest request) { -->
<!--             // ... try-catch 로직 ... -->
<!---->
<!--             } catch (FeignException e) { -->
<!--                 // ... -->
<!--             } finally { -->
<!--                 // 기존 트랜잭션의 성공/실패 여부와 관계없이, -->
<!--                 // 이 메소드는 항상 독립적인 새 트랜잭션에서 실행되어 커밋됩니다. -->
<!--                 historyCommandComponent.recordEventHistory(eventNo, status, errorMessage); -->
<!--             } -->
<!--         } -->
<!--     } -->
<!--     ``` -->



































<!-- ### @Transactional  -->
<!-- 해당 애노테이션으로 DB의 트랜잭션을 이용해 <br> -->
<!-- 타임아웃을 설정하거나 읽을수 있게만 설정 혹은 롤백을 설정 할 수 있음 <br> -->
<!-- 추가로 Transaction을 위한 관리자 또한 설정이 가능 <br> -->
<!---->
<!-- #### Detail - Trasnactional  -->
<!-- 트랜잭션의 핸들링 -->
<!-- 바이트 코드를 조작해 행을 생성하거나, 커밋, 롤백할 때 바이트코드를 조작해 관리가 가능 함 -->
<!---->
<!-- <!-- 프록시 안에서는 스프링이 내부메소드에서는 호출을 무시 --> -->
<!-- @Trasnactional 애노테이션 선언시, 스프링은 트랜잭션 관리에 해당메소드를 감싸게됨 -->
<!---->
<!---->
<!-- ### Usage -->
<!-- interface, class, method 에 선언 가능 -->
<!-- 선언시, 스프링(?)이 우선순위를 오름차순으로 재정의 -->
<!-- 스프링은 클래스 수준의 애노테이션을  -->
<!-- 클래스에 애노테이션을 설정 할 경우, 스프링이 해당 클래스 내부에 public인 method들에 해당 애노테이션을 할당 -->
<!-- 하지만, 개발자가 private 혹은 protected 레벨의 method에도 실수로 할당할지라도 스프링은 무시함 -->
<!---->
<!-- !인터페이스에 할당하는것은 권고되지않음 but @Repository 애노테이션이 달린 interface 에서는 예외(with spring Data) -->
<!---->
<!---->
<!-- PlatformTransactionManager 인터페이스를 기븐으로 매니징을 진행.  -->
<!-- 트랜잭션 관리 메커니즘을 지원 like JDBC, JPA ...  -->
<!-- spring boot 에선 기본적으로 DataSrouceTransactionManager 을 통해관리를 진행 (Single DataSource 일때 기준) -->
<!---->
<!-- In Spring Boot, the default transaction management strategy is based on the `PlatformTransactionManager` interface, which provides support for various transaction management mechanisms such as JDBC, JPA, JTA, etc. By default, Spring Boot uses the `DataSourceTransactionManager` for managing transactions when working with a single data source. -->
<!-- If you want to use JTA (Java Transaction API) for distributed transactions involving multiple transactional resources (such as multiple databases or JMS queues), you can configure Spring Boot to use JTA by adding the necessary dependencies and configuration. -->
<!-- To enable JTA in Spring Boot, you typically need to do the following: -->
<!-- 1. Add the necessary JTA dependencies to your project. For example, you can use Atomikos, Bitronix, or Narayana as JTA providers. -->
<!-- 2. Configure the JTA transaction manager in your Spring Boot application. This involves setting up the JTA transaction manager bean and configuring it to handle distributed transactions. -->
<!-- 3. Update your application properties or configuration to use JTA for transaction management. -->
<!-- By default, Spring Boot does not use JTA for transaction management, but you can configure it to use JTA if your application requires distributed transactions. -->
<!---->
<!---->
<!-- ### 주의사항 -->
<!---->
<!---->
<!---->
<!-- ### reference -->
<!-- https://www.baeldung.com/spring-transactional-propagation-isolation -->
