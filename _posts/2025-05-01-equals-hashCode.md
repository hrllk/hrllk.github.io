---
 title: equals, hashCode, toString
 categories:
    - CS
 published: false
---

<!-- TODO:  -->





### overview

자바에서 모든 클래스는 명시적으로 다른 클래스를 상속받지 않는경우 자동적으로 최상위 클래스인 Object 클래스를 상속받음


### Object

해당 클래스는 기본적으로 equals, hashCode, toString 함수를 제공하고 
이는 객체의 상태를 다루는 데 있어 중요 역할을 함.
모든 클래스는 Object 클래스를 간접적으로 상속받으므로, 해당 클래스에서 정의되어있는 메소드를 모든 객체에서 사용할 수 있음


#### 1. equals
논리적으로 두 객체가 동등한지 비교시 사용 (**참조 비교**)
대부분의 경우, 객체의 참조가 아닌, 두 객체간 가지고있는 값이 같은지를 비교하고싶어하는 경우가 많기 때문에 해당경우에는 재정의가 필요

##### 1-2. 주의사항
Reflexive(x.equals(x) == true), x.equals(y) == true


#### 2. hasCode
객체의 해시코드 값을 반환, 정수로 구성되며
HashMap, HashSet, HashTable과 같은 Hash기반의 Collection에서 객체를 저장하거나, 검색할 때 주로 사용됨

Object 클래스의 기본 hashCode() 구현은 객체의 메모리 주소를 기반으로 해시코드를 생성하는 경우가 많음

만약 equals() 함수를 재정의해 두 객체가 동등하다고 판단되도록 만든경우, 반드시 hashCode() 함수도 함께 재정의 되어야 함
어플리케이션 실행중 객체의 equals를 비교에 사용된 정보가 변경되지 않는한, 객체의 hashCode() 함수를 여러번 호출해도 항상 동일한 정수의 값을 반환하여야 함

equals만  재정의하고, hashCode()를 재정의하지 않는경우, 
논리적으로 동등한 두 객체가 해시기반 컬렉션에서 다른 해시 버킷에 저장될 수 있음
이 경우, contains()나 get()과 같은 함수가 예상대로 동작하지 않는 문제가 발생할 수 있음




### 2. equals() 메서드

`equals()` 메서드는 두 객체가 "논리적으로 동등한지"를 비교할 때 사용됩니다.

*   **기본 동작:** `Object` 클래스의 기본 `equals()` 구현은 `==` 연산자와 동일하게 **참조(Reference) 비교**를 수행합니다. 즉, 두 변수가 메모리 상에서 동일한 객체를 가리키는지 확인합니다.
*   **재정의의 필요성:** 대부분의 경우, 우리는 객체의 참조가 아닌 **객체가 가지고 있는 값(상태)**이 같은지를 비교하고 싶어 합니다. 예를 들어, 두 `Person` 객체가 이름과 나이가 같다면 논리적으로 동일하다고 판단하고 싶을 수 있습니다. 이럴 때 `equals()` 메서드를 재정의하여 객체의 필드 값을 비교하도록 만들어야 합니다.
*   **재정의 시 주의사항 (equals 계약):** `equals()` 메서드를 재정의할 때는 다음과 같은 계약(Contract)을 반드시 지켜야 합니다.
    *   **반사성 (Reflexive):** `null`이 아닌 모든 참조 값 `x`에 대해 `x.equals(x)`는 `true`입니다.
    *   **대칭성 (Symmetric):** `null`이 아닌 모든 참조 값 `x`와 `y`에 대해, `x.equals(y)`가 `true`이면 `y.equals(x)`도 `true`입니다.
    *   **추이성 (Transitive):** `null`이 아닌 모든 참조 값 `x`, `y`, `z`에 대해, `x.equals(y)`가 `true`이고 `y.equals(z)`가 `true`이면 `x.equals(z)`도 `true`입니다.
    *   **일관성 (Consistent):** `null`이 아닌 모든 참조 값 `x`와 `y`에 대해, `equals` 비교에 사용된 정보가 변경되지 않는 한, `x.equals(y)`를 여러 번 호출해도 항상 같은 결과를 반환합니다.
    *   **Null 아님 (Non-nullity):** `null`이 아닌 모든 참조 값 `x`에 대해, `x.equals(null)`은 `false`입니다.

```java
// 예시: Person 클래스에서 equals() 재정의
public class Person {
    private String name;
    private int age;

    // 생성자, getter/setter 생략

    @Override
    public boolean equals(Object o) {
        if (this == o) return true; // 1. 반사성 및 동일 객체 참조 확인
        if (o == null || getClass() != o.getClass()) return false; // 5. Null 아님 및 타입 비교
        Person person = (Person) o; // 형변환
        return age == person.age && // 필드 값 비교
               Objects.equals(name, person.name); // 필드 값 비교 (null 안전하게)
    }

    // hashCode()도 함께 재정의해야 함 (아래에서 설명)
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

### 3. hashCode() 메서드

`hashCode()` 메서드는 객체의 해시 코드(Hash Code) 값을 반환합니다. 해시 코드는 정수 값이며, 주로 `HashMap`, `HashSet`, `HashTable`과 같은 해시 기반 컬렉션에서 객체를 저장하거나 검색할 때 사용됩니다.

*   **기본 동작:** `Object` 클래스의 기본 `hashCode()` 구현은 객체의 메모리 주소를 기반으로 해시 코드를 생성하는 경우가 많습니다.
*   **재정의의 필요성:** `equals()` 메서드를 재정의하여 두 객체가 논리적으로 동등하다고 판단되도록 만들었다면, **반드시 `hashCode()` 메서드도 함께 재정의해야 합니다.** 이는 `equals()`와 `hashCode()` 간의 중요한 계약 때문입니다.

*   **hashCode 계약:**
    *   애플리케이션 실행 중에 객체의 `equals` 비교에 사용된 정보가 변경되지 않는 한, 객체의 `hashCode()` 메서드를 여러 번 호출해도 항상 동일한 정수 값을 반환해야 합니다.

    *   `equals(Object o)` 메서드를 사용하여 두 객체가 동등하다고 판단되면, 두 객체의 `hashCode()` 메서드는 반드시 동일한 정수 값을 반환해야 합니다.

    *   `equals(Object o)` 메서드를 사용하여 두 객체가 동등하지 않다고 판단되더라도, 두 객체의 `hashCode()` 메서드가 반드시 서로 다른 정수 값을 반환할 필요는 없습니다. 하지만 해시 테이블의 성능 향상을 위해 서로 다른 객체에 대해 다른 해시 코드를 반환하는 것이 좋습니다.

`equals()`만 재정의하고 `hashCode()`를 재정의하지 않으면, 논리적으로 동등한 두 객체가 해시 기반 컬렉션에서 다른 해시 버킷에 저장될 수 있습니다. 이 경우 `contains()`나 `get()`과 같은 메서드가 예상대로 동작하지 않는 심각한 문제가 발생할 수 있습니다.

```java
// 예시: Person 클래스에서 hashCode() 재정의 (equals()와 함께)
public class Person {
    private String name;
    private int age;

    // 생성자, getter/setter 생략

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age &&
               Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        // Objects.hash()를 사용하면 equals에 사용된 필드를 기반으로 쉽게 해시 코드를 생성할 수 있습니다.
        return Objects.hash(name, age);
    }
}
```

### 4. toString() 메서드

`toString()` 메서드는 객체의 문자열 표현을 반환합니다. 이 문자열은 객체를 사람이 읽기 쉬운 형태로 나타내는 데 사용됩니다.

*   **기본 동작:** `Object` 클래스의 기본 `toString()` 구현은 `클래스이름@객체의해시코드의16진수표현` 형태의 문자열을 반환합니다. (예: `com.example.Person@1b6d3586`)
*   **재정의의 필요성:** 기본 `toString()` 결과는 객체의 상태에 대한 유용한 정보를 거의 제공하지 않습니다. 디버깅, 로깅 또는 객체의 내용을 쉽게 확인하고 싶을 때 `toString()`을 재정의하여 객체의 주요 필드 값을 포함하는 의미 있는 문자열을 반환하도록 만드는 것이 좋습니다.

```java
// 예시: Person 클래스에서 toString() 재정의
public class Person {
    private String name;
    private int age;

    // 생성자, getter/setter 생략

    @Override
    public String toString() {
        return "Person{" +
               "name='" + name + '\'' +
               ", age=" + age +
               '}';
    }
}
```

### 5. 결론

`Object` 클래스의 `equals()`, `hashCode()`, `toString()` 메서드는 자바 객체 지향 프로그래밍에서 매우 기본적인 동시에 중요한 개념입니다.

*   객체의 **논리적 동등성**을 비교해야 할 때는 `equals()`를 재정의해야 합니다.
*   `equals()`를 재정의했다면, 해시 기반 컬렉션의 올바른 동작을 위해 **반드시 `hashCode()`도 함께 재정의**하여 `equals`/`hashCode` 계약을 지켜야 합니다.
*   객체의 상태를 쉽게 확인하고 싶을 때는 `toString()`을 재정의하여 유용한 정보를 제공하도록 만드는 것이 좋습니다.

이 세 가지 메서드를 올바르게 이해하고 활용하는 것은 견고하고 유지보수하기 쉬운 자바 코드를 작성하는 데 필수적입니다.






