---
 title: WHAT IS DHCP 
 categories: 
    - network 
---

### What is DHCP 
DHCP == Dynamic Host Configuration Protocol 
프로토콜 동적으로 호스트를 설정하기 위한 

> It is a network protocol used to automatically assign and manage IP addresses and other configuration information to devices on a TCP/IP network. DHCP simplifies the process of network administration by dynamically allocating IP addresses to devices when they connect to the network.

네트워크 프로토콜 이라함  <br>
자동으로 assign하고 관리함<br>
각 단말에서 네트워크에 연결될 때 자동으로 assign하고 관리한다. <br>


### 동작방식
> DHCP enables devices to automatically obtain IP addresses without manual configuration. When a device joins a network, it can request an IP address from a DHCP server, which then assigns an available IP address dynamically.

수동설정 없이, 자동으로 단말에 IP주소를 할당한다. <br>
단말이 network에 연결될 때, DHCP 서버로부터 요청이 가능해진다. <br>

### 할당방식
> DHCP assigns IP addresses to devices on a lease basis. The lease specifies the duration for which the assigned IP address is valid. Devices typically renew their leases before expiration, and if they are no longer connected to the network, the IP address can be reclaimed by the DHCP server.

임대 기반으로 IP주소를 할당한다.<br>
보통 단말들은 갱신한다 임대된 주소가 만료되기전에 <br>
그리고 장기간 네트워크에 연결되지 않는경우 DHCP서버에 회수된다 <br>



### 부가설정들 
> In addition to IP addresses, DHCP can provide other configuration information to devices, including subnet mask, default gateway, DNS (Domain Name System) servers, and more. This simplifies network configuration for devices and ensures consistency across the network.

아래에있는 다른 설정들도 제공하며, 기기들에 대한 네트워크 설정을 간하게 만들어주고, 일관성을 제공한다.<br>
(subnet mask, 기본 gw, DNS,  ...)<br>


> DHCP allows for centralized management of IP address allocation. Network administrators can configure and manage DHCP servers to control the range of available IP addresses, lease durations, and other parameters.

IP주소 할당설정을 중앙 집중관리를 허용하고 <br>
network 관리자는 아래에있는 여러 설정들에대해 설정할 수 있다. <br>
(DHCP 서버의 IP대역, 임대기간, ...)<br>


### 구성 및 역할 
#### Server 
단말이나, 소프트웨어를 관리한다 "사용 가능한 IP 주소들" 혹은 "클라이언트가 네트워크에 연결되기위해 동적으로의 해주기 위함"

#### Client
단말이 요청하거나 IP주소를 얻거나, DHCP 서버로부터 설정들을 가져오기위해존재 


### 한줄요약
IP 자동할당 및 관리 프로토콜
