---
 title: what is subnetmask?
 categories: 
    - CS
    - network 
---

### subnet mask
subnetmask == 네트워킹에 사용되기위해 이뤄진 32bit로 이뤄진 숫자<br>

> A subnet mask is a 32-bit number used in networking to determine the range of IP addresses within a network. It is used to divide the IP address into two parts: the network address and the host address.

용도는.. 네트워킹에 IP주소의 범위를 설정하는데 사용됨 <br>
두개의 파트로 나뉨 <br>
1. 네트워크 주소 
2. 호스트 주소 


### 용도 및 부가설명 
> Subnet masks are used to route data between networks and to allocate IP addresses to devices on a network. They allow for the creation of smaller subnetworks within a larger network, which can improve network efficiency and scalability.

라우팅에 사용 <br>
데이터를 네트워크 <-> 단말간 라우팅하는데 사용 <br>
큰 네트워크속에서 작은 서브네트워크를 만들어 효율성과 확장성을 향상시킴 <br>


32자리중 앞 24자리는 네트워크 IP주소를 의미, <br>
그 이후 나머지 8자리는 호스트의 주소를 의미함. <br>

예로 아래서브넷은 256개의 호스트를 가짐. <br>

> 255.255.255.0

### 요약

subnetmask == 네트워킹을하는 크리티컬한 컴포넌트<br>
바운더리를 정하고 단말에 IP를 할당하는 역할을 함 <br>

