---
 title: "@Valid, @Validate 차이"
 categories:
     - spring
published: false
---

<!-- TODO:  -->


### Overview
> In this quick tutorial, we’ll focus on the differences between the @Valid and @Validated annotations in Spring.
> Validating users’ input is a common functionality in most of our applications. In the Java Ecosystem, we specifically use the Java Standard Bean Validation API to support this, which is well integrated with Spring from version 4.0 onward. The @Valid and @Validated annotations stem from this Standard Bean API.
> In the next sections, we’ll explore them in greater detail.


> In Spring, @Valid and @Validated are annotations used to trigger validation, 
> but they are part of different validation frameworks and serve slightly different purposes

둘다 정합성을 체크하는 트리거지만, 목적성이 다소 상이함


### @Valid
태생 == javax.validation(자바표준)
객체에 대해 정합성을 체크하기위한 용도
메소드 안에있는 파라미터 혹은 필드 객체에 대해 정합성을 체크하기 위한 용도
Spring MVC controller 혹은 Service layer에서 request body 혹은 form data를 검증하는데 사용됨


### @Validated
태생 == org.springframework.validation.annotation(Spring)
스프링에서 제공하는 애노테이션으로 조금 더 고급스러운 기능들을 제공
@Valid 애노테이션과의 차이점으로는 "validation groups" 을 지원
즉, 저장된 그룹을 기반으로 다양한 환경에서 conetxt에서 bean 검증 가능
다양한 context라 함은 @Controller, @Service, @Repository 계층에서 사용됨을 의미

### Diffrences
- Validtaion Groups 여부
- Validtaion Groups 여부
Spring 기반 환경에서는 @Validated 애노테이션이 더 많이 사용됨

@Validated allows you to specify validation groups, while @Valid does not.


### Example

ChatGPT
In Spring, @Valid and @Validated are annotations used to trigger validation, but they are part of different validation frameworks and serve slightly different purposes:

1. @Valid (Javax Validation)
Package: javax.validation
Usage: This annotation is used to trigger validation on an object in a method parameter or field. It works with the Java Bean Validation API (JSR 303/JSR 380).
Context: It's commonly used in Spring MVC controllers to validate request bodies or form data, or in service layers to ensure data integrity.
Limitations: It only performs validation on the bean itself and does not allow for grouping constraints.
Example:
java
Copy code
@PostMapping("/submit")
public ResponseEntity<?> submit(@Valid @RequestBody User user) {
    // user will be validated according to constraints defined in the User class
    return ResponseEntity.ok("Valid User");
}
2. @Validated (Spring Framework)
Package: org.springframework.validation.annotation
Usage: This annotation is specific to Spring and is used to trigger validation with more advanced features compared to @Valid. It allows for validation groups, which means you can validate a bean in different contexts based on the groups specified.
Context: Typically used in Spring's @Controller, @Service, or @Repository layers for advanced validation. It can also be used in combination with @Valid for specific scenarios, but offers more flexibility in defining and using validation groups.
Example:
java
Copy code
@PostMapping("/submit")
public ResponseEntity<?> submit(@Validated(User.class) @RequestBody User user) {
    // User will be validated based on the validation group User
    return ResponseEntity.ok("Valid User");
}
Key Differences:
Validation Groups: @Validated allows you to specify validation groups, while @Valid does not.
Package: @Valid is part of the Java Bean Validation API (javax.validation), while @Validated is specific to Spring (org.springframework.validation.annotation).
Context: @Validated is more commonly used in Spring-based environments where you may need to define different validation contexts or groups.
In most cases, if you're just doing basic validation, @Valid will suffice. Use @Validated when you need advanced features like validation groups.


### References
[!https://www.baeldung.com/spring-valid-vs-validated](https://www.baeldung.com/spring-valid-vs-validated)
