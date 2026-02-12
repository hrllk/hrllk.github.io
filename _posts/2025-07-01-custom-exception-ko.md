---
title: 커스텀 예외
categories:
   - java
toc: true
toc_label: "TOC"
published: false
---

<!-- TODO:  -->

### 개요
이 블로그 게시물은 Spring Boot 애플리케이션에서 커스텀 예외를 생성하고 처리하는 방법에 대한 포괄적인 가이드를 제공합니다. 커스텀 예외의 필요성, 구현 방법, 그리고 Spring REST API 컨텍스트 내에서 효과적으로 관리하기 위한 모범 사례를 다룰 것입니다. 범위는 다음과 같습니다:
- Java 예외의 기본 이해.
- 커스텀 체크 예외 및 언체크 예외 설계 및 구현.
- `@ControllerAdvice` 및 `@ExceptionHandler`를 사용한 중앙 집중식 예외 처리.
- API 클라이언트에 의미 있는 오류 응답 제공.
- 커스텀 예외 사용을 위한 모범 사례.

## 예외 소개

예외는 프로그램의 정상적인 흐름을 방해하는 이벤트입니다. Java에서 예외는 발생한 오류나 비정상적인 이벤트에 대한 정보를 캡슐화하는 객체입니다. 이는 오류 처리 코드를 정상적인 프로그램 로직과 분리하여 오류를 처리하는 구조화된 방법을 제공합니다.

Java의 예외 계층은 `Throwable` 클래스에 뿌리를 두고 있으며, 이 클래스에는 `Error`와 `Exception`이라는 두 가지 직접적인 하위 클래스가 있습니다.
- **오류 (Errors)**: 합리적인 애플리케이션이 잡으려 하지 않아야 할 심각한 문제를 나타냅니다. 예를 들어 `OutOfMemoryError` 또는 `StackOverflowError`가 있습니다.
- **예외 (Exceptions)**: 애플리케이션이 잡으려 할 수 있는 조건을 나타냅니다. 이들은 다시 다음으로 나뉩니다:
    - **체크 예외 (Checked Exceptions)**: 메서드에 의해 발생할 수 있지만 메서드 내에서 처리되지 않는 경우 메서드의 `throws` 절에 선언되어야 합니다. 컴파일러가 이를 강제하여 견고한 오류 처리를 촉진합니다. `IOException`, `SQLException` 등이 예입니다.
    - **언체크 예외 (Unchecked Exceptions, 런타임 예외)**: 선언하거나 잡을 필요가 없습니다. 일반적으로 프로그래밍 오류를 나타냅니다. `NullPointerException`, `ArrayIndexOutOfBoundsException` 등이 예입니다.

### 왜 커스텀 예외인가?

Java는 풍부한 내장 예외 세트를 제공하지만, 특히 Spring으로 구축된 복잡한 애플리케이션에서 커스텀 예외를 생성해야 하는 몇 가지 설득력 있는 이유가 있습니다:

1.  **향상된 가독성 및 명확성**: 커스텀 예외는 일반적인 예외보다 특정 비즈니스 로직 오류나 애플리케이션별 문제를 더 명확하게 전달할 수 있습니다. 예를 들어, 유효하지 않은 사용자 ID에 대해 일반적인 `IllegalArgumentException`을 던지는 대신, `UserNotFoundException` 또는 `InvalidUserIdException`이 훨씬 더 설명적입니다.

2.  **세분화된 오류 처리**: 다양한 오류 시나리오에 대해 고유한 예외 유형을 생성함으로써, 더 정확하고 목표 지향적인 오류 처리 메커니즘을 구현할 수 있습니다. 이를 통해 애플리케이션의 다른 부분이나 API의 다른 소비자가 특정 오류 조건에 적절하게 반응할 수 있습니다.

3.  **오류 세부 정보 캡슐화**: 커스텀 예외는 오류와 관련된 추가 컨텍스트 및 데이터를 캡슐화할 수 있습니다. 예를 들어, `ProductOutOfStockException`은 제품 ID와 사용 가능한 재고 수량을 포함할 수 있어 디버깅이나 클라이언트에 반환하는 데 유용한 정보를 제공합니다.

4.  **분리 및 유지 관리 용이성**: 커스텀 예외를 사용하면 비즈니스 로직을 기본 기술 예외로부터 분리하는 데 도움이 됩니다. 이는 코드를 더 깔끔하고 이해하기 쉬우며 유지 관리하기 쉽게 만듭니다. 커스텀, 애플리케이션별 예외를 사용하는 경우 기본 프레임워크나 라이브러리의 변경 사항이 오류 처리 로직에 영향을 미칠 가능성이 적습니다.

5.  **일관된 API 오류 응답**: REST API에서 커스텀 예외는 특정 HTTP 상태 코드 및 표준화된 오류 응답 본문에 매핑될 수 있습니다. 이는 API 소비자를 위한 일관되고 예측 가능한 오류 보고 메커니즘을 보장하여 전반적인 사용자 경험을 개선하고 API 통합을 원활하게 합니다. 예를 들어, `ResourceNotFoundException`은 일관되게 HTTP 404에 매핑될 수 있고, `UnauthorizedAccessException`은 HTTP 401에 매핑될 수 있습니다.

6.  **도메인 주도 설계 (DDD)**: DDD 접근 방식에서 커스텀 예외는 도메인 특정 불변성과 비즈니스 규칙 위반을 나타내는 데 자연스럽게 적합합니다. 이는 도메인 모델을 더 표현적이고 자체 검증 가능하게 만듭니다.

다음 섹션에서는 Spring Boot 애플리케이션 내에서 이러한 커스텀 예외를 설계, 구현 및 효과적으로 처리하는 방법에 대해 자세히 설명합니다.

## Java에서 커스텀 예외 생성

Java에서 커스텀 예외를 생성하는 것은 간단합니다. 기존 예외 클래스를 확장하기만 하면 됩니다. 어떤 클래스를 확장할지(`Exception`은 체크 예외, `RuntimeException`은 언체크 예외)는 컴파일러가 예외 처리를 강제할지 여부에 따라 달라집니다.

### 커스텀 예외의 기본 구조

모든 커스텀 예외는 최소한 다음을 포함해야 합니다:
- `String` 메시지를 받는 생성자.
- 선택적으로 `String` 메시지와 `Throwable` 원인을 받는 생성자.

또한 슈퍼클래스 생성자를 호출하는 생성자를 포함하는 것이 좋은 관행입니다.

체크 예외와 언체크 커스텀 예외의 예를 살펴보겠습니다.

### 1. 커스텀 체크 예외

체크 예외는 `java.lang.Exception`을 확장합니다. 컴파일러는 이 예외를 `try-catch`하거나 `throws`를 사용하여 메서드 시그니처에 선언하도록 강제합니다. 이는 일반적으로 파일이 발견되지 않거나 외부 소스의 유효하지 않은 입력과 같이 잘 작성된 애플리케이션이 정상적으로 처리해야 할 것으로 예상되는 문제에 사용됩니다.

```java
// src/main/java/com/example/exception/ResourceNotFoundException.java
package com.example.exception;

public class ResourceNotFoundException extends Exception {

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

**체크 예외를 사용하는 경우:**
- 메서드의 클라이언트가 예외로부터 합리적으로 복구할 수 있을 것으로 예상되는 경우.
- 애플리케이션 제어 범위를 벗어나는 외부 실패(예: I/O 오류, SQL 오류)의 경우.
- 호출자가 예외를 명시적으로 처리하도록 강제하려는 경우.

### 2. 커스텀 언체크 예외 (런타임 예외)

언체크 예외는 `java.lang.RuntimeException`을 확장합니다. 이들은 메서드의 `throws` 절에 선언할 필요가 없으며, 잡을 필요도 없습니다. 일반적으로 유효하지 않은 인수, 널 포인터 또는 코드의 버그를 나타내는 논리적 오류와 같은 프로그래밍 오류에 사용됩니다.

```java
// src/main/java/com/example/exception/InvalidInputException.java
package com.example.exception;

public class InvalidInputException extends RuntimeException {

    public InvalidInputException(String message) {
        super(message);
    }

    public InvalidInputException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

**언체크 예외를 사용하는 경우:**
- 코드의 결함을 나타내는 프로그래밍 오류(예: `NullPointerException`, `IllegalArgumentException`)의 경우.
- 메서드의 클라이언트가 예외로부터 합리적으로 복구할 수 있을 것으로 예상되지 않는 경우.
- 예외가 너무 만연하여 모든 메서드 시그니처에 선언하면 코드를 읽기 어렵게 만드는 경우.

### 체크 예외와 언체크 예외 중 선택

체크 예외 또는 언체크 예외를 사용할지 여부 결정은 종종 오류의 성격에 따라 달라집니다:
- **체크 예외**는 *복구 가능한* 조건에 사용되며, 호출자가 이를 처리하도록 강제합니다.
- **언체크 예외**는 *복구 불가능한* 프로그래밍 오류 또는 명시적인 처리가 불가능하거나 바람직하지 않은 상황에 사용됩니다.

Spring 애플리케이션에서는 언체크 예외(런타임 예외)가 HTTP 오류 응답(예: 4xx 클라이언트 오류)을 초래하는 비즈니스 로직 오류에 종종 선호됩니다. 이는 `throws` 절로 메서드 시그니처를 복잡하게 만들지 않기 때문입니다. 그러나 선택은 항상 특정 오류 처리 전략과 애플리케이션의 예상 동작에 부합해야 합니다.

## Spring에서 커스텀 예외 처리

Spring Boot 애플리케이션에서 `@ControllerAdvice` 어노테이션은 `@ExceptionHandler`와 결합하여 전체 애플리케이션에서 예외를 처리하는 강력하고 중앙 집중식 방법을 제공합니다. 이 접근 방식은 예외 처리 로직을 비즈니스 로직과 분리하여 컨트롤러를 더 깔끔하고 집중적으로 만듭니다.

### 1. `@ControllerAdvice` 어노테이션

`@ControllerAdvice`는 `@Component`의 특수화로, 전체 애플리케이션에서 예외를 처리할 수 있도록 합니다. `@ControllerAdvice`로 어노테이션된 클래스 내에 특정 예외를 처리하는 메서드를 정의할 수 있습니다. 이러한 메서드는 `@ExceptionHandler`로 어노테이션됩니다.

### 2. `@ExceptionHandler` 어노테이션

`@ExceptionHandler` 어노테이션은 특정 메서드에서 처리할 예외 유형을 정의하는 데 사용됩니다. 해당 유형의 예외가 애플리케이션의 어느 곳(컨트롤러 또는 서비스 계층 내)에서든 발생하면, 어노테이션된 메서드가 호출됩니다.

### 전역 예외 핸들러 생성

`ResourceNotFoundException` 및 `InvalidInputException`을 잡고 적절한 HTTP 응답을 반환하는 전역 예외 핸들러를 만들어 보겠습니다.

먼저, API가 사용할 공통 오류 응답 구조를 정의합니다. 이는 API 소비자를 위한 일관성을 보장합니다.

```java
// src/main/java/com/example/error/ErrorResponse.java
package com.example.error;

import java.time.LocalDateTime;

public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;

    public ErrorResponse(int status, String error, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    // 모든 필드에 대한 Getter
    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }
}
```

다음으로, `GlobalExceptionHandler` 클래스를 생성합니다:

```java
// src/main/java/com/example/exception/GlobalExceptionHandler.java
package com.example.exception;

import com.example.error.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
            ResourceNotFoundException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getDescription(false)
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ErrorResponse> handleInvalidInputException(
            InvalidInputException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                ex.getMessage(),
                request.getDescription(false)
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // 다른 처리되지 않은 예외를 위한 일반 예외 핸들러
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage(),
                request.getDescription(false)
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

**설명:**
-   `@ControllerAdvice`: 이 어노테이션은 `GlobalExceptionHandler`를 모든 `@Controller` 및 `@RestController` 클래스 전반에 걸쳐 예외를 처리하는 중앙 지점으로 만듭니다.
-   `@ExceptionHandler(ResourceNotFoundException.class)`: 이 메서드는 `ResourceNotFoundException`을 특별히 처리합니다.
-   `@ExceptionHandler(InvalidInputException.class)`: 이 메서드는 `InvalidInputException`을 특별히 처리합니다.
-   `@ExceptionHandler(Exception.class)`: 이 메서드는 더 정확한 `@ExceptionHandler` 메서드에 의해 특별히 잡히지 않는 다른 모든 예외를 위한 일반 핸들러입니다. 이는 폴백 역할을 합니다.
-   `ResponseEntity<ErrorResponse>`: 각 핸들러 메서드는 커스텀 `ErrorResponse` 객체와 적절한 `HttpStatus`를 포함하는 `ResponseEntity`를 반환합니다.
-   `WebRequest request`: 경로와 같은 요청 세부 정보에 대한 액세스를 제공하여 디버깅 또는 로깅에 유용할 수 있습니다.

이 설정은 `ResourceNotFoundException` 또는 `InvalidInputException`(또는 다른 `Exception`)이 Spring 애플리케이션의 어떤 부분에서든 발생할 때마다 `GlobalExceptionHandler`의 해당 핸들러에 의해 잡히고 클라이언트에 일관된 JSON 오류 응답이 반환되도록 보장합니다.

## 고급 예외 처리 기술

`@ControllerAdvice`와 `@ExceptionHandler`는 커스텀 예외를 처리하는 강력한 방법을 제공하지만, Spring은 오류 응답에 대한 세분화된 제어를 위한 더 고급 기술도 제공합니다. 그러한 기술 중 하나는 `ResponseEntityExceptionHandler`를 확장하는 것입니다.

### `ResponseEntityExceptionHandler` 확장

Spring은 `@ControllerAdvice` 클래스를 위한 편리한 기본 클래스인 `ResponseEntityExceptionHandler`를 제공하며, 모든 표준 Spring MVC 예외에 대한 중앙 집중식 예외 처리를 제공합니다. 이 클래스를 확장함으로써 특정 `handle*` 메서드를 재정의하여 다양한 내장 Spring 예외(예: 유효성 검사 오류에 대한 `MethodArgumentNotValidException`, 404에 대한 `NoHandlerFoundException`)에 대한 응답을 사용자 정의할 수 있습니다.

이 접근 방식을 사용하면 다음을 수행할 수 있습니다:
-   **커스텀 예외 및 표준 예외 모두에 대한 처리 중앙 집중화**: `ResponseEntityExceptionHandler`를 확장하고 `@ExceptionHandler` 메서드를 추가함으로써 모든 예외 유형을 한 곳에서 관리할 수 있습니다.
-   **Spring의 기본 처리 활용**: 일반적인 Spring MVC 예외에 대한 상용구 코드를 작성할 필요가 없습니다. 사용자 정의하려는 메서드를 재정의하기만 하면 됩니다.
-   **일관된 오류 응답 제공**: 커스텀이든 내장이든 모든 유형의 예외에 걸쳐 균일한 오류 응답 구조를 유지합니다.

다음은 유효성 검사 오류 응답을 사용자 정의하기 위해 `ResponseEntityExceptionHandler`를 확장하는 방법의 예입니다:

```java
// src/main/java/com/example/exception/CustomResponseEntityExceptionHandler.java
package com.example.exception;

import com.example.error.ErrorResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {

        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));

        ErrorResponse errorResponse = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Validation Error",
                errorMessage,
                request.getDescription(false)
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // 재정의된 메서드와 함께 커스텀 @ExceptionHandler 메서드를 여기에 추가할 수도 있습니다.
    // 예를 들어, 이전과 같이 ResourceNotFoundException 또는 InvalidInputException을 처리하기 위해
    // @ExceptionHandler(ResourceNotFoundException.class)
    // public ResponseEntity<ErrorResponse> handleResourceNotFoundException(...) { ... }
}
```

**핵심 사항:**
-   **메서드 재정의**: 특정 Spring MVC 예외에 대한 응답을 사용자 정의하려면 `handle*` 메서드를 재정의합니다.
-   **유효성 검사 오류**: `handleMethodArgumentNotValid` 메서드는 `@Valid` 또는 `@Validated` 어노테이션 실패를 처리하는 데 특히 유용하며, 자세한 유효성 검사 오류 메시지를 반환할 수 있습니다.
-   **커스텀 핸들러와의 통합**: 이 접근 방식을 동일한 `@ControllerAdvice` 클래스 내에서 커스텀 예외에 대한 기존 `@ExceptionHandler` 메서드와 결합할 수 있습니다. 이렇게 하면 단일하고 포괄적인 예외 처리 메커니즘이 생성됩니다.

이 고급 기술은 광범위한 예외를 관리하는 더 구조화된 방법을 제공하여 API 소비자를 위한 일관되고 유익한 오류 경험을 보장합니다.

## 실용적인 코드 예제: 커스텀 예외를 사용한 Spring REST API

이제 커스텀 예외의 생성 및 처리를 시연하는 간단한 Spring Boot REST API를 구축하여 모든 것을 실습해 봅시다. 기본적인 "제품" 관리 API를 만들 것입니다.

### 프로젝트 구조

```
src/main/java/com/example/demo
├── DemoApplication.java
├── controller
│   └── ProductController.java
├── model
│   └── Product.java
├── service
│   └── ProductService.java
└── exception
    ├── ResourceNotFoundException.java
    └── InvalidInputException.java
    ├── GlobalExceptionHandler.java
    └── CustomResponseEntityExceptionHandler.java
├── error
    └── ErrorResponse.java
```

*(참고: `ResourceNotFoundException`, `InvalidInputException`, `GlobalExceptionHandler`, `CustomResponseEntityExceptionHandler`, 및 `ErrorResponse` 클래스는 이전 섹션에 정의된 것과 같습니다.)*

### 1. `DemoApplication.java` (메인 클래스)

이것은 표준 Spring Boot 애플리케이션 진입점입니다.

```java
// src/main/java/com/example/demo/DemoApplication.java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### 2. `Product.java` (모델)

제품을 나타내는 간단한 POJO입니다.

```java
// src/main/java/com/example/demo/model/Product.java
package com.example.demo.model;

public class Product {
    private String id;
    private String name;
    private double price;

    public Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
```

### 3. `ProductService.java` (서비스 계층)

이 서비스는 데이터 작업을 시뮬레이션하고 커스텀 예외를 발생시킵니다.

```java
// src/main/java/com/example/demo/service/ProductService.java
package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.exception.InvalidInputException;
import com.example.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {

    private final Map<String, Product> products = new HashMap<>();

    public ProductService() {
        products.put("1", new Product("1", "Laptop", 1200.00));
        products.put("2", new Product("2", "Mouse", 25.00));
        products.put("3", new Product("3", "Keyboard", 75.00));
    }

    public Product getProductById(String id) throws ResourceNotFoundException {
        return Optional.ofNullable(products.get(id))
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
    }

    public Product addProduct(Product product) {
        if (product.getId() == null || product.getId().isEmpty()) {
            throw new InvalidInputException("Product ID cannot be null or empty.");
        }
        if (products.containsKey(product.getId())) {
            throw new InvalidInputException("Product with ID " + product.getId() + " already exists.");
        }
        products.put(product.getId(), product);
        return product;
    }

    public Product updateProduct(String id, Product updatedProduct) throws ResourceNotFoundException {
        if (!products.containsKey(id)) {
            throw new ResourceNotFoundException("Product not found with ID: " + id);
        }
        if (updatedProduct.getPrice() <= 0) {
            throw new InvalidInputException("Product price must be positive.");
        }
        products.put(id, updatedProduct);
        return updatedProduct;
    }

    public void deleteProduct(String id) throws ResourceNotFoundException {
        if (!products.containsKey(id)) {
            throw new ResourceNotFoundException("Product not found with ID: " + id);
        }
        products.remove(id);
    }
}
```

### 4. `ProductController.java` (REST 컨트롤러)

이 컨트롤러는 REST 엔드포인트를 노출하고 `ProductService`를 활용하며, `ProductService`는 커스텀 예외를 발생시킵니다.

```java
// src/main/java/com/example/demo/controller/ProductController.java
package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import com.example.exception.ResourceNotFoundException;
import com.example.exception.InvalidInputException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable String id) throws ResourceNotFoundException {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.addProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) throws ResourceNotFoundException {
        Product updatedProduct = productService.updateProduct(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) throws ResourceNotFoundException {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 테스트 방법 (cURL 사용)

이 Spring Boot 애플리케이션을 실행하고 `curl`을 사용하여 예외 처리를 테스트할 수 있습니다.

1.  **애플리케이션 시작**: `DemoApplication` 클래스를 실행합니다.
2.  **성공적인 GET 테스트**:
    ```bash
    curl http://localhost:8080/api/products/1
    ```
    *예상 출력 (HTTP 200 OK):*
    ```json
    {"id":"1","name":"Laptop","price":1200.0}
    ```

3.  **`ResourceNotFoundException` 테스트 (GET)**:
    ```bash
    curl http://localhost:8080/api/products/99
    ```
    *예상 출력 (HTTP 404 NOT FOUND - `GlobalExceptionHandler`에 의해 처리됨):*
    ```json
    {
      "timestamp": "...",
      "status": 404,
      "error": "Not Found",
      "message": "Product not found with ID: 99",
      "path": "/api/products/99"
    }
    ```

4.  **`InvalidInputException` 테스트 (POST - 중복 ID)**:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"id":"1", "name":"Tablet", "price":500.0}' http://localhost:8080/api/products
    ```
    *예상 출력 (HTTP 400 BAD REQUEST - `GlobalExceptionHandler`에 의해 처리됨):*
    ```json
    {
      "timestamp": "...",
      "status": 400,
      "error": "Bad Request",
      "message": "Product with ID 1 already exists.",
      "path": "/api/products"
    }
    ```

5.  **`InvalidInputException` 테스트 (PUT - 유효하지 않은 가격)**:
    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"id":"2", "name":"Mouse", "price":-10.0}' http://localhost:8080/api/products/2
    ```
    *예상 출력 (HTTP 400 BAD REQUEST - `GlobalExceptionHandler`에 의해 처리됨):*
    ```json
    {
      "timestamp": "...",
      "status": 400,
      "error": "Bad Request",
      "message": "Product price must be positive.",
      "path": "/api/products/2"
    }
    ```

이 예제는 커스텀 예외가 서비스 계층에서 발생한 후 중앙 집중식 `@ControllerAdvice` 클래스에 의해 정상적으로 처리되어 API 소비자에게 일관되고 유익한 오류 응답을 제공하는 방법을 보여줍니다.

## 커스텀 예외를 위한 모범 사례

커스텀 예외를 효과적으로 구현하려면 애플리케이션이 견고하고 유지 관리하기 쉬우며 디버깅하기 쉽도록 특정 모범 사례를 준수해야 합니다.

### 1. 명명 규칙

-   **설명적인 이름**: 문제점을 명확하게 나타내는 이름을 선택합니다. 예를 들어, `DataProblemException`보다 `UserNotFoundException`이 더 좋습니다.
-   **`Exception` 접미사**: 항상 커스텀 예외 클래스 이름의 끝에 `Exception`을 붙입니다(예: `ProductNotFoundException`, `InsufficientStockException`). 이는 표준 Java 규칙입니다.
-   **구체성 vs. 일반성**: 구체성을 목표로 합니다. 오류를 더 정확하게 설명할 수 있다면 새 예외를 만듭니다. 실제 원인을 숨기는 너무 광범위한 예외는 피합니다.

### 2. 체크 예외와 언체크 예외 중 선택 (재검토)

-   **복구 가능한 오류에 대한 체크 예외**: 호출자가 오류로부터 합리적으로 복구할 수 있을 때(예: 파일을 찾을 수 없거나 네트워크 문제) 체크 예외(`extends Exception`)를 사용합니다. 컴파일러가 처리를 강제하므로 중요한 외부 상호 작용에 유용할 수 있습니다.
-   **프로그래밍 오류/비즈니스 로직 위반에 대한 언체크 예외**: 다음 경우에 언체크 예외(`extends RuntimeException`)를 사용합니다:
    -   **프로그래밍 버그**: `NullPointerException`, `IllegalArgumentException` 등이 예입니다. 유효하지 않은 상태 또는 예상치 못한 조건에 대한 커스텀 예외는 종종 여기에 속합니다.
    -   **비즈니스 로직 위반**: 비즈니스 규칙이 위반될 때(예: "재고 부족", "사용자 이미 존재") Spring REST API에서는 언체크 예외가 종종 선호됩니다. 이들은 메서드 시그니처를 `throws` 절로 복잡하게 만들지 않으며, `@ControllerAdvice`를 사용하여 적절한 HTTP 상태 코드를 반환하도록 중앙에서 처리할 수 있습니다.

### 3. 의미 있는 오류 메시지 및 컨텍스트 제공

-   **명확한 메시지**: 예외 메시지가 명확하고 간결하며 *무엇이* 잘못되었는지 설명하는지 확인합니다.
-   **관련 데이터 포함**: 가능하면 오류에 대한 컨텍스트를 제공하는 데이터를 포함합니다. 예를 들어, `ProductNotFoundException`은 찾을 수 없었던 제품 ID를 포함해야 합니다. 이는 디버깅에 도움이 되며 API 소비자가 문제를 더 잘 이해할 수 있도록 합니다.
-   **로깅**: 예외를 잡거나 처리하는 지점에서 충분한 세부 정보(스택 트레이스 포함)와 함께 로깅합니다. 로깅 프레임워크(예: SLF4J/Logback)를 사용하고 적절한 수준(예: 치명적인 실패의 경우 `ERROR`, 복구 가능한 문제의 경우 `WARN`)으로 로깅합니다.

### 4. 중앙 집중식 예외 처리

-   **`@ControllerAdvice` 사용**: 시연된 바와 같이, `@ControllerAdvice`는 Spring에서 예외 처리를 중앙 집중화하는 데 중요합니다. 이는 비즈니스 로직을 깔끔하게 유지하고 API 전반에 걸쳐 일관된 오류 응답을 보장합니다.
-   **HTTP 상태 코드에 매핑**: 커스텀 예외를 적절한 HTTP 상태 코드(예: 400 Bad Request, 404 Not Found, 409 Conflict, 500 Internal Server Error)에 매핑합니다.
-   **표준화된 오류 응답**: 타임스탬프, 상태, 오류 유형 및 설명 메시지를 포함하는 일관된 오류 응답 형식(예: JSON)을 반환합니다. 이는 API를 예측 가능하게 만들고 클라이언트가 사용하기 쉽게 만듭니다.

### 5. 예외를 잡고 삼키지 않기

-   예외를 잡고 아무것도 하지 마십시오. 예외를 잡으면 정상적으로 처리하거나, 로깅하거나, 다시 던져야 합니다(가능하면 더 구체적인 커스텀 예외로 래핑하여).

### 6. 내부 세부 정보 노출 금지

-   컨텍스트를 제공하는 것이 좋지만, 오류 응답에서 클라이언트에 민감한 내부 세부 정보(예: 데이터베이스 테이블 이름, 내부 서버 경로, 프로덕션의 전체 스택 트레이스)를 직접 노출하는 것은 피하십시오. 이러한 세부 정보는 디버깅을 위해 내부적으로 로깅하십시오.

이러한 모범 사례를 따르면 Spring Boot 애플리케이션에서 견고하고 사용자 친화적인 오류 처리 메커니즘을 생성하여 개발자 경험과 API 소비자 만족도를 모두 향상시킬 수 있습니다.

## 결론

커스텀 예외는 Spring Boot 애플리케이션에서 명확하고 유지 관리하기 쉬우며 견고한 오류 처리 메커니즘을 생성하는 강력한 도구입니다. 비즈니스 로직 및 애플리케이션별 오류에 대한 특정 예외 유형을 설계함으로써 다음을 수행할 수 있습니다:

-   **코드 가독성 및 명확성 향상**: 코드의 의도를 명확하게 하고 오류를 더 이해하기 쉽게 만듭니다.
-   **세분화된 오류 처리 활성화**: 다양한 오류 시나리오에 대한 정확한 응답을 구현합니다.
-   **일관된 API 응답 보장**: `@ControllerAdvice` 및 `@ExceptionHandler`를 사용하여 API 소비자에게 예측 가능하고 유익한 오류 메시지를 제공합니다.
-   **비즈니스 로직 분리**: 오류 처리를 핵심 비즈니스 로직과 분리하여 더 깔끔하고 모듈화된 코드를 만듭니다.

체크 예외 또는 언체크 예외를 선택하든 관계없이, 핵심은 오류의 복구 가능성과 애플리케이션의 전반적인 오류 처리 전략에 맞춰 선택하는 것입니다. 커스텀 예외를 Spring의 강력한 `@ControllerAdvice` 및 `ResponseEntityExceptionHandler`와 결합함으로써 기능적일 뿐만 아니라 예외적으로 사용자 친화적이고 탄력적인 Spring REST API를 구축할 수 있습니다.

