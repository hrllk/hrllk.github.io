---
title: PUT vs PATCH 
categories:
    - network 
---
## 무엇이다를까??? 

#### PUT
> "리소스의 '전체'를 업데이트할때 사용" 

#### PATCH
> "리소스의 '일부'를 업데이트할때 사용"


#### PUT 예시:
> 1. 원본데이터: 
 ```json
{
  "name": "홍길동",
  "age":  18
}
```
> 2. 희망하는데이터: (나이를 20으로 변경하길 희망..)
 ```json
{
  "name": "홍길동",
  "age":  20
}
```
> 3. 요청데이터: (age만 20요청하면되는것이아닌, 이름도 지정해줘야함.) 
 ```json
{
  "name": "홍길동",
  "age":  20
}
```



#### PATCH 예시:
> 1. 원본데이터:
```json
{
  "name": "홍길동",
  "age":  18
}
```
2. 희망하는데이터: (나이를 20으로 변경하길 원함..)
```json
{
  "name": "홍길동",
  "age":  20
}
```
3. 요청데이터: (age만 20으로 요청)
```json
{
  "age":  20
}
```
