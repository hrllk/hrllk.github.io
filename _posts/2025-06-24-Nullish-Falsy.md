---
title: Nullish, Falsy
categories:
   - Javascript
---

### Overview
---
> In JavaScript, understanding the concepts of "nullish" and "falsy" values is crucial for writing robust and predictable code. While often used interchangeably by beginners, they represent distinct categories of values that behave differently in logical operations and conditional statements. This post will clarify these concepts, highlight their differences, and demonstrate their practical application with code examples, including the Nullish Coalescing Operator (??) and the Logical OR operator (||).

Javascript진영에서 nullish, falsy에 대한 콘셉 이해 및 연산자를 통해 예제 설명하기위한 포스트


### Nullish ( ?? )
---
Nullish == null or undefined를 의미(선언은 되었지만 값이 아직 할당되지 않은 상태)


### Falsy ( || )
---
Falsy == false로 간주되는 의미
#### Falsy 종류 (7가지)
- `false`
- `0`
- `-0`
- `0n`
- `""`
- `null`
- `undefined`
- `NaN`


### Differences
---

결국 Falsy가 Nullish를 포함하지만, 모든 Falsy값들은 Nullish에 포함되지 않음<br>
범용적으로 사용해도될까? 라고 생각할 수 있지만 그러면 아니될것..<br>

#### Example
``` javascript
let userSettings = {
    darkmode: false,
}

const defaultSettings = {
    darkmode: true,
}

const currentDarkMode = userSettings.darkmode || defaultSettings.darkMode;  // currentDarkMode true
const currentDarkMode = userSettings.darkMode ?? defaultSettings.darkMode;  // currentDarkMode false
```
<!-- let defaultActiveStatus = true; -->
<!---->
<!-- let inputStatus = false; -->
<!-- const activeStatus = inputStatus ?? defaultActiveStatus; -->
<!-- console.log('activeStatus: ', activeStatus) // Output: true -->
<!---->
<!-- let inputStatus = false; -->
<!-- const activeStatus = inputStatus || defaultActiveStatus; -->
<!-- console.log('activeStatus: ', activeStatus) // Output: false  -->


### Conclutions
---
대개 기본값을 정의하기위해 Nullish, Falsy를 사용하는데 Falsy에 대한 동작 방식 때문에,
입력값이 `false`나 `0`이 유효한값임에도 불과하고 예상치못한 문제가 야기될 수 있음, 이를 회피하기 위해 적재적소에 맞게 사용하는것이 중요
