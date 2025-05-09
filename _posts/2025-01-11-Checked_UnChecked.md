---
 title: Checked, UnChecked Exception
 categories:
     - java
---


### Checked Exception (Exception)
---

> These are exceptions that are checked at compile-time by the Java compiler. <br>
> The programmer is required to handle these exceptions explicitly, 
> either by using a try-catch block or by declaring them in the method signature with the throws keyword.

컴파일러에 의해 컴파일시점에 확인되며, 프로그램 내에서 예외처리를 필요로함

#### usecase 

애플리케이션이 사용자로부터 파일경로를 입력받아 파일을 읽는데 사용자가 잘못된 경로를 입력하거나, 파일이 존재하지 않을 수 있음 이런 경우, 외부 환경에 따라 예외가 발생되기 때문에 Checked Exception으로 처리하는것이 적절


- IOException
- SQLException
- FileNotFoundException

### UnChecked Exception (RuntimeException)<br>
---

> These are exHandling these exceptions is optional. The programmer may or may not catch them.
> Handling these exceptions is optional. The programmer may or may not catch them.

컴파일시점이 아닌, 런타임시점에 확인가능한 예외이며, 예외처리는 선택사항<br>
<!-- 예외처리는 필수가 아닌 선택사항<br> -->
<!-- 예시)<br> -->


#### usecase 

아래 예시 상황과 같은 **프로그래밍상의 논리 오류** or **검증 누락** 의 경우 UnChecked Exception으로 처리하는것이 적절<br>
어떤 함수가 사용자로부터 숫자를 받아 나누기를 수행하는데, 사용자가 0을 입력하는경우 0으로 나누려는 시도가 발생


- NullPointerException
- ArrayIndexOutOfBoundsException
- ArithmeticException

### summary
| 구분 | Checked Exception | UnChecked Exception|
| --------------- | --------------- | --------------- |
| 검출시점 | 컴파일 | 런타임 |
| 처리강제여부  | Y | N |
| 예시 | IOException, SQLException | NPE, IllegalArgumentException |




