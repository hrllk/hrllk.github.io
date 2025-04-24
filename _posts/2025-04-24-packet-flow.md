---
 title: Packet Flow In TCP/IP
 categories:
    - CS
    - network
---


### overview
---

TCP/IP 프로토콜에서 패킷 흐름을 설명<br>
패킷 == 데이터를 주고받는 기본 단위 in 네트워크 통신<br>


### TCP/IP 프로토콜 스택 구조
---
1. **Application**:
    - HTTP, FTP, DNS.. 사용자 애플리케이션이 동작하는 계층
2. **Transport**:
    - TCP, UDP가 동작하며, 포트 개념을 통해 송수신 제어
3. **Internet**:
    - IP주소를 기반으로 라우팅 결정
4. **Link**:
    - 실제 NIC와 연결하며, Ethernet을 통해 물리적으로 전송



### 웹사이트 접속에 대한 예시 흐름
---

1. HTTP 요청 생성(in Application)
``` bash
 ~ ❯ curl alzar.example.org:8083 -v                                                                                                                            at 23:49:24
   Trying 180.80.52.183:8083...
 Connected to alzar.example.org (180.80.52.183) port 8083 (#0)
> GET / HTTP/1.1
> Host: alzar.duckdns.org:8083
```
2. 전송계층: TCP 연결 수립
    - 3-Way Handshake 진행

``` mermaid
sequenceDiagram
    participant Client
    participant Server

    Client->>Server: SYN (seq=x)
    Server->>Client: SYN-ACK (seq=y, ack=x+1)
    Client->>Server: ACK (ack=y+1)
```

3. 인터넷계층: IP패킷생성
    - TCP 세그먼트를 IP 패킷에 캡슐화
    - IP주소를 목적지로 설정

4. 링크계층: 프레임 생성 및 전송
    - IP패킷을 Ethernet 프레임으로 캡슐화
    - 목적지 MAC 주소 설정



