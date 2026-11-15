# 지식 문서 작성 계획서 (Knowledge Document Plan)

## 1. 문서 개요 (Overview)
* **문서명**: Rollback History Management Strategy (원복을 위한 이력관리전략) 시리즈
* **작성 목적**: 트럼본 4.0 배포 기능을 전면 재개발할 때 원복이 참조할 이력을 어디서 어떤 형태로 관리할지 결정한다. 조사한 다섯 방안의 판단 근거를 남겨 이후 회의에서 같은 논의를 반복하지 않는다.
* **주요 독자**: DevOps개발본부 배포 기능 담당 개발자, 아키텍처 리뷰 참석자, 이후 설계를 이어받을 AI 에이전트

## 2. 지식 범위 및 분류 (Scope & Category)
* **도메인 컨텍스트**: CI/CD, Deploy, GitOps
* **지식의 성격**:
  - [ ] 도메인 모델 (비즈니스 룰, 불변식, 유비쿼터스 언어)
  - [x] 데이터 모델 (`TB_TRB_PL_046` / `PL_047` / `PL_061` 이력 스키마)
  - [x] 아키텍처 가이드 (원본 권위, 저장소 소유권 경계, 좌표 설계)
  - [x] 운영/인프라 가이드 (ArgoCD sync, Harbor retention, 원복 절차)

## 3. 내용 및 구조 설계 (Content Structure)
* **TOC 스타일**: `### TOC` 다음 `---`를 두고, 번호가 있는 앵커 링크만 작성한다. 기존 maven 폐쇄망 시리즈와 동일하다.
* **시리즈 구성**:
  1. 00편 프롤로그 — 원복을 위한 이력관리전략
  2. 01편 기존 원복 흐름과 문제점 — 현재 동작과 문제 분석
  3. 02편 Git manifest 기반 원복 전략 — 사용자 변경 결재와 성공 배포 실행 기반 원복
  4. 03편 ArgoCD sync history로 원복할 수 없는 이유 — 탈락
  5. 04편 Rendered Manifests로 원본과 결과를 분리하기 — 보류
  6. 05편 OCI Artifact를 배포 좌표로 쓰기 — 옵션 유지
  7. 06편 Progressive Delivery로 원복 빈도를 줄이기 — 별건
  8. 07편 시스템 커밋과 사용자 수정을 어떻게 가를 것인가 — 보충
* **01~02편의 역할**: 01편은 현재 동작과 문제점만 다루고, 02편은 Git 기반 개선 전략을 다룬다. 03~06편은 대안별 검토이며 07편은 변경 주체와 원복 정책의 보충편이다.
* **대안 비교 목차**: 03~06편은 같은 번호의 절끼리 나란히 비교할 수 있도록 공통 목차를 따른다.
* **본문 분량 원칙**: 접힌 부분을 제외한 본문을 100줄 안쪽으로 유지한다. 근거·표·코드·곁가지는 `<details>`로 접어 판단에 필요한 문장만 남긴다.
* **시각화 요구사항**: 현재는 ```text 블록의 화살표 흐름도로만 표현했다. Mermaid로 옮길 후보는 다음 셋이다.
  - flowchart: 배포 흐름 (Harbor 조회 → 렌더링 → 커밋 → 버전 적재 → sync)
  - flowchart: 02편의 `t1~t4` self-heal 이 원복을 취소하는 흐름
  - class diagram 또는 flowchart: 06편의 두 이력 분리 (매니페스트 변경 이력 / 배포 실행 이력)
* **핵심 참조 자료**:
  - `/Users/hrk/task/sources/okestro/3.0.5.2/executor/engine/src/main/java/org/okestro/tps/argocd/domain/deploy/DefaultDeployDomainService.java` — `linkManifest`, 이미지 좌표 조립
  - `/Users/hrk/task/sources/okestro/3.0.5.2/executor/engine/src/main/java/org/okestro/tps/argocd/application/deploy/DeployService.java` — 배포 흐름, `@Transactional` 경계
  - `/Users/hrk/task/sources/okestro/3.0.5.2/executor/engine/src/main/java/org/okestro/tps/argocd/infrastructure/argocd/adapter/ArgoCdLinkAdapter.java` — sync 호출, 27초 폴링
  - `/Users/hrk/task/sources/okestro/3.0.5.2/executor/engine/src/main/java/org/okestro/tps/manifest/infrastructure/persistence/ManifestVersionEntity.java` — `PL_061` 스키마
  - `/Users/hrk/task/sources/okestro/3.0.5.2/operator-api/cicd/src/main/java/org/okestro/tps/operator/cicd/jobs/application/deploy/handler/GuideContainerManifestHandler.java` — 사용자 수정 커밋 경로
  - `/Users/hrk/task/sources/okestro/3.0.5.2/react-app/src/apis/services/workflow/ticket/v3/ticketRequestModel.ts` — 기존 `taskCd: DEPLOY|ROLLBACK` 계약
  - Argo CD `application-crd.yaml` / `assets/swagger.json` (master) — 필드 실측 출처
  - Argo CD `controller/sync.go`, `controller/state.go` — `status.history` 기록 조건
  - `/Users/hrk/task/sources/personal/blog/_posts/2026-09-05-maven-air-gapped-build-prologue.md` — 시리즈 포맷 기준

## 4. 유지보수 및 생명주기 (Lifecycle & Maintenance)
* **갱신 트리거**:
  - 원복 단위가 확정될 때 (티켓 / 배포 실행 / 매니페스트). 01편과 02편이 함께 바뀐다
  - 사용자 Manifest 변경의 결재·Sync 정책이 확정될 때. 02편이 바뀐다
  - `atmcRecovryStngYn`(자동복구설정여부)의 의미가 정의될 때
  - Helm 경로를 원복 범위에 넣기로 결정될 때. 해당 대안 편이 바뀐다
  - VM 배포를 원복 범위에 넣기로 결정될 때
  - 고객 환경 ArgoCD 버전 분포가 확인될 때. 03편 난이도가 확정된다
  - Harbor retention 정책이 합의될 때. 원복 보존 기간의 상한이 정해진다
  - 원본 권위(제품 DB / git / 양방향)가 확정될 때. 07편이 바뀐다
* **SSOT (Single Source of Truth) 원칙**: 이 문서는 시리즈 작성 계획의 SSOT다. 결정 자체의 SSOT는 gstack 결정 기록 `dbbe3916-100d-4bb4-9d38-66173881d2a8`이며, 코드 사실관계의 SSOT는 3.0.5.2 저장소다. 이 시리즈는 그 둘을 블로그 연재 관점으로 재해석한다.

## 5. 산출물 및 배치 위치 (Placement & Artifacts)
* **저장 위치**:
  - 계획서: `docs/active/rollback-history-management-strategy-plan.md`
  - article: `_posts/2026-09-09-{00..07}-rollback-history-management-strategy-{slug}.md`

  | 편 | 파일 |
  | --- | --- |
  | 00 | `2026-09-09-00-rollback-history-management-strategy-prologue.md` |
  | 01 | `2026-09-09-01-rollback-history-management-strategy-current.md` |
  | 02 | `2026-09-09-02-rollback-history-management-strategy-git-manifest.md` |
  | 03 | `2026-09-09-03-rollback-history-management-strategy-argocd-history.md` |
  | 04 | `2026-09-09-04-rollback-history-management-strategy-rendered-manifests.md` |
  | 05 | `2026-09-09-05-rollback-history-management-strategy-oci-artifact.md` |
  | 06 | `2026-09-09-06-rollback-history-management-strategy-progressive-delivery.md` |
  | 07 | `2026-09-09-07-rollback-history-management-strategy-commit-authority.md` |

* **네이밍 규칙**: 파일명은 `날짜 → 번호 → prefix → 주제` 순이다. title은 `NN. Rollback History Management Strategy - 주제` 형식이다.
* **상호 링크**: 기존 포스트는 앵커 링크만 쓰지만 이 시리즈는 편 사이를 이동한다. `permalink: /:slug.html` 규칙에 맞춰 `/NN-rollback-history-management-strategy-{slug}.html` 형태로 작성한다. 상대 `.md` 링크는 Jekyll에서 해석되지 않는다.
* **체크리스트**:
  - [x] `published: false`로 8편 모두 초안 상태 유지
  - [x] frontmatter 형식이 기존 maven 시리즈와 일치
  - [x] 01편은 현재 동작·문제점, 02편은 Git 개선 전략으로 분리
  - [x] 상호 링크를 퍼머링크 형식으로 변환
  - [ ] 사용자 Manifest 변경의 결재·Sync·배포 실행 정책 확정
  - [ ] Mermaid 다이어그램 도입 여부 결정

## 6. 결론
* 01편은 현재 동작과 문제점을 설명하고, 02편은 사용자 변경 결재와 성공 배포 실행 기반의 Git 개선 전략을 설명한다.
* 사용자 Manifest 변경 자체는 Sync하지 않지만, 승인된 변경은 별도 배포 실행으로 Sync하고 성공한 실행을 원복 지점으로 기록한다.
* 원복 대상은 이전 버전 번호가 아니라 정책으로 정한 성공 배포 실행과 그 실행이 참조한 불변 결과다.
* 03~06편은 대안별 검토이고, 07편은 시스템 변경과 사용자 변경의 구분을 보충한다.
