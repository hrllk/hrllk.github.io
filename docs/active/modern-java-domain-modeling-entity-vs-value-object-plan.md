# 지식 문서 작성 계획서 (Knowledge Document Plan)

## 1. 문서 개요 (Overview)
* **문서명**: Modern Java Domain Modeling: Entity vs Value Object
* **작성 목적**: Entity와 Value Object의 구분 기준을 프로젝트 관리 도메인 예시로 설명하여, 도메인 객체를 단순 데이터 컨테이너로 만드는 실수를 줄인다.
* **주요 독자**: 자바/스프링 백엔드 개발자, DDD 기본 개념을 실무 코드로 연결하려는 개발자, 도메인 모델 리뷰 기준이 필요한 AI 에이전트

## 2. 지식 범위 및 분류 (Scope & Category)
* **도메인 컨텍스트**: Project, PurposeToolchain, ToolSelection, ToolOption
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
  3. Entity란 무엇인가
  4. Value Object란 무엇인가
  5. Project 도메인에서 Entity와 Value Object 나누기
  6. Java 구현 시 주의할 점
  7. 흔한 안티패턴
  8. Closing
* **시각화 요구사항**:
  - Mermaid class diagram: `Project`, `PurposeToolchain`, `ToolSelection`, `ToolOption` 구분
  - 비교 표: Entity와 Value Object의 식별성, 변경 가능성, 동등성 판단 기준
* **핵심 참조 자료**:
  - `/Users/hwiryungkim/task/sources/okestro/PPP/operator-api/docs/add/archive/domain/project/implement/project-management-api-implementation-plan.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2025-05-01-equals-hashCode.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2023-02-07-pojo.md`

## 4. 유지보수 및 생명주기 (Lifecycle & Maintenance)
* **갱신 트리거**:
  - Project, PurposeToolchain, ToolSelection의 역할이나 이름이 변경될 때
  - 도구 선택 모델이 값 객체가 아니라 독립 Entity로 변경될 때
  - Java record/class 사용 기준이 시리즈 내 다른 글과 충돌할 때
* **SSOT (Single Source of Truth) 원칙**: 이 문서는 블로그 article의 작성 기준이다. 실제 도메인 객체 역할의 SSOT는 프로젝트 관리 API 구현 계획서와 구현 코드이다.

## 5. 산출물 및 배치 위치 (Placement & Artifacts)
* **저장 위치**:
  - 계획서: `docs/active/modern-java-domain-modeling-entity-vs-value-object-plan.md`
  - article 초안: `_posts/YYYY-MM-DD-modern-java-domain-modeling-entity-vs-value-object.md`
* **체크리스트**:
  - [ ] `Entity vs Object`가 아니라 `Entity vs Value Object`로 용어를 명확히 사용함.
  - [ ] Project와 PurposeToolchain은 Entity 예시로, ToolSelection/ToolOption은 Value Object 후보로 설명함.
  - [ ] Lombok `@Data`, setter 남용, equals/hashCode 위험을 실무 관점으로 정리함.

## 6. 결론
* 이 article은 독자가 "무엇을 Entity로 두고, 무엇을 값으로 표현할 것인가"를 판단하게 만드는 글이다. 다음 article의 Aggregate Boundary로 자연스럽게 이어지도록 마무리한다.
