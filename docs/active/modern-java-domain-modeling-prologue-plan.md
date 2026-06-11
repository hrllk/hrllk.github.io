# 지식 문서 작성 계획서 (Knowledge Document Plan)

## 1. 문서 개요 (Overview)
* **문서명**: Modern Java Domain Modeling: Prologue
* **작성 목적**: 도메인 모델링 시리즈의 문제의식, 독자 범위, 전체 연재 흐름을 먼저 합의하여 이후 article의 관점을 일관되게 유지한다.
* **주요 독자**: 자바/스프링 백엔드 개발자, 헥사고날 아키텍처를 실무 코드에 적용하려는 개발자, 도메인 모델링 기준을 정리하려는 AI 에이전트

## 2. 지식 범위 및 분류 (Scope & Category)
* **도메인 컨텍스트**: Project, CI/CD, Java Domain Modeling
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
  3. 왜 도메인 모델링을 따로 다뤄야 하는가
  4. CRUD Entity와 도메인 모델의 차이
  5. 이번 시리즈의 예시 도메인: Project, PurposeToolchain, ToolSelection
  6. 연재 계획
  7. Our Principle
  8. Next Step
* **시각화 요구사항**:
  - Mermaid class diagram: `Project`, `PurposeToolchain`, `ToolSelection`의 개략적 관계
  - Mermaid flowchart: `presentation -> application -> domain -> infrastructure` 경계 흐름
* **핵심 참조 자료**:
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2026-03-15-modern-beautiful-api-response-design-prologue.md`
  - `/Users/hwiryungkim/task/sources/personal/blog/_posts/2026-03-14-hexagonal-architecture.md`
  - 프로젝트 관리 API 구현 계획서
  - `/Users/hwiryungkim/task/sources/personal/blog/.taskmaster/tasks/tasks.json`
  


## 4. 유지보수 및 생명주기 (Lifecycle & Maintenance)
* **갱신 트리거**:
  - Modern Java Domain Modeling 시리즈 회차가 추가, 삭제, 순서 변경될 때
  - Project 도메인 예시가 다른 도메인으로 변경될 때
  - 헥사고날 아키텍처 관련 선행 글의 결론이 변경될 때
* **SSOT (Single Source of Truth) 원칙**: 이 문서는 article 작성 계획의 SSOT이다. Project 도메인 구현 규칙의 SSOT는 프로젝트 관리 API 구현 계획서이며, 이 문서는 블로그 연재 관점으로 재해석한다.

## 5. 산출물 및 배치 위치 (Placement & Artifacts)
* **저장 위치**:
  - 계획서: `docs/active/modern-java-domain-modeling-prologue-plan.md`
  - article 초안: `_posts/YYYY-MM-DD-modern-java-domain-modeling-prologue.md`
* **체크리스트**:
  - [ ] 최근 API Response 시리즈와 title/front matter/TOC/Next Step 포맷이 일치하는지 확인함.
  - [ ] Project 도메인 예시가 이후 article에서도 반복 사용될 수 있도록 용어를 고정함.
  - [ ] AI 에이전트가 쉽게 파싱할 수 있도록 마크다운 구조가 깔끔하게 정리되었는지 확인함.

## 6. 결론
* 이 article은 시리즈의 관문이다. 독자가 "헥사고날에서 보호해야 할 도메인 모델을 실제로 어떻게 설계하는가"라는 질문을 갖고 다음 글로 이동하도록 작성한다.
