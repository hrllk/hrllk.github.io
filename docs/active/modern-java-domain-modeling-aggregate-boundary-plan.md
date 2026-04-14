# 지식 문서 작성 계획서 (Knowledge Document Plan)

## 1. 문서 개요 (Overview)
* **문서명**: Modern Java Domain Modeling: Aggregate Boundary
* **작성 목적**: Project를 Aggregate Root로 삼아 목적 툴체인과 도구 선택을 어느 경계 안에서 다룰지 설명하고, Aggregate가 트랜잭션 경계와 불변식 보호에 어떤 의미를 갖는지 정리한다.
* **주요 독자**: 자바/스프링 백엔드 개발자, DDD Aggregate 설계를 처음 실무에 적용하는 개발자, 프로젝트 관리 도메인을 이해해야 하는 AI 에이전트

## 2. 지식 범위 및 분류 (Scope & Category)
* **도메인 컨텍스트**: Project Aggregate, PurposeToolchain, ToolSelection, CI/CD
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
  3. Aggregate가 필요한 이유
  4. Project를 Aggregate Root로 보는 기준
  5. PurposeToolchain과 ToolSelection을 내부 구성요소로 다루는 이유
  6. Aggregate 내부 규칙과 외부 참조 검증의 분리
  7. Aggregate 경계를 잘못 잡았을 때의 문제
  8. Closing
* **시각화 요구사항**:
  - Mermaid class diagram: `Project`가 `PurposeToolchain` 목록을 소유하고, `PurposeToolchain`이 `ToolSelection` 목록을 갖는 구조
  - Mermaid sequence diagram: `deleteProject` 요청에서 application validator와 `Project.delete()`가 순서대로 호출되는 흐름
* **핵심 참조 자료**:
  - `/Users/hwiryungkim/task/sources/okestro/PPP/operator-api/docs/add/archive/domain/project/implement/project-management-api-implementation-plan.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2025-09-08-ddd-rules.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2026-03-14-hexagonal-architecture.md`

## 4. 유지보수 및 생명주기 (Lifecycle & Maintenance)
* **갱신 트리거**:
  - Project 하위에 새로운 내부 구성요소가 추가될 때
  - PurposeToolchain이 Project 밖의 독립 Aggregate로 승격될 때
  - 업무코드, 파이프라인, Job 참조 검증 위치가 변경될 때
* **SSOT (Single Source of Truth) 원칙**: 이 문서는 Aggregate 설명 article의 계획서이다. Project Aggregate의 실제 규칙은 프로젝트 관리 API 구현 계획서 및 구현 코드가 우선한다.

## 5. 산출물 및 배치 위치 (Placement & Artifacts)
* **저장 위치**:
  - 계획서: `docs/active/modern-java-domain-modeling-aggregate-boundary-plan.md`
  - article 초안: `_posts/YYYY-MM-DD-modern-java-domain-modeling-aggregate-boundary.md`
* **체크리스트**:
  - [ ] 주문/결제 예시를 사용하지 않고 Project 도메인 예시만 사용함.
  - [ ] `Project.delete()`의 내부 규칙과 `ProjectDeletionValidator`의 외부 참조 검증을 명확히 분리함.
  - [ ] 도구 유형별 도구 선택 0..1개 규칙을 Aggregate 내부 불변식 후보로 설명함.

## 6. 결론
* 이 article은 시리즈의 중심 글이다. Aggregate를 "객체 묶음"이 아니라 "일관성을 지키는 경계"로 설명하고, 다음 article의 Invariant and Validation으로 연결한다.
