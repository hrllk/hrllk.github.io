---
title: "Git Pull Event Packfile Retrieval Deep Dive"
categories:
  - Git
toc: true
toc_sticky: true
toc_label: "Contents"
published: true
---

## Overview
본문은 `git pull` 이벤트 발생시 `Discovery`, `Negotiation` 프로세스 수행을 전제로 마지막 단계인 `Packfile Retrieval`를 설명한다. `refs` 를 통해 `wants/have` 가 도출되었다면 이제 어떻게 서버와 주고받는지를 살펴보기 위함

<br>

## Previous

| 참고 포스트 | 핵심 요약 | Packfile Retrieval과의 관계 |
|-------------|-----------|-----------------------------|
| `What Happen When Pull Event On Bare` | pull 이벤트 전체 시퀀스 | 3단계(Fetch/Pack) 흐름 확장 |
| `Git Adverties Refs Deep Dive` | `/info/refs` → refs 광고 구조 | 어떤 SHA들을 알아냈는지 기반 데이터 |
| `Git Negotiation Deep Dive` | wants/haves 산출 원리 | 서버가 만들 pack 대상 결정 |
| `Git Pull Event Trace Log(client/server)` | 실제 trace 로그 | POST /git-upload-pack 구간 근거 |


<br>

## Packfile Retrieval Flow


### 1. Packfile 이란?
> 여러 Git 객체(blob, tree, commit)를 하나의 파일로 묶어 압축한 컨테이너 형식

#### 왜 사용하는가?
Git 객체(file(blob), dir(tree), commit)은 개별 파일로 각각 저장된다. <br>
하지만 네트워크 전송시 아래 문제들로 각 파일을 하나의 Packfile로 묶어 전송한다.

- 전송할 파일수가 많은경우 느려짐
- 중복 객체가 많으면 비효율적
- 델타 압축 사용 불가

#### Packfile 목적: 
1. 객체를 하나의 스트림으로 전달 가능
1. 중복 제거
1. Delta 압축(같은 파일의 수정본끼리의 차이만 전송함)
1. 자연스러운 I/O 감소(네트워크 전송량 최소화)
<br>

### 2. Packfile 생성과정
이 단계에서는 전체적인 흐름만 설명하고, 세부 알고리즘은 별도 포스트로 분리 예정<br>
핵심은 Packfile 생성은 단순히 "객체 모아서 압축" 수준이 아니라, "Git이 네트워크 얼마나 최적화하는가"가 핵심


#### 2-1. 필요 객체 계산(Object Selection)
Negotiation 절차 이후 클라이언트로부터 요청을 받은 서버는 이미 다음정보를 가진다.
- **wants**: 클라이언트가 필요한 최종커밋
- **haves**: 클라이언트가 이미 가진 커밋

서버는 wants를 기준으로 필요한 객체를 계산하며, 이 과정은 `DFS/BFS` 기반 그래프 탐색으로 처리된다.

<!-- TODO: -->
자세한 탐색 알고리즘은 아래 분기 참고
- Git Object Selection Deep Dive (DFS/BFS & Bitmap)


#### 2-2. Packfile 생성 (Compression & Optimization)
Packfile 생성에는 다양한 최적화가 적용되지만, 본문에서는 "어떤 최적화가 있다 정도만 언급"
- delta compression
- thin-pack
- ofs-delta
- bitmap index

본문에서 각 기술을 모두 설명하면 흐름이 복잡해지므로, 상세 내용은 분리한다.
<!-- TODO: -->
- Git Delta Compression Deep Dive
- Git Thin-Pack Explained
- Git Bitmap Index Explained
<br>

<!-- Git Packfile 생성시 가장 중요 단계이다.  -->
<!-- 저장소가 같은파일에대해 여러버전을 많이 가질수록 효과적 -->

<!-- ``` -->
<!-- README.md (hash sha v1) -->
<!-- README.md (hash sha v2) -->
<!-- README.md (hash sha v3) -->
<!-- ``` -->
<!-- 각각을 전부 전송하는 대신 -->
<!---->
<!-- ``` -->
<!-- README.md (hash sha v1) (full object) -->
<!-- README.md (hash sha v2) (v1 -> v2) -->
<!-- README.md (hash sha v3) (v2 -> v3) -->
<!---->
<!-- ``` -->
<!---->
<!-- 위와 같은 방식으로 파일 차이만 최소로 기록한다. <br> -->
<!-- 위 방법으로 Packfile 크기를 많이 줄일 수 있다. -->
<!---->
<!-- #### 2-3. Think Pack -->
<!-- Think-pack은 Negotiation 단계에서 얻은 `haves` 목록을 기반으로 서버가 클라이언트가 가진 객체는 Packfile에서 제외시키는 전략이다. -->
<!---->
<!-- - 클라이언트가 이미 가지고있는 정보 제외 -->
<!---->
<!-- 덕분에 서버는 전송량 자체를 줄일 수 있고, 클라이언트는 누락된 내용을 이미 보유하고있으므로 문제 없음 -->
<!---->
<!---->
<!-- #### 2-4. Bitmap Index -->
<!-- 대형 monorepo에서는 "필요한 객체 계산" 자체가 오래걸리는데, 이를 최적화하는것이 **bitmap index**. -->
<!-- - commit -> reachable objects -->
<!---->


### 3. Packfile 전달(Side-Band Stream)
Packfile 데이터, Progress, Error 메시지를
하나의 스트림에서 multiplex 하기 위해 side-band 를 사용한다.

- 채널 1 = Packfile
- 채널 2 = 진행률(stderr)
- 채널 3 = 에러

마찬가지로 본문에서 Packfile Retrieval가 핵심이므로 상세한 내용은 분기한다.

<!-- TODO:  -->
- Git Side-Band Protocol Explained
<!-- Packfile이 완성되면 서버에서 클라이언트로 새로운 TCP 스트림을 만들어 아래 세가지정보를 동시에 전송한다. -->
<!-- - Packfile 데이터 -->
<!-- - Progress 메세지 -->
<!-- - Error 메세지 -->
<!-- 위 3개의 항목을 구분하기위해 Git자체적으로 `side-band`라는 다중화 구조를 사용함 -->
<!---->
<!-- #### 3-1) 실제 전송 예시 -->
<!---->
<!-- ``` text -->
<!-- 000e 02Counting objects: 1, done. -->
<!-- 0040 01<PACKFILE DATA...> -->
<!-- 000f 02Compressing objects: 100% -->
<!-- 000d 01<PACKFILE DATA...> -->
<!-- ``` -->







<br>
