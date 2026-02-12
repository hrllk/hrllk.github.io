---
title: "Spring의 ApplicationEventPublisher로 느슨하게 결합된 시스템 만들기"
categories:
  - spring
  - designPattern
tags:
  - ApplicationEventPublisher
  - Observer Pattern
  - Events
  - Decoupling
  - Spring Boot
published: false
---

<!-- TODO:  -->

## 서론

이벤트기반 이키텍처
Spring에서 제공하는 인터페이스

### Observer Pattern (Behavior)
상태가 변할 때

Spring Framework로 애플리케이션을 개발하다 보면, 여러 컴포넌트가 서로 상호작용해야 하는 경우가 많습니다. 하지만 컴포넌트 간의 직접적인 의존성은 코드를 경직시키고, 유지보수와 확장을 어렵게 만듭니다.

이 문제를 해결하는 우아한 방법 중 하나는 **이벤트 기반(Event-driven) 아키텍처**를 도입하는 것입니다. Spring은 이를 위해 `ApplicationEventPublisher`라는 강력한 도구를 제공합니다.

이 포스트에서는 `ApplicationEventPublisher`가 무엇인지, 어떤 디자인 패턴에 기반하는지, 그리고 실제 코드에서 어떻게 활용하여 시스템의 결합도를 낮출 수 있는지 알아보겠습니다.

## 옵저버 디자인 패턴 (Observer Design Pattern)

Spring의 이벤트 메커니즘을 이해하려면 먼저 **옵저버 디자인 패턴**을 알아야 합니다. 이 패턴은 객체의 상태 변화를 관찰하는 '옵저버' 목록을 객체에 등록하여, 상태 변화가 있을 때마다 메서드 등을 통해 옵저버에게 직접 통지하도록 하는 디자인 패턴입니다.

- **Publisher (발행자)**: 이벤트가 발생했음을 알리는 주체입니다. 자신의 상태가 변경되면 자신에게 등록된 옵저버들에게 알립니다.
- **Subscriber (구독자 또는 Listener)**: 발행자에게서 알림을 수신하는 주체입니다. 특정 이벤트를 구독하고 있다가, 해당 이벤트가 발생하면 특정 동작을 수행합니다.

`ApplicationEventPublisher`는 바로 이 옵저버 패턴의 구현체입니다. 이를 통해 특정 로직(Publisher)은 다른 로직(Subscriber)을 직접 호출할 필요 없이, "이벤트가 발생했다"고 외치기만 하면 됩니다.

## Spring 이벤트의 핵심 구성 요소

Spring에서 이벤트를 사용하기 위해 알아야 할 세 가지 핵심 요소가 있습니다.

1.  **`ApplicationEvent`**: 발행할 이벤트를 정의하는 클래스입니다. 이벤트와 관련된 데이터를 담는 역할을 합니다. Spring 4.2부터는 `ApplicationEvent`를 상속할 필요 없이, 일반 POJO(Plain Old Java Object)를 이벤트로 사용할 수 있습니다.
2.  **`ApplicationEventPublisher`**: 이벤트를 발행하는 역할을 하는 인터페이스입니다. 서비스나 컴포넌트에 주입하여 `publishEvent()` 메서드로 이벤트를 발생시킵니다.
3.  **`@EventListener` (또는 `ApplicationListener`)**: 발행된 이벤트를 수신하여 처리하는 역할을 합니다. 메서드에 이 어노테이션을 붙여 특정 이벤트를 구독할 수 있습니다.

## 실제 예제로 배우는 ApplicationEventPublisher 활용법

이제 실제 코드를 통해 `ApplicationEventPublisher`를 어떻게 사용하는지 단계별로 알아보겠습니다. "티켓 처리 감사 로그를 남기는" 시나리오를 예로 들어보겠습니다.

### 1단계: 커스텀 이벤트 정의하기

먼저, 감사 로그에 필요한 데이터를 담을 이벤트 클래스를 정의합니다.

```java
// DefaultTcktAuditLogEvent.java
public class DefaultTcktAuditLogEvent {
    private final String actionType;
    private final String tcktNo;
    private final String userId;

    // 생성자, Getter
    public DefaultTcktAuditLogEvent(String actionType, String tcktNo, String userId) {
        this.actionType = actionType;
        this.tcktNo = tcktNo;
        this.userId = userId;
    }

    public String getActionType() {
        return actionType;
    }

    public String getTcktNo() {
        return tcktNo;
    }

    public String getUserId() {
        return userId;
    }
}
```
이 클래스는 처리 유형(`actionType`), 티켓 번호(`tcktNo`), 그리고 사용자 ID(`userId`)를 필드로 가집니다.

### 2단계: 이벤트 발행하기 (Publisher)

다음으로, 핵심 비즈니스 로직을 처리하는 서비스에서 `ApplicationEventPublisher`를 주입받아 이벤트를 발행합니다.

```java
// TcktExcnCommandServiceImplV2.java
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class TcktExcnCommandServiceImplV2 {

    private final ApplicationEventPublisher eventPublisher;

    // 생성자를 통해 ApplicationEventPublisher 주입
    public TcktExcnCommandServiceImplV2(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void executeTicketProcess(String tcktNo, String userId) {
        // --- 핵심 비즈니스 로직 수행 ---
        System.out.println(tcktNo + " 티켓에 대한 핵심 로직을 처리합니다.");
        // --- 로직 수행 완료 ---

        // 감사 로그를 남기기 위해 이벤트를 발행한다.
        eventPublisher.publishEvent(new DefaultTcktAuditLogEvent("P", tcktNo, userId));
    }
}
```
`TcktExcnCommandServiceImplV2`는 티켓 처리라는 자신의 핵심 책임에만 집중합니다. 감사 로그를 어떻게, 어디에 저장할지는 전혀 알 필요가 없습니다. 그저 `publishEvent()`를 통해 "티켓 처리가 시작됐어!"라는 사실을 알릴 뿐입니다.

### 3단계: 이벤트 처리하기 (Listener)

마지막으로, 발행된 이벤트를 받아서 처리할 리스너를 만듭니다.

```java
// AuditLogService.java
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
public class AuditLogService {

    @EventListener
    public void handleAuditEvent(DefaultTcktAuditLogEvent event) {
        // 이벤트에 담긴 데이터를 사용하여 감사 로그를 DB에 저장하거나 파일에 기록
        System.out.println(
            "감사 로그 기록: [유형: " + event.getActionType() +
            ", 티켓번호: " + event.getTcktNo() +
            ", 사용자: " + event.getUserId() + "]"
        );
        // e.g., auditRepository.save(log);
    }
}
```
`AuditLogService`의 `handleAuditEvent` 메서드는 `@EventListener` 어노테이션을 통해 `DefaultTcktAuditLogEvent` 타입의 이벤트를 구독합니다. 해당 이벤트가 발행되면 Spring이 자동으로 이 메서드를 호출해줍니다.

## ApplicationEventPublisher 사용의 이점

이러한 이벤트 기반 방식을 사용하면 다음과 같은 장점을 얻을 수 있습니다.

*   **느슨한 결합 (Loose Coupling)**: 이벤트를 발행하는 컴포넌트와 처리하는 컴포넌트가 서로를 전혀 알지 못합니다. `TcktExcnCommandServiceImplV2`는 `AuditLogService`의 존재를 모르며, 따라서 `AuditLogService`의 코드가 변경되거나 삭제되어도 영향을 받지 않습니다.
*   **관심사의 분리 (Separation of Concerns)**: 각 컴포넌트는 자신의 책임에만 집중할 수 있습니다. 티켓 처리는 티켓 처리 서비스가, 감사 로그는 감사 서비스가 담당합니다. 코드가 명확해지고 단일 책임 원칙(SRP)을 지키기 쉬워집니다.
*   **확장성**: 새로운 기능이 필요할 때 기존 코드를 수정할 필요가 없습니다. 예를 들어, 티켓 처리 시 사용자에게 이메일 알림을 보내고 싶다면, 새로운 `EmailNotificationListener`를 추가하기만 하면 됩니다.
*   **비동기 처리**: 기본적으로 이벤트는 동기적으로 처리되지만, `@Async` 어노테이션을 사용하면 간단하게 비동기 처리가 가능합니다. 이를 통해 DB 저장이나 외부 API 호출처럼 시간이 오래 걸리는 작업을 별도의 스레드에서 처리하여 애플리케이션의 응답성을 높일 수 있습니다.

## 결론

Spring의 `ApplicationEventPublisher`는 옵저버 디자인 패턴을 활용하여 컴포넌트 간의 의존성을 제거하고, 유연하고 확장 가능한 애플리케이션을 만드는 데 매우 유용한 도구입니다.

서비스 간의 결합도가 높아 코드 수정이 부담스러울 때, 혹은 핵심 로직과 부가 기능(로깅, 알림, 데이터 동기화 등)을 분리하고 싶을 때 `ApplicationEventPublisher` 도입을 적극적으로 고려해보시길 바랍니다.
