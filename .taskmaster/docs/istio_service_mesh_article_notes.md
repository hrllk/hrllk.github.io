
# Istio Service Mesh 내부 통신 정리 및 아티클 초안

## 0. 대화 기반 개요 (Discussion Summary)

본 문서는 MSA 환경에서 내부 서비스 통신 보안을 어떻게 처리하는지에 대한 논의를 정리한 것이다.
대화의 주요 주제는 다음과 같다.
요구사항: 

한국은행 Trombone https 환경 설정 완료되었습니다.
현재 기본 툴체인 등록 및 초기 설정 작업까지 완료된 상태입니다.

# 참고사항
[개발지원도구 관리] 의 URL 은 http 로 유지해주시기 바랍니다.
https 로 설정할 경우 istio-sidecar 를 거치지 않고 Pod to Pod 로 다이렉트 통신을 하게 되어 mTLS 통신이 불가능합니다.

# 구성안
Client > HAproxy = 443 포트만 허용하여 포탈 접속 시 https 접속되도록 구성
trb-oss <-> trb-app 
 - istio-injection=enabled 설정 적용 후 isitio-sidecar 설정
 - istio virtual service 에 "-mesh" 설정 적용하여 trb-app > trb-oss 로 도메인 요청 시 쿠버네티스 서비스 도메인으로 내부 질의되도록 구성 (내부 질의 과정에서 mTLS 방식을 적용하여 보안 통신을 진행합니다. mTLS 설정 유무는 Kiali 통해서 동작되는 것을 확인했습니다.)
 
 VM으로 기동중인 jenkins slave1, 2는 클러스터 내부에 존재하지 않아서 동일하게 HAProxy의 443을 사용해야하는 상황입니다. 위 구성안은 협의가 전부 완료된 상태인가요?
 
jenkins-slave 노드에는 OS 에 rootCA 인증서를 심어두었습니다.
curl -v https://jenkins.bok.trombone.okestro.cloud 로 요청해보시면 인증서 이슈 없이 동작합니다.deploy vm 에도 적용되어 있습니다.적용된 인증서는 자체적으로 발급한 사설인증서입니다.
 
 
- 내부 서비스 간 통신도 SSL/TLS가 필요한 상황
- 애플리케이션에서 TLS를 직접 설정하는 방식의 한계
- Service Mesh(Istio)를 통한 mTLS 적용 방식
- Sidecar Proxy 구조
- Envoy Proxy의 역할
- 인증서 관리 방식 (Istiod CA)
- 실제 시스템 사례 (TPS / pipeline-api / OSS 구조)

핵심 결론은 다음과 같다.

서비스 간 TLS 처리를 **애플리케이션이 아닌 Sidecar Proxy가 담당하도록 하여**
애플리케이션 수정 없이 내부 mTLS 통신을 구현한다.

---

# 1. MSA 환경에서 내부 통신 보안 문제

MSA 환경에서는 서비스 간 통신이 매우 빈번하게 발생한다.
이때 내부 통신 역시 보안 요구사항이 생긴다.

기존 방식의 문제점

- 서비스마다 TLS 설정 필요
- 인증서 배포 및 갱신 어려움
- 서비스 증가 시 관리 복잡도 증가

이 문제를 해결하기 위해 **Service Mesh** 구조가 등장하였다.

---

# 2. Service Mesh와 Sidecar 아키텍처

Service Mesh에서는 애플리케이션이 직접 네트워크 보안을 처리하지 않는다.
대신 **Sidecar Proxy**가 네트워크 트래픽을 담당한다.

Pod 구조

```
Pod
 ├ Application Container
 └ Sidecar Proxy Container
```

Sidecar 특징

- 애플리케이션 옆에서 동작하는 프록시
- 네트워크 트래픽 처리
- 비즈니스 로직 없음
- 서비스 간 통신 보안 담당

즉

Sidecar = 네트워크 프록시  
Application = 비즈니스 로직

---

# 3. Sidecar는 Service가 아니라 Pod에 붙는다

Sidecar는 Kubernetes Service(SVC)에 붙는 개념이 아니다.

Sidecar는 **Pod 내부 컨테이너**이다.

```
Pod
 ├ Application Container
 └ Envoy Proxy Container
```

즉

Pod = 실행 단위  
Container = App + Proxy

---

# 4. Envoy Proxy란 무엇인가

Envoy는 Istio에서 사용하는 **L7 Proxy 서버**이다.

Sidecar Proxy의 실제 구현체가 Envoy이다.

```
Sidecar Proxy = Envoy
```

Envoy 주요 기능

- mTLS 처리
- 트래픽 라우팅
- 로드밸런싱
- 인증 처리
- observability

---

# 5. Service Mesh 내부 통신 흐름

서비스 간 통신은 애플리케이션 간 직접 통신이 아니다.

실제 흐름

```
Service1 App
      ↓
Service1 Sidecar (Envoy)
      ↓  mTLS
Service2 Sidecar (Envoy)
      ↓
Service2 App
```

즉

App → Sidecar → Sidecar → App

---

# 6. mTLS 동작 방식

일반 TLS

```
Client → Server
```

서버만 인증한다.

mTLS

```
Service A ↔ Service B
```

서로 인증한다.

Service Mesh에서는 서비스 간 신뢰 검증을 위해 mTLS를 사용한다.

---

# 7. 인증서 관리 구조

Istio에서는 **Istiod**가 인증서 발급 기관(CA) 역할을 수행한다.

```
Istiod (CA)
     ↓
Sidecar Proxy
```

Pod가 생성되면 Sidecar는 Istiod에 인증서를 요청한다.

특징

- 자동 발급
- 자동 갱신
- 애플리케이션 수정 불필요

---

# 8. 인증서는 NFS처럼 공유되지 않는다

인증서는 중앙 스토리지에서 공유되지 않는다.

각 Pod의 Sidecar가 **개별 인증서**를 가진다.

```
Pod1 Sidecar → 인증서
Pod2 Sidecar → 인증서
Pod3 Sidecar → 인증서
```

---

# 9. 내부 통신에서 HTTP를 사용하는 이유

애플리케이션은 HTTP로 서비스 호출을 수행한다.

```
http://service-name
```

그러나 실제 네트워크에서는 다음과 같이 동작한다.

```
App → Sidecar → mTLS → Sidecar → App
```

즉

Application Layer : HTTP  
Network Layer : mTLS

---

# 10. 실제 사례: Trombone 환경 구조

실제 시스템 예시

```
Client
   ↓ HTTPS
HAProxy
   ↓
TPS Portal
   ↓
pipeline-api
   ↓
pipeline-api Sidecar
   ↓ mTLS
trb-oss Sidecar
   ↓
trb-oss Service
```

외부 통신

HTTPS

내부 통신

HTTP + mTLS

---

# 11. 아티클 시리즈 목차

1. MSA 환경에서 내부 통신 보안 문제
2. Service Mesh 아키텍처 이해
3. Sidecar 패턴과 Pod 구조
4. Envoy Proxy 이해
5. Istio mTLS 동작 원리
6. Istio 인증서 관리 구조
7. 실제 사례: Trombone 환경 서비스 통신

---

# 정리

Istio Service Mesh 환경에서는

- 애플리케이션은 HTTP 기반 호출 수행
- Sidecar Proxy가 트래픽을 가로채 처리
- Sidecar 간 mTLS 통신 수행
- 인증서는 Istiod가 발급 및 관리

이를 통해 **애플리케이션 수정 없이 내부 보안 통신을 구현할 수 있다.**
