---
title: serialVersionUID란?
categories: 
    - modernSoftware 
---

### serialVersionUID란?

> In Java, the term "serialVersionUID" refers to a special field used in the serialization and deserialization process of objects. It is a unique identifier for a serialized class and is used to ensure that the deserialization process is performed properly.

serialVersionUID == unique value 이다. <br>
to 직렬화, 역직렬화에 상용되는..<br>

### 특징
static field이다. <br>
unique하다. <br>



### serializeation 
<b>객체를 데이터화 할 때 사용됨. </b><br><br>
특정 객체를 데이터화 하기위해 객체를 직렬화하는데 이 때 클래스가 가지고있는 serialVersionUID를 <br>
앞 부분에 추가하여 직렬화를 진행하고, 해당 스트림을 데이터화 함<br>



### deserialization
<b>데이터를 객체화할 때 사용</b><br><br>
위에서 변환된 데이터를 객체화 하기 전에 클래스가 가지고 있는 serialVersionUID와 <br>
직렬화된 데이터가 가지고있는 serialVersionUID값을 비교하는 절차를 가짐<br>
이 때 서로간의 값이 다르면 InvalidClassException이 발생<br>


### default calcuates 
> calculates a default value based on the class's structure 

개발자가 직접 지정하지않는경우, <br>
클래스 구조에 계산되어 컴파일러가 해당값을 지정해준다.<br>
언제? > 컴파일시점에 <br>
