---
title: what is ctr (in containerd)
categories: 
    - modernSoftware 
---



### ctr이란?
ctr == [containerd](https://hrllk.github.io/modernsoftware/containerd/) 의 daemon(바이너리) <br>
containerd == 쿠버네티스에서 컨테이너를 런타임하기위한 모듈 <br>

### 기능 

#### 1. 이미지관리(컨테이너의)
pull, push, list, delete 가능 (using ctr)

#### 2. 컨테이너 관리
create, starting, stopping, delete 가능 

#### 3. 메타데이터 검사 
메타데이터 확인가능 > e.g) 컨테이너의 상태, 실행환경, 리소스사용량 

#### 4. 컨테이너에서 명령어실행가능
실행중인 컨테이너에서 명령어 실행이가능하다. 
