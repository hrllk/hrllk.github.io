---
 title: 시계열 데이터와 샘플링 주기 기본
 categories:
    - cs
    - observability
 published: true
---

### overview
---

Prometheus/Grafana 처음 잡을 때 제일 먼저 헷갈리는 게 시계열 데이터임.
핵심은 시계열과 샘플링 주기이다
- 시계열(time series): 시간축을 가진 메트릭
- 샘플링 주기(scrape interval): 몇 초마다 수집할지

### 시계열 데이터란?
---

시간순으로 찍은 데이터이며,
같은 유형의 메트릭이 반복적으로 샘플링되는 것을 의미한다.

예시)
- `http_server_requests_seconds_count{job="api",uri="/login"} 124` (18:10:00)
- `http_server_requests_seconds_count{job="api",uri="/login"} 131` (18:10:15)
- `http_server_requests_seconds_count{job="api",uri="/login"} 140` (18:10:30)

로그가 시간순으로 찍히듯,
메트릭도 시간축 기준으로 누적/변화가 기록된다.

구성 요소:
- metric name: 어떤 지표인지
- labels: 어느 서비스/엔드포인트인지
- timestamp: 언제 수집됐는지
- value: 그 시점의 값

### scrape interval(샘플링 주기)
---

Prometheus는 정해진 주기마다 endpoint를 긁어오며
그 주기를 `scrape interval` 이라 한다.

예시:
- scrape interval = 15s
- 1분에 4개 샘플 생김

### 주기 설정 트레이드오프
---

주기 설정은 정확도와 비용의 균형 문제다.

- 짧은 주기(예: 5s~10s)
  - 장점: 급격한 스파이크 감지 유리
  - 단점: 저장량 증가, Prometheus/타겟 부하 증가

- 긴 주기(예: 30s~60s)
  - 장점: 시스템 부하와 비용 절감
  - 단점: 짧은 장애 구간이나 순간 튐을 놓칠 수 있음

처음엔 15s 또는 30s로 시작하고,
서비스 특성(트래픽/중요도/비용)에 맞게 조정하는 게 안전하다.

### 잘못된 오해
---

1. 점 하나 보고 장애 단정
- 시계열은 구간/추세로 봐야 함

2. 그래프가 매끈하면 정상이라고 판단
- 샘플링이 너무 거칠면 스파이크가 뭉개져 보일 수 있음

3. 평균만 보고 괜찮다 판단
- p95/p99 같이 봐야 실제 체감 지연 보임

### Prometheus에서 바로 확인할 것
---

초보자는 아래 3개만 먼저 보면 된다.

```promql
up
```
- 의미: 수집 성공 여부
- 해석: `1` = 정상, `0` = 실패
- 예시: `up{job="jgitkins-server"}=0` 이면 해당 타겟 스크랩 실패 상태
- 먼저 보는 이유: 수집이 안 되면 다른 그래프도 신뢰 불가

```promql
scrape_duration_seconds
```
- 의미: Prometheus가 타겟을 긁는 데 걸린 시간
- 해석: 값이 갑자기 커지면 타겟 응답 지연/네트워크 문제 의심
- 예시: 평소 0.05s인데 0.8s로 튀면 수집 지연 신호
- 체크 포인트: 주기적으로 상승하는지, 특정 타겟만 높은지

```promql
scrape_samples_scraped
```
- 의미: 한 번 수집할 때 가져온 샘플 개수
- 해석: 평소보다 급감하면 exporter 이상/설정 변경 가능성
- 예시: 1200 → 150으로 급감하면 메트릭 노출 누락 가능성
- 체크 포인트: 배포 직후 값이 갑자기 변했는지

한 줄 팁:
- `up` 확인 → `scrape_duration_seconds` 확인 → `scrape_samples_scraped` 확인
순서로 보면 대부분의 "수집 문제"를 빠르게 좁힐 수 있다.

### 체크리스트
---

- scrape interval이 서비스 성격에 맞는지
- 타겟 up이 안정적으로 1인지
- 스파이크가 실제인지(주기/step 영향인지)
- 대시보드 단위(ms/s) 표기가 맞는지

### 요약
---

관측성 입문은 복잡한 쿼리보다 먼저,
**시계열 + 샘플링 주기 감각**부터 잡는 게 정답.
