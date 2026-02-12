---
 title: Prometheus는 왜 Pull 모델을 쓰는가
 categories:
    - cs
    - observability
published: false
---

### overview
---

Prometheus는 기본적으로 Pull 모델이다.
즉, Prometheus가 직접 타겟을 주기적으로 긁어온다.


### Push vs Pull
---

핵심 질문은 이거다.
- 왜 Push가 아니라 Pull인가?

- Pull: 수집 서버가 가져감
- Push: 애플리케이션이 보냄

### Prometheus가 Pull을 선택한 이유
---

1. **타겟 상태 확인이 쉬움**
- `up` 지표로 수집 성공/실패 바로 확인 가능

2. **중앙에서 수집 주기/정책 통제 가능**
- scrape interval, timeout, relabeling을 한 곳에서 관리

3. **서비스 디스커버리와 궁합이 좋음**
- 컨테이너/오토스케일 환경에서 타겟 자동 발견이 편함

4. **신뢰성 있는 수집 경로 확보**
- 애플리케이션 코드에 전송 로직 부담이 줄어듦

### 체크리스트
---

- 장기 실행 서비스인가? → Pull 우선
- 단기/일회성 잡인가? → Pushgateway 고려
- `up` 모니터링이 잡혀있는가?
- scrape timeout이 서비스 응답시간보다 짧지 않은가?

### 요약
---

Prometheus의 기본은 Pull이다.
- 상태확인 쉬움
- 중앙관리 쉬움
- 자동발견과 잘 맞음

단, 배치/단기 작업은 Pushgateway로 보완 가능.
