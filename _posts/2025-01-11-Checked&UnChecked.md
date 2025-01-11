---
 title: Checked, UnChecked Exception
 categories:
     - java
---


## Checked Exception

### Definition
> These are exceptions that are checked at compile-time by the Java compiler. <br>
> The programmer is required to handle these exceptions explicitly, 
> either by using a try-catch block or by declaring them in the method signature with the throws keyword.

컴파일러에 의해 컴파일시점에 확인되며, 프로그램 내에서 예외처리를 필요로함

예시)
- IOException
- SQLException
- FileNotFoundException

### usecase
> Checked exceptions are typically used for situations where the program can recover, such as when dealing with file handling, database access, or network operations.

프로그램내 어떤프로세스에서 원복이 가능할 때 고려 <br>


## UnChecked Exception <br>



### Definition 
> These are exHandling these exceptions is optional. The programmer may or may not catch them.
> Handling these exceptions is optional. The programmer may or may not catch them.

컴파일시점이 아닌, 런타임시점에 확인가능한 예외<br>
예외처리는 필수가 아닌 선택사항<br>
예시)<br>

- NullPointerException
- ArrayIndexOutOfBoundsException
- ArithmeticException

