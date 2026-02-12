---
title: Custom Exception
categories:
   - java
toc: true
toc_label: "TOC"
published: false
---

<!-- TODO:  -->

### Overview 
This blog post aims to provide a comprehensive guide on creating and handling custom exceptions in Spring Boot applications. We will cover the necessity of custom exceptions, their implementation, and best practices for managing them effectively within a Spring REST API context. The scope includes:
- Understanding the basics of exceptions in Java.
- Designing and implementing custom checked and unchecked exceptions.
- Centralized exception handling using `@ControllerAdvice` and `@ExceptionHandler`.
- Providing meaningful error responses to API clients.
- Best practices for using custom exceptions.

## Introduction to Exceptions

Exceptions are events that disrupt the normal flow of a program. In Java, exceptions are objects that encapsulate information about an error or an unusual event that has occurred. They provide a structured way to handle errors, separating error-handling code from the normal program logic.

Java's exception hierarchy is rooted in the `Throwable` class, which has two direct subclasses: `Error` and `Exception`.
- **Errors**: Represent serious problems that a reasonable application should not try to catch. Examples include `OutOfMemoryError` or `StackOverflowError`.
- **Exceptions**: Represent conditions that an application might want to catch. These are further divided into:
    - **Checked Exceptions**: Must be declared in a method's `throws` clause if they can be thrown by the method and not handled within it. The compiler enforces this, promoting robust error handling. Examples include `IOException`, `SQLException`.
    - **Unchecked Exceptions (Runtime Exceptions)**: Do not need to be declared or caught. They typically indicate programming errors. Examples include `NullPointerException`, `ArrayIndexOutOfBoundsException`.

### Why Custom Exceptions?

While Java provides a rich set of built-in exceptions, there are several compelling reasons to create custom exceptions, especially in complex applications like those built with Spring:

1.  **Improved Readability and Clarity**: Custom exceptions can convey specific business logic errors or application-specific problems more clearly than generic exceptions. For instance, instead of throwing a generic `IllegalArgumentException` for an invalid user ID, a `UserNotFoundException` or `InvalidUserIdException` is far more descriptive.

2.  **Granular Error Handling**: By creating distinct exception types for different error scenarios, you can implement more precise and targeted error handling mechanisms. This allows different parts of your application or different consumers of your API to react appropriately to specific error conditions.

3.  **Encapsulation of Error Details**: Custom exceptions can encapsulate additional context and data relevant to the error. For example, a `ProductOutOfStockException` could include the product ID and the available stock quantity, providing valuable information for debugging or for returning to the client.

4.  **Decoupling and Maintainability**: Using custom exceptions helps in decoupling your business logic from the underlying technical exceptions. This makes your code cleaner, easier to understand, and more maintainable. Changes in underlying frameworks or libraries are less likely to impact your error handling logic if you're using custom, application-specific exceptions.

5.  **Consistent API Error Responses**: In a REST API, custom exceptions can be mapped to specific HTTP status codes and standardized error response bodies. This ensures a consistent and predictable error reporting mechanism for API consumers, improving the overall user experience and making API integration smoother. For example, a `ResourceNotFoundException` could consistently map to HTTP 404, while an `UnauthorizedAccessException` maps to HTTP 401.

6.  **Domain-Driven Design (DDD)**: In a DDD approach, custom exceptions are a natural fit for representing domain-specific invariants and business rule violations. They make your domain model more expressive and self-validating.

In the following sections, we will delve into how to design, implement, and effectively handle these custom exceptions within a Spring Boot application.

## Creating Custom Exceptions in Java

Creating custom exceptions in Java is straightforward. You simply need to extend an existing exception class. The choice of which class to extend (`Exception` for checked, `RuntimeException` for unchecked) depends on whether you want the compiler to enforce handling of your exception.

### Basic Structure of a Custom Exception

Every custom exception should at least have:
-   A constructor that accepts a `String` message.
-   Optionally, a constructor that accepts a `String` message and a `Throwable` cause.

It's also good practice to include constructors that call the superclass constructors.

Let's look at examples for both checked and unchecked custom exceptions.

### 1. Custom Checked Exception

A checked exception extends `java.lang.Exception`. The compiler will force you to either `try-catch` this exception or declare it in the method signature using `throws`. These are typically used for anticipated problems that a well-written application should handle gracefully, such as file not found errors or invalid input from external sources.

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

**When to use Checked Exceptions:**
-   When clients of your method can reasonably be expected to recover from the exception.
-   For external failures that are beyond the control of the application (e.g., I/O errors, SQL errors).
-   When you want to force the caller to deal with the exception explicitly.

### 2. Custom Unchecked Exception (Runtime Exception)

An unchecked exception extends `java.lang.RuntimeException`. These do not need to be declared in a method's `throws` clause, nor do they need to be caught. They are typically used for programming errors, such as invalid arguments, null pointers, or logical errors that indicate a bug in the code.

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

**When to use Unchecked Exceptions:**
-   For programming errors that indicate a defect in the code (e.g., `NullPointerException`, `IllegalArgumentException`).
-   When clients of your method cannot reasonably be expected to recover from the exception.
-   When the exception is so pervasive that declaring it in every method signature would make the code unreadable.

### Choosing Between Checked and Unchecked Exceptions

The decision to use a checked or unchecked exception often depends on the nature of the error:
-   **Checked exceptions** are for *recoverable* conditions, forcing the caller to handle them.
-   **Unchecked exceptions** are for *unrecoverable* programming errors or situations where explicit handling is not feasible or desirable.

In Spring applications, unchecked exceptions (Runtime Exceptions) are often preferred for business logic errors that result in an HTTP error response (e.g., 4xx client errors) because they avoid cluttering method signatures with `throws` clauses. However, the choice should always align with the specific error handling strategy and the expected behavior of your application.

## Handling Custom Exceptions in Spring

In Spring Boot applications, the `@ControllerAdvice` annotation, combined with `@ExceptionHandler`, provides a powerful and centralized way to handle exceptions across the entire application. This approach separates exception handling logic from the business logic, making your controllers cleaner and more focused.

### 1. The `@ControllerAdvice` Annotation

`@ControllerAdvice` is a specialization of `@Component` that allows you to handle exceptions across the whole application. You can define methods within a class annotated with `@ControllerAdvice` to handle specific exceptions. These methods are annotated with `@ExceptionHandler`.

### 2. The `@ExceptionHandler` Annotation

The `@ExceptionHandler` annotation is used to define the type of exception to be handled by a specific method. When an exception of that type is thrown anywhere in the application (within a controller or service layer), the annotated method will be invoked.

### Creating a Global Exception Handler

Let's create a global exception handler that catches our `ResourceNotFoundException` and `InvalidInputException` and returns appropriate HTTP responses.

First, define a common error response structure that your API will use. This ensures consistency for API consumers.

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

    // Getters for all fields
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

Next, create the `GlobalExceptionHandler` class:

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

    // Generic exception handler for any other unhandled exceptions
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

**Explanation:**
-   `@ControllerAdvice`: This annotation makes `GlobalExceptionHandler` a central point for handling exceptions across all `@Controller` and `@RestController` classes.
-   `@ExceptionHandler(ResourceNotFoundException.class)`: This method specifically handles `ResourceNotFoundException`.
-   `@ExceptionHandler(InvalidInputException.class)`: This method specifically handles `InvalidInputException`.
-   `@ExceptionHandler(Exception.class)`: This is a general handler for any other exceptions that are not specifically caught by more precise `@ExceptionHandler` methods. It acts as a fallback.
-   `ResponseEntity<ErrorResponse>`: Each handler method returns a `ResponseEntity` containing our custom `ErrorResponse` object and the appropriate `HttpStatus`.
-   `WebRequest request`: Provides access to request details like the path, which can be useful for debugging or logging.

This setup ensures that whenever a `ResourceNotFoundException` or `InvalidInputException` (or any other `Exception`) is thrown from any part of your Spring application, it will be caught by the respective handler in `GlobalExceptionHandler`, and a consistent JSON error response will be returned to the client.

## Advanced Exception Handling Techniques

While `@ControllerAdvice` and `@ExceptionHandler` provide a robust way to handle custom exceptions, Spring also offers more advanced techniques for fine-grained control over error responses. One such technique involves extending `ResponseEntityExceptionHandler`.

### Extending `ResponseEntityExceptionHandler`

Spring provides `ResponseEntityExceptionHandler`, a convenient base class for `@ControllerAdvice` classes that provides centralized exception handling for all standard Spring MVC exceptions. By extending this class, you can override specific `handle*` methods to customize the response for various built-in Spring exceptions (e.g., `MethodArgumentNotValidException` for validation errors, `NoHandlerFoundException` for 404s).

This approach allows you to:
-   **Centralize handling for both custom and standard exceptions**: By extending `ResponseEntityExceptionHandler` and adding your `@ExceptionHandler` methods, you can manage all exception types in one place.
-   **Leverage Spring's default handling**: You don't have to write boilerplate code for common Spring MVC exceptions; you just override the methods you want to customize.
-   **Provide consistent error responses**: Maintain a uniform error response structure across all types of exceptions, whether they are custom or built-in.

Here's an example of how you might extend `ResponseEntityExceptionHandler` to customize validation error responses:

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

    // You can also add your custom @ExceptionHandler methods here alongside the overridden ones
    // For example, to handle ResourceNotFoundException or InvalidInputException as before
    // @ExceptionHandler(ResourceNotFoundException.class)
    // public ResponseEntity<ErrorResponse> handleResourceNotFoundException(...) { ... }
}
```

**Key Points:**
-   **Method Overriding**: Override `handle*` methods to customize responses for specific Spring MVC exceptions.
-   **Validation Errors**: The `handleMethodArgumentNotValid` method is particularly useful for handling `@Valid` or `@Validated` annotation failures, allowing you to return detailed validation error messages.
-   **Integration with Custom Handlers**: You can combine this approach with your existing `@ExceptionHandler` methods for custom exceptions within the same `@ControllerAdvice` class. This creates a single, comprehensive exception handling mechanism.

This advanced technique provides a more structured way to manage a wide range of exceptions, ensuring a consistent and informative error experience for API consumers.

## Practical Code Example: Spring REST API with Custom Exceptions

Let's put everything into practice by building a simple Spring Boot REST API that demonstrates the creation and handling of our custom exceptions. We'll create a basic "Product" management API.

### Project Structure

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

*(Note: The `ResourceNotFoundException`, `InvalidInputException`, `GlobalExceptionHandler`, `CustomResponseEntityExceptionHandler`, and `ErrorResponse` classes are as defined in the previous sections.)*

### 1. `DemoApplication.java` (Main Class)

This is the standard Spring Boot application entry point.

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

### 2. `Product.java` (Model)

A simple POJO representing a product.

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

### 3. `ProductService.java` (Service Layer)

This service will simulate data operations and throw our custom exceptions.

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

### 4. `ProductController.java` (REST Controller)

This controller exposes REST endpoints and leverages the `ProductService`, which in turn throws our custom exceptions.

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

### How to Test (Using cURL)

You can run this Spring Boot application and test the exception handling using `curl`.

1.  **Start the application**: Run the `DemoApplication` class.
2.  **Test successful GET**:
    ```bash
    curl http://localhost:8080/api/products/1
    ```
    *Expected Output (HTTP 200 OK):*
    ```json
    {"id":"1","name":"Laptop","price":1200.0}
    ```

3.  **Test `ResourceNotFoundException` (GET)**:
    ```bash
    curl http://localhost:8080/api/products/99
    ```
    *Expected Output (HTTP 404 NOT FOUND - handled by `GlobalExceptionHandler`):*
    ```json
    {
      "timestamp": "...",
      "status": 404,
      "error": "Not Found",
      "message": "Product not found with ID: 99",
      "path": "/api/products/99"
    }
    ```

4.  **Test `InvalidInputException` (POST - duplicate ID)**:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"id":"1", "name":"Tablet", "price":500.0}' http://localhost:8080/api/products
    ```
    *Expected Output (HTTP 400 BAD REQUEST - handled by `GlobalExceptionHandler`):*
    ```json
    {
      "timestamp": "...",
      "status": 400,
      "error": "Bad Request",
      "message": "Product with ID 1 already exists.",
      "path": "/api/products"
    }
    ```

5.  **Test `InvalidInputException` (PUT - invalid price)**:
    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"id":"2", "name":"Mouse", "price":-10.0}' http://localhost:8080/api/products/2
    ```
    *Expected Output (HTTP 400 BAD REQUEST - handled by `GlobalExceptionHandler`):*
    ```json
    {
      "timestamp": "...",
      "status": 400,
      "error": "Bad Request",
      "message": "Product price must be positive.",
      "path": "/api/products/2"
    }
    ```

This example demonstrates how custom exceptions are thrown from the service layer and then gracefully handled by our centralized `@ControllerAdvice` classes, providing consistent and informative error responses to API consumers.

## Best Practices for Custom Exceptions

Implementing custom exceptions effectively requires adherence to certain best practices to ensure your application remains robust, maintainable, and easy to debug.

### 1. Naming Conventions

-   **Descriptive Names**: Choose names that clearly indicate the problem. For example, `UserNotFoundException` is better than `DataProblemException`.
-   **Suffix with `Exception`**: Always end your custom exception class names with `Exception` (e.g., `ProductNotFoundException`, `InsufficientStockException`). This is a standard Java convention.
-   **Specific vs. General**: Aim for specificity. If an error can be more precisely described, create a new exception. Avoid overly broad exceptions that hide the actual cause.

### 2. Choosing Between Checked and Unchecked Exceptions (Revisited)

-   **Checked for Recoverable Errors**: Use checked exceptions (`extends Exception`) when the caller can reasonably recover from the error (e.g., file not found, network issues). The compiler forces handling, which can be beneficial for critical external interactions.
-   **Unchecked for Programming Errors/Business Logic Violations**: Use unchecked exceptions (`extends RuntimeException`) for:
    -   **Programming bugs**: `NullPointerException`, `IllegalArgumentException` are examples. Your custom exceptions for invalid states or unexpected conditions often fall here.
    -   **Business logic violations**: When a business rule is violated (e.g., "product out of stock," "user already exists"), unchecked exceptions are often preferred in Spring REST APIs. They avoid `throws` clauses cluttering method signatures and can be centrally handled with `@ControllerAdvice` to return appropriate HTTP status codes.

### 3. Provide Meaningful Error Messages and Context

-   **Clear Messages**: Ensure exception messages are clear, concise, and explain *what* went wrong.
-   **Include Relevant Data**: Whenever possible, include data that provides context to the error. For example, `ProductNotFoundException` should include the product ID that was not found. This aids in debugging and allows API consumers to understand the issue better.
-   **Logging**: Log exceptions with sufficient detail (including stack traces) at the point where they are caught or handled. Use a logging framework (like SLF4J/Logback) and log at appropriate levels (e.g., `ERROR` for critical failures, `WARN` for recoverable issues).

### 4. Centralized Exception Handling

-   **Use `@ControllerAdvice`**: As demonstrated, `@ControllerAdvice` is crucial for centralizing exception handling in Spring. This keeps your business logic clean and ensures consistent error responses across your API.
-   **Map to HTTP Status Codes**: Map your custom exceptions to appropriate HTTP status codes (e.g., 400 Bad Request, 404 Not Found, 409 Conflict, 500 Internal Server Error).
-   **Standardized Error Responses**: Return a consistent error response format (e.g., JSON) that includes a timestamp, status, error type, and a descriptive message. This makes your API predictable and easier for clients to consume.

### 5. Avoid Catching and Swallowing Exceptions

-   Never catch an exception and do nothing with it. If you catch an exception, you should either handle it gracefully, log it, or rethrow it (possibly wrapped in a more specific custom exception).

### 6. Do Not Expose Internal Details

-   While providing context is good, avoid exposing sensitive internal details (e.g., database table names, internal server paths, full stack traces in production) directly to the client in your error responses. Log these details internally for debugging.

By following these best practices, you can create a robust and user-friendly error handling mechanism in your Spring Boot applications, improving both developer experience and API consumer satisfaction.

## Conclusion

Custom exceptions are a powerful tool in Spring Boot applications for creating clear, maintainable, and robust error handling mechanisms. By designing specific exception types for business logic and application-specific errors, you can:

-   **Improve Code Readability and Clarity**: Make your code's intent clearer and errors more understandable.
-   **Enable Granular Error Handling**: Implement precise responses for different error scenarios.
-   **Ensure Consistent API Responses**: Provide predictable and informative error messages to API consumers using `@ControllerAdvice` and `@ExceptionHandler`.
-   **Decouple Business Logic**: Separate error handling from core business logic, leading to cleaner and more modular code.

Whether you choose checked or unchecked exceptions, the key is to align your choice with the recoverability of the error and the overall error handling strategy of your application. By combining custom exceptions with Spring's powerful `@ControllerAdvice` and `ResponseEntityExceptionHandler`, you can build Spring REST APIs that are not only functional but also exceptionally user-friendly and resilient.
