# 지식 문서 작성 계획서 (Knowledge Document Plan)

## 1. 문서 개요 (Overview)
* **문서명**: Modern Java Domain Modeling: Invariant and Validation
* **작성 목적**: 도메인 불변식, 입력 형식 검증, 외부 참조 검증을 구분하여 검증 로직이 presentation/application/domain에 뒤섞이는 문제를 줄인다.
* **주요 독자**: 자바/스프링 백엔드 개발자, Bean Validation과 도메인 검증의 경계를 고민하는 개발자, 예외 설계와 도메인 모델링을 연결하려는 AI 에이전트

## 2. 지식 범위 및 분류 (Scope & Category)
* **도메인 컨텍스트**: Project, PurposeToolchain, Application Validator, Domain Invariant
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
  3. Validation과 Invariant는 다르다
  4. Presentation Request 검증
  5. Application Validator의 책임
  6. Domain Invariant의 책임
  7. 실패를 어떤 예외로 표현할 것인가
  8. Closing
* **시각화 요구사항**:
  - Mermaid flowchart: request 검증, application validator, domain invariant의 실행 위치
  - 표: 검증 종류별 책임 계층, 예시, 실패 예외 유형
* **핵심 참조 자료**:
  - `/Users/hwiryungkim/task/sources/okestro/PPP/operator-api/docs/add/archive/domain/project/implement/project-management-api-implementation-plan.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2026-03-16-modern-beautiful-api-response-design-internal-exception-model.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2026-03-18-modern-beautiful-api-response-design-exception-translation-layer.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2025-01-14-java-standard-bean-validation-api.md`

## 4. 유지보수 및 생명주기 (Lifecycle & Maintenance)
* **갱신 트리거**:
  - Project 삭제/수정/목적 툴체인 변경 규칙이 추가될 때
  - ApplicationException/DomainException 분류 기준이 변경될 때
  - Spring Validation and Error Handling 시리즈가 시작되어 검증 책임 정의가 보강될 때
* **SSOT (Single Source of Truth) 원칙**: 이 문서는 article 작성 계획의 SSOT이다. 예외 응답 규격의 SSOT는 Modern Beautiful API Response Design 시리즈이며, 실제 Project 검증 규칙은 프로젝트 관리 API 구현 계획서와 구현 코드가 우선한다.

## 5. 산출물 및 배치 위치 (Placement & Artifacts)
* **저장 위치**:
  - 계획서: `docs/active/modern-java-domain-modeling-invariant-and-validation-plan.md`
  - article 초안: `_posts/YYYY-MM-DD-modern-java-domain-modeling-invariant-and-validation.md`
* **체크리스트**:
  - [ ] Bean Validation을 도메인 불변식과 혼동하지 않도록 설명함.
  - [ ] `ProjectDeletionValidator`, `PurposeToolchainJobUsageValidator`, `Project.delete()` 책임을 분리함.
  - [ ] 이전 API Response 시리즈의 예외 모델과 연결함.

## 6. 결론
* 이 article은 검증 로직의 위치를 정리하는 글이다. 도메인 객체가 자기 불변식은 지키되, 외부 시스템 참조 판단까지 떠안지 않도록 경계를 분명히 한다.
