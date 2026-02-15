---
categories:
  - cs
  - observability
published: true
title: Prometheus Quick Start for Spring Boot
---

## Prometheus Quick Start for Spring Boot

### Prerequisites

- **Actuator**
  - 애플리케이션 상태(health, metrics)를 외부에 노출하는 기능
  - 한 줄 요약: *노출*
- **Prometheus**
  - 노출된 메트릭을 주기적으로 수집(scrape)하는 모니터링 시스템
  - 한 줄 요약: *수집*

---

## 1. 의존성 추가

```groovy
dependencies {
  implementation 'org.springframework.boot:spring-boot-starter-actuator'
  runtimeOnly 'io.micrometer:micrometer-registry-prometheus'
}
```

의존성만 추가했다고 끝이 아니며,  
자동 설정되는 부분과 직접 설정해야 할 부분을 구분해야함.

---

## 2. 의존성 추가 시 자동으로 생기는 변화

### 1) 메트릭 수집 기반 생성

- JVM
- HTTP 요청
- 스레드풀
- GC

등의 메트릭이 수집 가능 상태가 됨.

### 2) `/actuator/prometheus` 엔드포인트 생성 가능

Prometheus 포맷으로 메트릭을 노출하는 엔드포인트가 활성화됨.

---

## 3. 필수 설정

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus
  endpoint:
    prometheus:
      access: unrestricted
```

### 주의사항

- `exposure.include`에 `prometheus`가 없으면 엔드포인트가 노출되지 않음.
- 운영 환경에서는 접근 제어(네트워크/인증) 설계 필요.

---

## 4. 동작 확인 방법

### 1) 애플리케이션 실행

### 2) curl 확인

```bash
curl http://localhost:8080/actuator/prometheus
```

### 3) 아래 항목이 보이면 정상

- `# HELP`
- `# TYPE`
- `jvm_`
- `http_server_requests_seconds`

---

## 5. Prometheus 서버에서 확인

Spring Boot가 정상이면, 이제 Prometheus 서버가 수집 중인지 확인함.

### 확인할 메트릭 3가지

```promql
up{job="my-spring-app"}
```

- 1이면 수집 성공

```promql
scrape_duration_seconds{job="my-spring-app"}
```

- 수집 지연 확인

```promql
scrape_samples_scraped{job="my-spring-app"}
```

- 수집된 메트릭 수 확인함

---

## 6. 자주 겪는 문제

### 404 에러

- 원인: actuator exposure 설정 누락

### Target DOWN

- 원인: URL/포트 불일치
- 컨테이너 네트워크 문제
- 방화벽

### 값이 이상함

- 단위(ms ↔ s) 해석 실수
- 라벨 조건 과다/누락

---

## 7. 체크리스트

- 의존성 추가 완료
- actuator exposure 설정 확인
- `/actuator/prometheus` 응답 확인
- Prometheus target `up=1`
- Grafana p95/p99 패널 정상 연결

---

## 한 줄 정리

Spring Boot Prometheus 연동은

**의존성 추가 → Actuator 노출 → Prometheus Scrape 설정 → Target 확인**
