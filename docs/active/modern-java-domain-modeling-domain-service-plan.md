# 지식 문서 작성 계획서 (Knowledge Document Plan)

## 1. 문서 개요 (Overview)
* **문서명**: Modern Java Domain Modeling: Domain Service
* **작성 목적**: Entity나 Value Object에 넣기 어려운 도메인 규칙을 어디에 둘지 판단하는 기준을 정리하고, Application Service와 Domain Service를 혼동하는 문제를 줄인다.
* **주요 독자**: 자바/스프링 백엔드 개발자, Fat Service를 줄이고 싶은 개발자, 도메인 규칙 배치 기준을 문서화하려는 AI 에이전트

## 2. 지식 범위 및 분류 (Scope & Category)
* **도메인 컨텍스트**: Project, ProjectService, Domain Service, Application Service
* **지식의 성격**:
  - [x] 도메인 모델 (비즈니스 룰, 불변식, 유비쿼터스 언어)
  - [ ] 데이터 모델 (ERD, 영속성 매핑 제약, 테이블 명세)
  - [x] 아키텍처 가이드 (모듈 의존성, 헥사고날 아키텍처 포트/어댑터 규약)
  - [ ] 운영/인프라 가이드 (배포, 설정, 트러블슈팅)

## 3. 내용 및 구조 설계 (Content Structure)
* **TOC 스타일**: `### TOC` 다음 `---`를 두고, 번호가 있는 앵커 링크만 작성한다.
* **예상 목차**:
  1. TOC
  2. Overview
  3. Domain Service가 필요한 순간
  4. Application Service와 Domain Service의 차이
  5. Project 도메인에서 규칙을 배치하는 기준
  6. Domain Service 남용의 위험
  7. 실무 판단 체크리스트
  8. Closing
* **시각화 요구사항**:
  - Mermaid flowchart: Controller, Application Service, Domain Model, Domain Service의 호출 관계
  - 비교 표: Application Service와 Domain Service의 책임, 입력/출력, 의존성 방향
* **핵심 참조 자료**:
  - `/Users/hwiryungkim/task/sources/okestro/PPP/operator-api/docs/add/archive/domain/project/implement/project-management-api-implementation-plan.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2026-03-14-hexagonal-architecture.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2025-09-08-ddd-rules.md`

## 4. 유지보수 및 생명주기 (Lifecycle & Maintenance)
* **갱신 트리거**:
  - ProjectService가 맡는 orchestration 책임이 변경될 때
  - 여러 Aggregate를 조합하는 순수 도메인 규칙이 추가될 때
  - application validator와 domain service의 책임 구분이 변경될 때
* **SSOT (Single Source of Truth) 원칙**: 이 문서는 Domain Service article 작성 기준이다. 실제 서비스 배치의 SSOT는 구현 코드와 프로젝트 관리 API 구현 계획서이다.

## 5. 산출물 및 배치 위치 (Placement & Artifacts)
* **저장 위치**:
  - 계획서: `docs/active/modern-java-domain-modeling-domain-service-plan.md`
  - article 초안: `_posts/YYYY-MM-DD-modern-java-domain-modeling-domain-service.md`
* **체크리스트**:
  - [ ] Domain Service를 모든 로직을 담는 서비스 객체로 설명하지 않음.
  - [ ] Project 내부에 둘 규칙과 application validator로 둘 규칙을 비교함.
  - [ ] ProjectService는 orchestration 책임이라는 점을 명확히 함.

## 6. 결론
* 이 article은 "로직을 어디에 둘 것인가"에 대한 판단 글이다. Domain Service를 도입하는 기준만큼 도입하지 않아야 할 기준도 함께 제시한다.
