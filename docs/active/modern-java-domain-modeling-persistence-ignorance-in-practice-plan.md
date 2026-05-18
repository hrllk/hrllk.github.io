# 지식 문서 작성 계획서 (Knowledge Document Plan)

## 1. 문서 개요 (Overview)
* **문서명**: Modern Java Domain Modeling: Persistence Ignorance in Practice
* **작성 목적**: 도메인 모델이 JPA, DB 스키마, 응답 DTO에 끌려가지 않도록 저장소 포트와 인프라 어댑터의 책임을 정리한다.
* **주요 독자**: 자바/스프링 백엔드 개발자, JPA Entity와 Domain Model 분리 기준을 고민하는 개발자, 헥사고날 저장소 경계를 문서화하려는 AI 에이전트

## 2. 지식 범위 및 분류 (Scope & Category)
* **도메인 컨텍스트**: ProjectRepository, ProjectStubRepository, Application Result Mapper, Persistence Ignorance
* **지식의 성격**:
  - [x] 도메인 모델 (비즈니스 룰, 불변식, 유비쿼터스 언어)
  - [x] 데이터 모델 (ERD, 영속성 매핑 제약, 테이블 명세)
  - [x] 아키텍처 가이드 (모듈 의존성, 헥사고날 아키텍처 포트/어댑터 규약)
  - [ ] 운영/인프라 가이드 (배포, 설정, 트러블슈팅)

## 3. 내용 및 구조 설계 (Content Structure)
* **TOC 스타일**: `### TOC` 다음 `---`를 두고, 번호가 있는 앵커 링크만 작성한다.
* **예상 목차**:
  1. TOC
  2. Overview
  3. Persistence Ignorance란 무엇인가
  4. ProjectRepository를 domain port로 두는 이유
  5. Infrastructure adapter의 책임
  6. Domain Model과 Persistence Model 분리 전략
  7. Result DTO와 Mapper를 얇게 유지하는 이유
  8. Closing
* **시각화 요구사항**:
  - Mermaid flowchart: `ProjectService -> ProjectRepository(port) -> ProjectStubRepository/JPA adapter`
  - 비교 표: Domain Model, Persistence Model, Application Result DTO의 책임
* **핵심 참조 자료**:
  - `/Users/hwiryungkim/task/sources/okestro/PPP/operator-api/docs/add/archive/domain/project/implement/project-management-api-implementation-plan.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2026-03-14-hexagonal-architecture.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2022-01-08-ORM-And-SqlMapper.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2024-05-17-jpql.md`

## 4. 유지보수 및 생명주기 (Lifecycle & Maintenance)
* **갱신 트리거**:
  - ProjectStubRepository가 실제 JPA Repository로 교체될 때
  - Project domain class와 persistence entity의 분리 여부가 확정될 때
  - 데이터베이스 스키마가 확정되어 저장 모델 제약이 추가될 때
* **SSOT (Single Source of Truth) 원칙**: 이 문서는 article 작성 계획의 SSOT이다. 저장소 구현과 DB 스키마의 SSOT는 구현 코드, migration, API 구현 계획서가 우선한다.

## 5. 산출물 및 배치 위치 (Placement & Artifacts)
* **저장 위치**:
  - 계획서: `docs/active/modern-java-domain-modeling-persistence-ignorance-in-practice-plan.md`
  - article 초안: `_posts/YYYY-MM-DD-modern-java-domain-modeling-persistence-ignorance-in-practice.md`
* **체크리스트**:
  - [ ] JPA를 무조건 배제하는 글이 아니라 실무 절충 기준을 제시함.
  - [ ] `ProjectRepository`는 domain port, `ProjectStubRepository`/JPA 구현은 infrastructure adapter로 설명함.
  - [ ] Result DTO와 mapper의 책임을 도메인 모델과 분리함.

## 6. 결론
* 이 article은 도메인 모델을 저장 기술로부터 보호하는 실무 기준을 정리한다. 이후 Repository and Persistence Design 시리즈로 넘어갈 수 있는 연결 지점을 만든다.
