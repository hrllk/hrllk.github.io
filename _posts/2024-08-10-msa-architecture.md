---
 title: MSA architecture
 categories: 
     - modernSoftware
---


## MSA Architecture
- Componentization: 구성 요소화
    독립적으로 재 배포할 수 있게 컴포넌트를 독립적으로 분기
    목적은 서비스의 재사용성에 포커스를 맞추고있음
- Product-Based decentralization

### Pros
- Fast CI/CD 
    Monolithic 서비스보다 가벼워 CI/CD가 보다 빠름
- Single Responsibility
    각 서비스(모듈)별 개발이 가능하며 독립적으로 배포가능

### Cons
- Network complexity 
    메세징에 크게 의존되므로 네트워크 관리에대한 cost가 모놀리식보다 높음
- Poor performance
    성능 저하가 발생할 수 있음 사유는 위처럼 각 모듈간 데이터를 주고받기 위한 커뮤니케이션 을 하기 때문에
    해당 행위에 대해 커뮤니케이션 비용이 발생함 이로인해 성능 저하가 발생할 수 있음


### References
[https://medium.com/ryanjang-devnotes/start-your-msa-with-spring-boot-1-understanding-of-msa-93d77ac7273e](https://medium.com/ryanjang-devnotes/start-your-msa-with-spring-boot-1-understanding-of-msa-93d77ac7273e)

