---
title: jvm old generation
categories:
  - cs
  - jvm
  - garbage-collection
published: true
---

### Overview
---
지난 포스트에서 JVM Heap의 Young Generation(링크처리)을 다뤘고, 이번엔 **Old Generation(고인물 영역)**에 대해 다룸. 
Young 영역에서 살아남은 객체들이 어디로 가서 어떻게 관리되는지 이해하는 것이 효율적인 GC 튜닝의 핵심이다.

### Old 영역은 무엇인가?
---
Heap은 크게 Young과 Old 영역으로 나뉘고, 그 중 Old 영역은 **Young 영역에서 여러 번의 Minor GC에도 살아남은, 즉 '오래 살아남을 객체'들이 모이는 곳**입니다. 이곳의 객체들은 비교적 생명 주기가 길기 때문에 Young 영역처럼 자주 GC할 필요가 없다.

*   **Promotion(승격):** Young 영역의 Survivor 공간을 여러 번 오가며 정해진 나이(Age Limit)에 도달한 객체들은 Old 영역으로 **Promotion**됩니다. 이는 "오래 살 놈들은 따로 모아서 관리하겠다"는 GC의 전략.

### Major GC (Full GC) 동작
---
Old 영역은 Young 영역보다 GC 주기가 훨씬 깁니다. 하지만 이곳도 언젠가는 꽉 차게 된다.
Old 영역이 가득 차거나 or Young 영역에서 Promotion할 공간이 부족할 경우, **Major GC** (또는 **Full GC**)가 발생합니다.

*   **Stop-The-World:** Major GC는 Young 영역의 Minor GC와는 비교할 수 없을 정도로 큰 성능 저하를 일으킵니다. 대부분의 Major GC는 GC를 수행하는 동안 **애플리케이션 스레드를 모두 정지(Stop-The-World)**시켜버린다. 이 시간 동안 애플리케이션은 아무런 작업도 처리하지 못하게 되며, 이는 사용자가 느끼는 서비스 지연의 주된 원인이 된다.

*   **복잡한 알고리즘:** Old 영역은 크기가 크고, 살아있는 객체도 많기 때문에 Minor GC보다 훨씬 복잡한 알고리즘(예: `Mark-Sweep-Compact`)을 사용하고, 이는 GC 작업에 더 많은 시간과 CPU 자원을 소모하게 한다.

### 실무에서의 이슈 (Old 영역 편)
---
Old 영역 관리에 실패하면 서버는 더욱 심각한 상황에 직면한다.

*   **잦은 Major GC:** Old 영역이 너무 작게 설정되거나, Young 영역에서 너무 많은 객체가 빠르게 Promotion되면, Old 영역이 자주 가득 차게 되고 Major GC가 빈번하게 발생합니다. 이는 애플리케이션이 멈추는 시간이 길어져 서비스 가용성에 치명적인 영향을 줍니다.
*   **메모리 누수(Memory Leak):** 의도치 않게 객체가 계속 Old 영역에 남아있어 메모리 사용량이 계속 증가하는 현상입니다. 결국 `OutOfMemoryError`로 이어지며 애플리케이션이 비정종료된다.

### 3줄 요약
---
*   다시 요약하면 **Old 영역**은 Young 영역에서 오래 살아남은 객체들의 보금자리다.
*   여기서 발생하는 **Major GC**는 애플리케이션을 멈추게 할 수 있어 성능에 치명적.
*   Old 영역의 크기, Promotion 밸런스, 메모리 누수 관리는 **안정적인 서비스 운영의 핵심**.
