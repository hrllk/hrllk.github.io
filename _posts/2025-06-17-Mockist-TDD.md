---
title: Mockist TDD
categories:
   - java
 published: false
---

### Overview
---

Mockist TDD를 진행하며 Goal과 추구하는바가 무엇인지에 대한 내용을 기술

<!-- Test-Driven Development (TDD) is a software development process that relies on the repetition of a very short development cycle: first, the developer writes an automated test case that defines a new function or an improvement to an existing function, then produces the minimum amount of code required to pass that test, and finally refactors the new code to acceptable standards. -->
<!---->
<!-- Within the realm of TDD, two primary schools of thought have emerged: Classicist TDD and Mockist TDD. While both aim to improve code quality and design through testing, they differ significantly in their approach to test isolation and the use of test doubles. This post will delve into the nuances of Mockist TDD, contrasting it with Classicist TDD and exploring its advantages, disadvantages, and practical considerations. -->
<!---->




<!-- ### Classicist TDD (Sociable Test) -->
<!-- --- -->
<!---->
<!-- #### What is Classicist TDD? -->
<!---->
<!-- Classicist TDD, often referred to as "Sociable TDD," emphasizes testing the behavior of a system through its public API, allowing tests to interact with real dependencies as much as possible. The core idea is that if a unit of code interacts with other units (its collaborators), then the test for that unit should also interact with those real collaborators. This approach often leads to tests that are more akin to "mini-integration tests." -->
<!---->
<!-- #### Focus: State Verification -->
<!---->
<!-- The primary focus of Classicist TDD is **state verification**. After invoking the System Under Test (SUT), the test examines the state of the SUT itself or its real collaborators to ensure that the desired outcome has been achieved. It's less concerned with *how* the SUT achieved that state (i.e., which methods were called on its dependencies) and more concerned with *what* the final state is. -->
<!---->
<!-- #### Advantages -->
<!---->
<!-- *   **Higher Confidence:** By interacting with real dependencies, Classicist tests provide a higher degree of confidence that the system will work correctly in a production environment. They catch integration issues early. -->
<!-- *   **Refactoring Friendly:** Since Classicist tests don't assert on specific method calls to dependencies, the internal implementation of the SUT (how it collaborates with its dependencies) can be refactored more freely without breaking tests, as long as the external behavior remains the same. -->
<!-- *   **Simpler Tests for Simple Interactions:** For components with straightforward dependencies, Classicist tests can be simpler to write and understand, as there's no need to set up complex mock expectations. -->
<!---->
<!-- #### When to Use Classicist TDD -->
<!---->
<!-- Classicist TDD is generally suitable for: -->
<!---->
<!-- *   **Units with few or simple dependencies:** When the collaborators are lightweight and don't involve external systems (like databases or remote services), using real objects is often straightforward. -->
<!-- *   **When integration issues are a primary concern:** If ensuring that different parts of the system work together seamlessly is critical, Classicist TDD can be very effective. -->
<!-- *   **Behavior verification through observable state changes:** When the outcome of an operation is best verified by observing changes in state rather than specific interactions. -->




### Glossary
---
- **SUT(System Under Test)**: 테스트 대상이며, 클래스단위 혹은 메소드단위가 될 수 있음
- **Collaborators**: 협력 객체를 의미 즉, 다시말해 SUT의 의존성을 의미, SUT가 서비스클래스를 의미한다면, Collaborators는 해당 클래스가 사용하는 의존성을 의미, Dao가 될수도, Compoenent가 될수도 있음




### Mockist TDD (Solitary Test)
---
> Mockist TDD, often referred to as "Solitary TDD," advocates for testing each unit of code in isolation. This means that when testing a System Under Test (SUT), any objects that the SUT collaborates with are replaced by test doubles, specifically *mocks*. These mocks are not just simple stubs that return predefined values; they are configured to expect specific method calls and will fail the test if those calls are not made as expected...

Mockist TDD == TDD 기법의 한종류<br>
Solitary TDD라고도 불림<br>
각 코드의 단위를 격리해 테스트하는것을 지향<br>
SUT 를 대상으로 테스트를 진행할 때 SUT가 의존하는 모든 Collaborators들이 Mocking으로 대체되어 테스트가 진행됨<br>


### Advantages
---


### Disadvantages
---


### When to Use?
---


### Conclusion
---




#### What is Mockist TDD?

Mockist TDD, often referred to as "Solitary TDD," advocates for testing each unit of code in isolation. This means that when testing a System Under Test (SUT), any objects that the SUT collaborates with are replaced by test doubles, specifically *mocks*. These mocks are not just simple stubs that return predefined values; they are configured to expect specific method calls and will fail the test if those calls are not made as expected.

#### Focus: Behavior Verification / Interaction

The primary focus of Mockist TDD is **behavior verification** or **interaction testing**. Instead of checking the final state of the SUT or its collaborators, Mockist tests assert that the SUT interacts with its dependencies in a specific way. It's concerned with *how* the SUT achieves its goal by verifying the sequence and arguments of method calls on its collaborators.

#### SUT (System Under Test) and Collaborators

In the context of Mockist TDD:

*   **SUT (System Under Test):** This is the specific class or unit of code that you are currently writing tests for.
*   **Collaborators:** These are the objects that the SUT depends on to perform its operations. In Mockist TDD, these collaborators are typically replaced by mock objects.

#### Advantages

*   **Design Driven:** Mockist TDD strongly influences the design of your code. By thinking about how to mock dependencies, you are naturally guided towards more modular, loosely coupled, and testable designs (e.g., favoring dependency injection).
*   **High Test Isolation:** Each test focuses solely on the behavior of the SUT, independent of its collaborators' internal logic. This means that a failing test indicates an issue specifically within the SUT, making debugging easier.
*   **Fast Test Execution:** Since tests don't interact with real external systems (like databases, network services, or file systems), they run very quickly, enabling rapid feedback during the development cycle.
*   **Testing Complex Interactions:** It excels at testing complex orchestration logic where the SUT coordinates multiple collaborators. You can precisely verify the interactions without needing to set up complex real-world scenarios.

#### Disadvantages

*   **Fragile Tests (Over-specification):** Mockist tests can be brittle. If the internal implementation of the SUT changes, even if its external behavior remains the same, the tests might break because they are tied to specific method calls on mocks. This can lead to refactoring headaches.
*   **Increased Test Setup Complexity:** Setting up mock expectations can be more verbose and complex than simply providing real objects, especially for classes with many dependencies or intricate interaction patterns.
*   **False Sense of Security:** While unit tests pass, integration issues between the SUT and its *real* collaborators might go undetected until later stages, as the mocks might not perfectly mimic the behavior of real objects.

#### When to Use Mockist TDD

Mockist TDD is generally suitable for:

*   **Units with complex or external dependencies:** When the SUT interacts with databases, external APIs, messaging queues, or other slow/unreliable services, mocks are invaluable for isolating the unit under test.
*   **When designing for testability and loose coupling is a priority:** The practice naturally encourages good design principles.
*   **Verifying complex interaction flows:** When the core logic of the SUT lies in *how* it interacts with its collaborators rather than just the final state.

### 4. Key Differences: Classicist vs. Mockist

The fundamental differences between Classicist and Mockist TDD can be summarized across several key dimensions:

#### State vs. Interaction Verification

*   **Classicist TDD (State Verification):** Focuses on the *outcome* of an operation. After the System Under Test (SUT) performs its action, the test inspects the state of the SUT itself or its real collaborators to ensure that the data or attributes have changed as expected. It's about "what" happened to the system's state.

*   **Mockist TDD (Interaction Verification):** Focuses on the *process* of an operation. The test verifies *how* the SUT interacts with its dependencies by asserting that specific methods were called on mock objects with the expected arguments and in the correct sequence. It's about "how" the SUT achieved its goal through collaborations.

#### Test Isolation

*   **Classicist TDD:** Tests are "sociable," meaning they interact with real dependencies. While this provides higher confidence in integration, it can make tests susceptible to failures in dependent components, even if the SUT's logic is correct. A failing test might indicate an issue in a collaborator, making debugging potentially more complex.

*   **Mockist TDD:** Tests are "solitary," isolating the SUT from its collaborators by replacing them with mocks. This ensures that a failing test pinpoints an issue exclusively within the SUT, simplifying debugging and making tests more robust against changes in dependencies. However, this isolation might hide integration problems until later stages.

#### Design Impact

*   **Classicist TDD:** Tends to encourage designs where objects have fewer dependencies or where dependencies are simple value objects. The focus is on the public API and observable state. It allows for more internal refactoring without breaking tests, as long as the external behavior remains consistent.

*   **Mockist TDD:** Strongly influences the design towards highly modular and loosely coupled architectures. The need to mock dependencies naturally leads to interfaces, dependency injection, and smaller, single-responsibility classes. While this promotes good design, it can also lead to tests that are tightly coupled to the implementation details, making internal refactoring more challenging.

### 5. Practical Considerations

When adopting Mockist TDD, several practical aspects and tools can significantly impact your testing experience:

#### Mocking Frameworks (e.g., STRICT_STUBS mode)

Modern mocking frameworks (like Mockito, EasyMock, or NSubstitute) provide powerful features to create and manage test doubles. A particularly useful feature in some frameworks is a `STRICT_STUBS` mode or similar strictness setting. This mode helps prevent test fragility by detecting and flagging unnecessary stubbing. If you stub a method that is never actually called during the test, `STRICT_STUBS` will raise an error. This encourages cleaner tests by ensuring that your mocks only define behavior that is genuinely required for the SUT's interactions, improving test readability and maintainability.

#### Handling Exceptions (e.g., DAO exceptions)

One common scenario where mocks are invaluable is testing how your SUT handles exceptions thrown by its dependencies. For instance, if your service layer interacts with a Data Access Object (DAO) that might throw a `SQLException` or a custom `DAOException`, you can use mocks to simulate these error conditions. By configuring the mock DAO to throw a specific exception when a certain method is called, you can verify that your service layer correctly catches, handles, and possibly re-throws the exception, ensuring robust error handling throughout your application.

#### Personal Experience with Mockist TDD

In my experience, Mockist TDD can be a double-edged sword. While it undeniably pushes for cleaner, more modular designs and provides lightning-fast unit tests, the initial setup and maintenance can be challenging. Writing test code for the SUT often involves meticulously setting up expectations for every method call on its collaborators. This can feel verbose and, at times, like you're re-implementing the SUT's logic within the test itself. When the actual implementation code changes, even slightly, the tightly coupled tests can break, leading to a refactoring burden. The key is to strike a balance, understanding that while it provides isolated and fast feedback, careful consideration of what to mock and how strictly to define interactions is crucial to avoid overly fragile tests.

### 6. Conclusion
    * Summary of Mockist TDD
    * Choosing the Right Approach





#### Summary of Mockist TDD

Mockist TDD is a powerful approach to Test-Driven Development that prioritizes isolated unit tests and behavior verification. By using mocks to replace collaborators, it encourages the creation of loosely coupled, modular, and testable code. While it offers benefits like faster test execution and clearer bug localization, it also comes with the challenge of potentially fragile tests that are tightly coupled to implementation details.

#### Choosing the Right Approach

Neither Classicist TDD nor Mockist TDD is universally superior; both have their strengths and weaknesses.

*   **Classicist TDD** is often preferred when:
    *   Dependencies are simple and lightweight.
    *   Integration concerns are paramount.
    *   The primary focus is on verifying the final state of the system.

*   **Mockist TDD** shines when:
    *   Units have complex or external dependencies (e.g., databases, external APIs).
    *   Designing for testability and loose coupling is a high priority.
    *   The core logic involves intricate interaction flows between objects.

Ultimately, the choice between Classicist and Mockist TDD (or a hybrid approach) depends on the specific context of your project, the nature of the code you are testing, and the design principles you wish to enforce. A pragmatic approach often involves using Classicist TDD for simpler units and leveraging Mockist TDD for components with complex dependencies or intricate behavioral interactions. The goal remains the same: to produce high-quality, maintainable software through comprehensive and effective testing.








Sociable Test (Classicist)
    Double을 사용하지 않는 테스트, 미니 통합테스트(?)

Solitary Test (Mockist)
    Mock 을사용하여 격리된 테스트를 진행하는것

- XP (Extream Programming)
    - Pair Programming
    - TDD
    - TDD

- SUT: System Under Test 테스트 대상 클래스
Collaborators: SUT가 의존하는 객체


행위검증 
상태검증
- DAO에서 예외를 던져도되는가?

- Mockist 체험기
    SUT에 대한 테스트코드를 작성, Collaborator 들에 대한 aspect 값을 모두 작성해줘야 하는 번거로움
    public 메소드에 대해 테스트ㅋ
    메소드에대한 테스트코드를


    "어떤값을 가지고 특정 메소드를 호출했을때 응답은 어떨것이다" 까지 설정을 진행
    특정 메소드에대한 테스트코드를 작성할거고, Collaborators (SUT가 의존하는 의존성)들 또한 Mocking으로 진행
    특정 메소드에서 Collaborators 들에 대한 메소드들도 호출되는데 이 또한 실제로 수행하는게 아닌 Mocking 처리를 통해
    특정 메소드(DAO 호출) or 컴포넌트 호출시, 호출에대한 Aspect를 설정

    - 단점: 실제 구현 코드가 변경되면 테스트케이스가 깨지게된다는 단점이 존재

    STRICT_STUBS 모드: 가독성, 유지보수성을 높이기위해 불필요 Stubbing감지해 오류발생


    클래식키스트 TDD와의 차이점:
    클래식키스트 TDD: SUT의 상태(State) 변화나 **반환 값(Output)**을 중심으로 테스트합니다. 의존성은 실제 객체나 간단한 스텁/페이크 객체를 사용하며, 테스트는 SUT 호출 후 SUT나 의존성의 상태가 예상대로 변경되었는지, 또는 SUT가 올바른 값을 반환했는지를 검증합니다. (행위(Behavior)의 결과에 초점)
    목키스트 TDD: SUT와 의존성 간의 **상호작용(Interaction)**을 중심으로 테스트합니다. 의존성은 Mock 객체를 사용하며, 테스트는 SUT 호출 후 Mock 객체의 특정 메소드가 예상대로 호출되었는지를 검증합니다. (행위(Behavior)의 과정/협력에 초점)
    목키스트 TDD의 장점:
    설계 주도: 테스트를 작성하기 전에 객체 간의 협력 관계와 역할을 먼저 고민하게 되어 설계에 도움이 됩니다.
    높은 테스트 격리성: SUT는 Mock 객체와만 상호작용하므로, 의존성 객체의 내부 로직 변경에 영향을 받지 않는 고립된 단위 테스트가 됩니다.
    빠른 테스트 실행: 실제 의존성(DB, 네트워크 등)을 사용하지 않고 Mock 객체를 사용하므로 테스트 실행 속도가 빠릅니다.
    복잡한 협력 관계 테스트 용이: 여러 의존성과 복잡하게 상호작용하는 오케스트레이션(Orchestration) 로직을 테스트하기에 적합합니다.


    - 운영배포에서 즉시배포가 필요한가에 대한 논의
        운영에서는 사용자가 불편하게 배포해야되는데 즉시배포가 있다는게 이해가 가질 않음
        해당 내용관련해서 지훈님이 윗분들과 논의해보고 알려주신다고 함
