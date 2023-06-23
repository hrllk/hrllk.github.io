---
title: what is layer 7 load balancing?
categories: 
    - network 
---


### what is layer 7 load balancing?
> Layer 7 load balancing, also known as application-level load balancing, operates at the highest layer of the OSI model, the application layer. It involves distributing network traffic based on specific application-level information, such as HTTP headers, URLs, cookies, or application-specific data.

layer 7 load balancing == 애플리케이션계층에서 사용된는 로드밸런싱<br>
7 == OSI7계층k을 의미 <br>
하위계층의 로드밸런싱 "보다" 똑똑한 라우팅을 제공<br>


### 추가설명 
HTTP 헤더, URL, 쿠키 또는 애플리케이션 특정 데이터와 같은 애플리케이션 수준의 정보를 기반으로 네트워크 트래픽을 분산


## 장점 
#### 1. Session affinity 
세션 지속성!! <br>
레이어 7 로드밸런서는 동일한 클라이언트로부터 후속 요청이 들어왔을때 <br>
해당 트래픽을 동일한 백엔드서버로 라우팅되도록 세션 지속성을 유지 <br>

#### 2. Load balancing across multiple protocols
여러 프로토콜에 대해서도 로드밸런싱 가능 <br>
HTTP 뿐만아니라 SMTP, FTP, DNS등 다양한 프로토콜에대한 트래픽도 분산 가능<br>


### 느낀점.
AWS의 ALB도, 오픈소스인 [haproxy](https://hrllk.github.io/network/haproxy)도, Layer 7 Load Balancing을 사용한다고함. 

