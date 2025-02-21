---
 title: switching hub
 categories:
     - network
---

### overview
> operates at Layer 2(Data Link Layer) of OSI,<br>
> uses Mac addresses to forward data to the correct destination<br>
> creates separate collision domains for each port<br>
> provides full-duplex comunication<br>
> supports multiple simultaneous connections<br>

switching hub == 네트워킹 디바이스<br>
mac 주소를 이용해 데이터를 올바른목적지까지 포워딩하기위한<br>
Data Link 계층에서 동작하는 네트워킹 디바이스<br>

### key charateristics
1. **packet switching**<br>
패킷 스위칭을 통해 데이터를 의도된 수신자에게만 전달<br>
2. **no NAT**<br>
네트워크변환 기능 없음<br>
3. **No IP address assignment(DHCP)**<br>
IP 할당기능 없음<br>
4. **acts as a bridge between devices**<br>
디바이스들간 다리역할<br>
5. **improves network efficiency compared to traditional hubs**<br>
전통적 허브보단 네트워크 효율성 증대<br>



### when?
<!-- - The device stops functioning as a router -->
<!-- - Loses its NAT capabilities -->
<!-- - Becomes a simple Layer 2 forwarding device -->
<!-- - Requires another router in the network for internet access -->
- 네트워크에 다른 라우터가 필요할 때


### how does it work
1. **Packet Forwarding**:<br>
<!-- When a device connected to the switching hub sends data to another device on the same network, -->
<!-- the switching hub receives the data packet. -->
<!-- The switching hub then examines the destination address in the packet header to determine which port to forward the packet to. -->
특정 디바이스가 같은 네트워크에있는 다른 디바이스에 데이터를 보낼 때<br>
스위칭허브에 연결되는데, 데이터 패킷을 받은 허브는 패킷내에 헤더내에 있는 목적지를 확인해 패킷을 전달하기위한 포트를 결정<br>

2. **MAC Address Table**:<br>
스위칭허브는 MAC 주소 테이블이 존재<br>
디바이스가 연결되어있는 Mac 주소들이 매핑되어있음<br>
해당 테이블은 데이터를 효율적으로 포워딩하기 위한 용도로 사용됨 (with correct destination device without broadcasting)<br>

3. **Port-Based Communication**:<br>
스위칭허브는 디바이스간 데이터를 주고받기 위한 다이렉트 소통 경로를 탐색하고<br>
패킷은 오직 포트를 통해 대상장치가 연결된 포트로만 패킷을 전송<br>
네트워크 혼잡을 줄이는데 도움이되고, 전통적인 허브보다 향상된 네트워크 성능을 가짐<br>

4. **Automatic Learning**:<br>
MAC 주소 테이블을 동적으로 업데이트<br>
특정 디바이스에서 허브측으로 데이터 전송이이뤄질때<br>
요청받은 허브는 데이터를 받을 때 해당 디바이스의 MAC주소, 포트를 상기<br>
<!-- The switching hub establishes a direct communication path between the source and destination devices by forwarding data -->
<!-- packets only to the port where the destination device is connected. -->
<!-- This helps reduce network congestion and improves network performance compared to a traditional hub -->
<!-- that broadcasts data packets to all devices. -->



<!-- 4. **Full-Duplex Communication**: -->
<!-- Switching hubs support full-duplex communication, allowing devices to send and receive data simultaneously.  -->
<!-- This enables faster data transfer speeds and improves network efficiency. -->

<!-- 4. **Automatic Learning**: -->
<!-- MAC 주소 테이블을 동적으로 업데이트 -->
<!-- 특정 디바이스에서 허브측으로 데이터 전송이이뤄질때 -->
<!-- 요청받은 허브는 데이터를 받을 때 해당 디바이스의 MAC주소, 포트를 상기 -->








