---
 title: try with resources
 categories:
    - java
---


### overview
---
자바에서 파일, DB 연결, 네트워크 소켓 등.. 자원을 다룰 때 항상 자원을 열면 필히 닫아줘야 함, 그렇지 않으면 메모리 누수, 파일잠김 혹은 연결 누수등의 문제가 발생할 수 있음 이를 보다 간결한 문법인 **try-with-resources**를 통해 간소화해 사용이 가능함



### try-with-resources?
---
자원을 사용할 때 간결하고 모던한 문법<br>
java 1.7에 도입된 문법으로, `AutoCloseable` 인터페이스를 구현한 객체를 try 블록에 선언만 해도, **자동으로 close()**를 호출해 줌




### example
---

#### ASIS (close on finally)
``` java
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("data.txt"))
    System.out.println(reader.readLine());
    
} catch (IOException e) {
    e.printStackTrace();
} finally {

    try {
        if (reader != null) {
            reader.close();
        }

    } catch (IOException e){
        e.printStackTrace;
    }
}
```

#### TOBE
``` java
try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))){
    System.out.println(reader.readLine());
} catch (IOException e){
    e.printStackTrace();
}
```
### supported object types
try-with-resources에 사용될 수 있는 객체는 AutoCloseable 또는 그 하위 인터페이스인 Closeable을 구현 해야 함

| Class | Interface |
| -------------- | --------------- |
| BufferedReader, FileInputStream, Scanner ... | Closeable |
| Connection, PreparedStatement, ResultSet | AutoCloseable |


### exmple2 (여러 자원 동시 선언)

여러 개의 자원에 대해 동시선언이 가능하며, 닫히는 순서는 선언의 역순
``` java
try (
    BufferedReader br = new BufferedReader(new FileReader("input.txt"));
    BufferedWriter bw = new BufferedWriter(new FileWriter("output.txt"))
) {
    String line;
    while ((line = br.readLine()) != null) {
        bw.write(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```
