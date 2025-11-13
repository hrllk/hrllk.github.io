---
 title: Thread Local
 categories:
     - java
 published: false
---

<!-- TODO:  -->



### Overview
> ThreadLocal construct from the java.lang package. This gives us the ability to store data individually for the current thread and simply wrap it within a special type of object.

Thread Local == Java 표준 클래스 <br>
Thread에 개별적으로 데이터를 적재할 수 있으며 특별한 객체타입으로 Wrapping 가능 (Generic) <br>
데이터를 주입하거나 가져오거나, 삭제할 수 있는 간단한 methods 를 제공 (get, set, remove ...) <br>
``` java
public class ThreadLocal<T> {
    ...
}
```

``` java
threadLocalValue.set(1);
Integer result = threadLocalValue.get();
```
> As a result as above, when we call a get() method on the threadLocalValue, we’ll get an Integer value for the requesting thread:
> The TheadLocal construct allows us to store data that will be accessible only by a specific thread.

ThreadLocal 구조는 데이터 적재를 허용하고, 특정 Thread 에 대해서만 접근이 가능함

### References
- https://www.baeldung.com/java-threadlocal

> In Java, a ThreadLocal is a class that provides thread-local variables.  <br>
> Each thread that accesses a ThreadLocal variable gets its own copy, and changes made to the variable in one thread do not affect other threads. 
> This is particularly useful in multi-threaded applications where you need to store data that is specific to a thread (like user sessions, database connections, or logging information).

<b>ThreadLocal == thread-local 변수를 제공하는 자바 클래스</b><br>
각 Thread는 TreadLocal의 변수에 접근하고 변경해도 다른 Thread에는 영향을 주지 않는 특징<br>
어떤 Thread에 특정 데이터를 저장해놓아야하는 Multi Thread 애플리케이션 환경에서 유용<br>

---

### Advantage
- Thread Safety: <br>
    각 Thread 는 자신만의 변수를 가지고있기 때문에 동기화를 맞춰줄 필요 없으며 본질적으로 thread safe 함


### usage




