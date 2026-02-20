---
title: JVM 메모리 지도 5분 정리 (Heap Stack Metaspace)
categories:
  - cs
  - jvm
published: false
---

### overview
---

JVM 메모리 헷갈리는 이유는 이름이 많아서임.
근데 실무에서 자주 보는 건 3개면 끝.

- Heap
- Stack
- Metaspace

### 1) Heap (객체 창고)
---

new로 만든 객체는 거의 여기 들어감.

예시:
- User, List, Map, DTO

특징:
- GC가 청소함
- 객체 많이 만들면 GC 부담 증가

한 줄:
- Heap = 객체 본체 저장소

### 2) Stack (작업대)
---

메서드 실행할 때 생기는 지역변수/참조가 저장됨.
메서드 끝나면 프레임 같이 사라짐.

예시:
- `User user` 같은 참조 변수
- 메서드 파라미터

한 줄:
- Stack = 실행 중 임시 작업 공간

### 3) Metaspace (클래스 정보 보관소)
---

클래스 메타데이터(클래스 구조, 메서드 정보 등) 저장.
JDK8부터 PermGen 대신 Metaspace 사용.

한 줄:
- Metaspace = 클래스 설명서 저장소

### 실무에서 자주 터지는 포인트
---

1. Heap 과부하
- 객체 과생성/캐시 누수
- 증상: GC 자주 돌고 p99 튐

2. Stack 문제
- 재귀 깊거나 스레드 과다
- 증상: StackOverflowError, 메모리 압박

3. Metaspace 문제
- 클래스 로딩 누적(리플렉션/프록시 과다)
- 증상: Metaspace OOM

### 그림 없이 한 번에 외우기
---

- Heap: 객체
- Stack: 실행
- Metaspace: 클래스

이 3개만 정확히 구분하면
GC 글 읽을 때 70%는 바로 이해됨.

### 요약
---

JVM 메모리 지도는 복잡해 보여도 핵심은 단순함.

- 객체는 Heap
- 실행 컨텍스트는 Stack
- 클래스 정보는 Metaspace

실무에선 어디가 차오르는지 먼저 보고,
그다음 GC/코드/설정 원인으로 내려가면 됨.
