---
 title: hexagonal architecture
 categories: 
    - softwareArchitecturePattern
---


## table of Contents

- [what is hexagonal architecture](#what-is-hexagonal-architecture)
- [principle](#principle)
  * [application](#application)
  * [domain](#domain)
  * [infrastructure](#infrastructure)
- [Benefit](#benefit)
  * [1. focus](#1-focus)
  * [2. easier to understand](#2-easier-to-understand)
- [References](#references)



### what is hexagonal architecture
hexagonal architecture === 소프트웨어 설계 방식 <br>
도메인 로직 중심 소프트웨어 설계 방식<br>

### principle 
역할 분기(외부와 내부) <br>
application(outside), domain(inside), infrastucture(outside) <br>


#### application
외부와 접점되는 구간<br>
접점되는 컴포넌트들을 포함 (user interfaces, restful controller ...)<br>
+ 도메인 로직을 okestration 함(호출)<br>


#### domain
애플리케이션의 핵심(core(biz)) 
해당 계층은 application계층과 infrastructure계층으로부터 독립적이여야 함
인터페이스를 포함해야 한다 (외부 파트와 커뮤니케이션 하기 위함)


#### infrastructure
애플리케이션 실행에 필요로하는 모든것들이 존재<br>
DB configuration, spring configuration, Repository ...<br>


### Benefit
#### 1. focus 
계층 분기로 인한 각 layer별로 다른 부분에 영향을 주지 않으면서 집중할 수 있음
#### 2. easier to understand 
각 계층별 역할에대해 이해 쉬움
가장큰 이점은 도메인 로직의 분기 from 모든것으로부터

domain엔 비즈니스로직만 들어감


### References
https://www.baeldung.com/hexagonal-architecture-ddd-spring
